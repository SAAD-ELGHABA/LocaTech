<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiAssistantController extends Controller
{
    // public function handle(Request $request)
    // {
    //     $message = $request->input('message');

    //     $parsed = $this->callDeepSeekAPI($message);

    //     $results = Bien::query()
    //         ->when($parsed['ville'], fn($q) => $q->where('ville', $parsed['ville']))
    //         ->when($parsed['type'], fn($q) => $q->where('type', $parsed['type']))
    //         ->when($parsed['max_price'], fn($q) => $q->where('budget', '<=', $parsed['max_price']))
    //         ->get();

    //     $reply = $this->callDeepSeekFormatReply($parsed, $results);

    //     return response()->json([
    //         'reply' => $reply,
    //         'suggestions' => $results
    //     ]);
    // }

    // private function callDeepSeekAPI($message)
    // {
    //     $response = Http::withHeaders([
    //         'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
    //     ])->post('https://openrouter.ai/api/v1/chat/completions', [
    //         'model' => 'deepseek-v3',
    //         'messages' => [
    //             [
    //                 'role' => 'system',
    //                 'content' => `Vous êtes un assistant immobilier IA. Extrayez la ville, le type (villa, appartement, maison.) et le prix maximal en MAD du message de l'utilisateur. Répondez uniquement en JSON, par exemple : {"ville":"", "type":"", "max_price":""}`
    //             ],
    //             [
    //                 'role' => 'user',
    //                 'content' => $message
    //             ]
    //             ],
    //         'response_format' => ['type' => 'json_object'] 
    //     ]);

    //     $content = $response->json()['choices'][0]['message']['content'];
    //     return json_decode($content, true);
    // }

    // private function callDeepSeekFormatReply($parsed, $results)
    // {
    //     $propertiesArray = $results->map(fn($item) => [
    //         'title' => $item->title,
    //         'budget' => $item->budget,
    //         'ville' => $item->ville,
    //         'type' => $item->type,
    //     ])->toArray();

    //     $response = Http::withHeaders([
    //         'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
    //     ])->post('https://openrouter.ai/api/v1/chat/completions', [
    //         'model' => 'deepseek-chat-v3',
    //         'messages' => [
    //             [
    //                 'role' => 'system',
    //                 'content' => "Vous êtes assistant immobilier. À l'aide des données de recherche analysées et de la liste des biens ci-dessous, rédigez une réponse courte, conviviale et naturelle, en texte clair, en précisant la ville, le type, le prix maximum, le nombre de biens, ainsi qu'une courte liste de leurs titres et prix."
    //             ],
    //             [
    //                 'role' => 'user',
    //                 'content' => json_encode([
    //                     'parsed' => $parsed,
    //                     'results' => $propertiesArray
    //                 ])
    //             ]
    //         ]
    //     ]);

    //     return $response->json()['choices'][0]['message']['content'];
    // }



    public function handle(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);
        try {
            $message = $request->input('message');
            $parsed = Cache::remember(
                "deepseek_parsed:" . md5($message),
                now()->addHours(6),
                fn() => $this->callDeepSeekAPI($message)
            );
            $results = Bien::query()
                ->when($parsed['ville'] ?? null, fn($q) => $q->where('ville', $parsed['ville']))
                ->when($parsed['typeAffaire'] ?? null, fn($q) => $q->where('typeAffaire', $parsed['typeAffaire']))
                ->when($parsed['type'] ?? null, fn($q) => $q->where('type', $parsed['type']))
                ->when($parsed['max_price'] ?? null, fn($q) => $q->where('budget', '<=', $parsed['max_price']))
                ->limit(5)
                ->get();
            $reply = $this->callDeepSeekFormatReply($parsed, $results);

            return response()->json([
                'reply' => $reply,
                'suggestions' => $results,
                'parsed' => $parsed,
            ]);
        } catch (\Exception $e) {
            Log::error("DeepSeek Error: " . $e->getMessage());
            return response()->json([
                'error' => 'An error occurred while processing your request.',
                'details' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    private function callDeepSeekAPI(string $message): array
    {

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
            'HTTP-Referer' => env('APP_URL_FRONT_END'),
            'X-Title' => 'LocaTech',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => "gryphe/mythomax-l2-13b",
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Vous êtes un assistant immobilier IA. Extrayez la ville, le type (villa ou appartement ou maison) et typeAffaire(louer ou acheter) et le prix maximal en MAD (si ne est pas mentionner donc : metter à null) du message. Répondez UNIQUEMENT en JSON : {"ville":"", "type":"", "typeAffaire":"","max_price":""}'
                ],
                ['role' => 'user', 'content' => $message]
            ],
            'max_tokens' => 300,
        ]);

        $content = $response->throw()->json()['choices'][0]['message']['content'];
        $decoded = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \RuntimeException("Invalid JSON from DeepSeek: " . $content);
        }

        return $decoded;
    }

    private function callDeepSeekFormatReply(array $parsed, $results): string
    {
        $propertiesArray = $results->map(function ($item) {
            return [
                'title' => $item->title,
                'budget' => $item->budget,
                'ville' => $item->ville,
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
                'model' => "gryphe/mythomax-l2-13b",
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => "Vous êtes un assistant immobilier. Formulez une réponse claire en français avec: 1) Les critères demandés, 2) Le nombre de biens trouvés, 3) Une liste concise des propriétés avec titre et prix. Soyez naturel et amical. si tu n'a pas trouvé des immobiliers (biens suggestions) donc donner une message d'excuse sur vous n'avez trouvé aucune .."
                    ],
                    [
                        'role' => 'user',
                        'content' => json_encode([
                            'critères' => $parsed,
                            'biens' => $propertiesArray
                        ], JSON_UNESCAPED_UNICODE)
                    ]
                ],
                'temperature' => 0.7,
            ]);

        return $response->throw()->json()['choices'][0]['message']['content'];
    }
}
