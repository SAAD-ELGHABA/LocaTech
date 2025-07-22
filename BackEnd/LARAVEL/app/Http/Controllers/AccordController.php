<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Accord;
use App\Models\Affaire;
use App\Models\Bien;
use App\Models\Courtier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccordController extends Controller
{
    public function metterAccord(Request $request)
    {
        $validated = $request->validate(
            [
                'status' => 'required|string|in:accepted,rejected,autre',
                'commentaire' => 'nullable|string|max:1000',
                'bienId' => 'required|integer|exists:biens,id',
                'courtierId' => 'required|integer|exists:courtiers,id',
                'user_id' => 'required|integer|exists:users,id',
            ],
            [
                'bienId.required' => "Le bien n'est actuellement pas active ou a été rejetée par l'assistant."
            ]
        );
        $bien = Bien::find($validated['bienId']);
        if ($bien) {
            if ($bien->status_id === 1 || $bien->status_id === 5 || $bien->status_id === 7) {

                $accord = Accord::where('bienId', $validated['bienId'])->first();

                if ($accord) {
                    $accord->update([
                        'status' => $validated['status'],
                        'commentaire' => $validated['commentaire'] ?? $accord->commentaire,
                        'courtierId' => $validated['courtierId'],
                        'user_id' => $validated['user_id'],
                    ]);
                } else {
                    $accord = Accord::create($validated);
                }

                return response()->json([
                    'message' => 'Statut enregistré avec succès.',
                    'accord' => $accord,
                ]);
            }
        } else {
            return response()->json([
                'message' => "Cette bien n'est pas activé !"
            ]);
        }
    }

    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $courtier = Courtier::where('user_id', $user->id)->first();

        if (!$courtier) {
            return response()->json(['error' => 'Aucun courtier trouvé pour cet utilisateur'], 404);
        }

        $accords = Accord::where('courtierId', $courtier->id)
            ->with(['user', 'bien'])
            ->get();

        return response()->json([
            'accords' => $accords
        ]);
    }

    public function getAccordBien($BienId)
    {
        $bienAccord = Accord::where('bienId', $BienId)->first();
        return response()->json([
            'bienAccord' => $bienAccord
        ]);
    }

    public function getAccords()
    {
        $accords = Accord::with(['user', 'courtier.user', 'bien', 'affaires'])
            ->orderByRaw("
            CASE 
                WHEN status = 'accepted' THEN 1
                WHEN status = 'rejected' THEN 2
                ELSE 3
            END
        ")
            ->get();
        return $accords;
    }

    public function validateAccord(Request $request)
    {
        $userId = Auth::id();
        $idAccord = $request->input('idAccord');

        $status = $request->input('status');
        $affaire = Affaire::where('accord_id', $idAccord)
            ->where('assistant_id', $userId)
            ->first();
        if ($affaire) {
            $affaire->status = $status;
            $affaire->save();
            $accord = Accord::find($idAccord);
            if ($accord) {
                $accord->status = "validé";
                $accord->save();
            }
        } else {
            $affaire = Affaire::create([
                'accord_id' => $idAccord,
                'assistant_id' => $userId,
                'status' => $status,
            ]);
        }
        $accord = Accord::find($idAccord);

        if ($accord) {
            $accord->status = $status;
            $accord->save();
        }
    }
}
