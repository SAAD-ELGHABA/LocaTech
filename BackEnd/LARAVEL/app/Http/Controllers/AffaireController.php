<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Affaire;
use Illuminate\Http\Request;

class AffaireController extends Controller
{
    public function index()
    {
        $affaires = Affaire::with('accord.bien', 'accord.courtier.user', 'accord.user', 'assistant')
            ->get();
        return response()->json([
            'affaires' => $affaires,
        ]);
    }

    public function getAffaire($courtierId, $clientId, $accordId)
    {
        $affaire = Affaire::with('accord.bien', 'accord.courtier.user', 'accord.courtier.agence', 'accord.courtier.agence.evaluation', 'accord.user', 'assistant')
            ->where('accord_id', $accordId)
            ->first();

        if (!$affaire) {
            return response()->json(['message' => 'Affaire not found'], 404);
        }

        return response()->json([
            'affaire' => $affaire,
        ]);
    }
}
