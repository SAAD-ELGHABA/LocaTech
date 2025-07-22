<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\AiAssistant;
use App\Models\Bien;

class AiAssistantController extends Controller
{
    public function handle(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        try {
            $message = $request->input('message');
            $user = Auth::user();

            if ($user) {
                AiAssistant::create([
                    'user_id' => $user->id,
                    'role' => 'user',
                    'content' => $message,
                ]);
            }

            $raw = $user
                ? $this->callDeepSeekAPIWithHistory($user->id, $message)
                : $this->callDeepSeekAPISimple($message);
            $decoded = json_decode($raw, true);
            $isJson = json_last_error() === JSON_ERROR_NONE && is_array($decoded);
            $results = null;
            $reply = $raw;
            Log::info('RAW:', [$raw]);
            Log::info('DECODED:', [$decoded]);

            if ($isJson) {
                $results = Bien::query()
                    ->when(
                        !empty($decoded['ville']),
                        fn($q) =>
                        $q->whereRaw('LOWER(ville) = ?', [strtolower($decoded['ville'])])
                    )
                    ->when(
                        !empty($decoded['typeAffaire']),
                        fn($q) =>
                        $q->whereRaw('LOWER(typeAffaire) = ?', [strtolower($decoded['typeAffaire'])])
                    )
                    ->when(
                        !empty($decoded['type']),
                        fn($q) =>
                        $q->whereRaw('LOWER(type) = ?', [strtolower($decoded['type'])])
                    )
                    ->when(
                        !empty($decoded['max_price']) && is_numeric($decoded['max_price']),
                        fn($q) =>
                        $q->where('budget', '<=', $decoded['max_price'])
                    )
                    ->limit(5)
                    ->get();




                $reply = $this->callDeepSeekFormatReply($decoded, $results);
            }

            if ($user) {
                AiAssistant::create([
                    'user_id' => $user->id,
                    'role' => 'assistant',
                    'content' => $reply,
                    'data' => $results ? $results->toArray() : null,
                ]);

                $this->pruneOldMessages($user->id);
            }

            return response()->json([
                'reply' => $reply,
                'parsed' => $isJson ? $decoded : null,
                'critics' => $raw ?? null,
                'suggestions' => $results ?? null,
            ]);
        } catch (\Exception $e) {
            Log::error("DeepSeek Error: " . $e->getMessage());

            return response()->json([
                'error' => 'An error occurred while processing your request.',
                'details' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    private function buildMessagesWithHistory(int $userId, string $currentUserMessage): array
    {
        $history = AiAssistant::where('user_id', $userId)
            ->latest()
            ->take(10)
            ->get()
            ->reverse();

        $messages = [];
        $messages[] = [
            'role' => 'system',
            'content' => <<<PROMPT
            Tu es un assistant IA pour une application immobilière.
            Si l'utilisateur décrit une recherche, tu DOIS répondre STRICTEMENT en JSON sous la forme :
            {"ville":"..(le nom de ville seulement)..","type":"..(villa ou appartement ou maison)..","typeAffaire":"..(acheter ou louer)..","max_price":...}

            - Aucun texte avant ou après.
            - Pas de phrase polie.
            - Seulement le JSON.
            - Si aucune information n’est détectée, réponds: {"ville":null,"type":null,"typeAffaire":null,"max_price":null}
            PROMPT
        ];


        // foreach ($history as $msg) {
        //     $messages[] = [
        //         'role' => $msg->role,
        //         'content' => $msg->content,
        //     ];
        // }

        $messages[] = [
            'role' => 'user',
            'content' => $currentUserMessage,
        ];

        return $messages;
    }


    private function callDeepSeekAPIWithHistory(int $userId, string $message)
    {
        $messages = $this->buildMessagesWithHistory($userId, $message);
        $response = Http::retry(2, 500)
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
                'HTTP-Referer' => env('APP_URL_FRONT_END'),
                'X-Title' => 'LocaTech',
            ])
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => env('DEEPSEEK_MODEL', 'gryphe/mythomax-l2-13b'),
                'messages' => $messages,
                'max_tokens' => 300,
            ]);

        return $response->throw()->json()['choices'][0]['message']['content'];
    }

