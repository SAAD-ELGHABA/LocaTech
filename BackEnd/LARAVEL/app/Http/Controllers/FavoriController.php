<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bien;
use App\Models\Favori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriController extends Controller
{
    public function add_to_favoris(Request $request)
    {
        try {
            $request->validate([
                'bien_id' => 'required|exists:biens,id',
            ]);

            $userId = Auth::id();

            if (!$userId) {
                return response()->json([
                    'message' => 'Utilisateur non authentifié.'
                ], 401);
            }

            // Check if the favori already exists
            $favori = Favori::where('user_id', $userId)
                ->where('bien_id', $request->bien_id)
                ->first();

            if ($favori) {
                // If it exists, remove it (toggle off)
                $favori->delete();

                // Return updated list of favori bien_ids
                $bienIds = Favori::where('user_id', $userId)->pluck('bien_id');

                // Fetch the actual biens using whereIn
                $biens = Bien::whereIn('id', $bienIds)->with(['status', 'courtier'])->get();

                return response()->json([
                    'message' => 'Ce bien a été retiré de vos favoris.',
                    'biens' => $biens,
                ], 200);
            }

            // Otherwise, create the favori (toggle on)
            $newFavori = Favori::create([
                'user_id' => $userId,
                'bien_id' => $request->bien_id,
            ]);

            $bienIds = Favori::where('user_id', $userId)->pluck('bien_id');

            // Fetch the actual biens using whereIn
            $biens = Bien::whereIn('id', $bienIds)->with(['status', 'courtier'])->get();

            return response()->json([
                'message' => 'Ce bien a été ajouté à vos favoris.',
                'favori' => $newFavori,
                'biens' => $biens,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Une erreur est survenue lors du traitement.',
                'error' => $th->getMessage()
            ], 500);
        }
    }


    public function getUserFavoris()
    {
        try {
            $userId = Auth::id();

            if (!$userId) {
                return response()->json([
                    'message' => 'Utilisateur non authentifié.'
                ], 401);
            }

            // Get only the bien_id values from favoris
            $bienIds = Favori::where('user_id', $userId)->pluck('bien_id');

            // Fetch the actual biens using whereIn
            $biens = Bien::whereIn('id', $bienIds)->with(['status', 'courtier'])->get();

            return response()->json([
                'message' => 'Favoris récupérés avec succès.',
                'biens' => $biens
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des favoris.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