    private function callDeepSeekAPISimple(string $message): string
    {
        $systemContent = <<<PROMPT
Vous êtes un assistant IA pour une application immobilière.
Si l'utilisateur décrit une recherche immobilière, extrayez ville, type (villa, appartement, maison), typeAffaire (louer, acheter) et prix maximal en MAD.
Répondez STRICTEMENT en JSON avec ces champs.
Sinon, répondez naturellement aux questions sur l'application en français.
PROMPT;

        $response = Http::retry(2, 500)
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
                'HTTP-Referer' => env('APP_URL_FRONT_END'),
                'X-Title' => 'LocaTech',
            ])
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => env('DEEPSEEK_MODEL', 'gryphe/mythomax-l2-13b'),
                'messages' => [
                    ['role' => 'system', 'content' => $systemContent],
                    ['role' => 'user', 'content' => $message],
                ],
                'max_tokens' => 300,
            ]);

        return $response->throw()->json()['choices'][0]['message']['content'];
    }

    private function callDeepSeekFormatReply(array $parsed, $results): string
    {
        $propertiesArray = $results->map(function ($item) {
            return [
                'title' => $item->title,
                'budget' => $item->budget,
                'ville' => $item->ville,
                'slag' => $item->slag,
                'type' => $item->type,
                'typeAffaire' => $item->typeAffaire,
            ];
        })->toArray();

        $response = Http::retry(2, 500)
            ->withOptions([
                'verify' => app()->environment('production')
                    ? 'C:\wamp64\bin\php\php8.3.14\extras\ssl\cacert.pem'
                    : false
            ])
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
            ])
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => env('DEEPSEEK_MODEL', 'gryphe/mythomax-l2-13b'),
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => "Vous êtes un assistant immobilier amical et professionnel.
Analysez les données fournies : 
- Si la liste 'biens' est vide, écrivez une réponse polie expliquant qu'aucun bien n'a été trouvé et proposez de relancer la recherche avec d'autres critères.
- Si la liste contient 1 à 2 biens, signalez que le choix est limité et encouragez l'utilisateur à élargir ses critères pour plus d'options.
- Si la liste est riche (3 biens ou plus), soulignez qu'il y a plusieurs opportunités intéressantes.
Ensuite, récapitulez toujours : 1) les critères, 2) le nombre de biens, 3) une liste synthétique des biens (titre, budget, ville, type, typeAffaire).
Concluez avec une phrase amicale pour inviter l'utilisateur à demander plus d'informations."
                    ],
                    [
                        'role' => 'user',
                        'content' => json_encode([
                            'criteres' => $parsed,
                            'biens' => $propertiesArray
                        ], JSON_UNESCAPED_UNICODE)
                    ]
                ],
                'temperature' => 0.7,
            ]);

        return $response->throw()->json()['choices'][0]['message']['content'];
    }


    private function pruneOldMessages(int $userId)
    {
        foreach (['user', 'assistant'] as $role) {
            $count = AiAssistant::where('user_id', $userId)->where('role', $role)->count();
            if ($count > 5) {
                $toDelete = $count - 5;
                AiAssistant::where('user_id', $userId)
                    ->where('role', $role)
                    ->oldest()
                    ->limit($toDelete)
                    ->delete();
            }
        }
    }


    public function getMessagesHistory()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $userMessages = AiAssistant::where('user_id', $user->id)
            ->where('role', 'user')
            ->latest()
            ->take(5)
            ->get();

        $assistantMessages = AiAssistant::where('user_id', $user->id)
            ->where('role', 'assistant')
            ->latest()
            ->take(5)
            ->get();

        $messages = $userMessages->merge($assistantMessages)
            ->sortBy('created_at')
            ->values();

        return response()->json([
            'messages' => $messages,
        ]);
    }
}
