<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Accord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccordController extends Controller
{
    public function metterAccord(Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:accepted,rejected,autre',
            'commentaire' => 'nullable|string|max:1000',
            'bienId' => 'required|integer|exists:biens,id',
            'courtierId' => 'required|integer|exists:courtiers,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

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

    public function index()
    {
        $accords = Accord::with(['user', 'bien'])->get();
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
        $accords = Accord::with(['user', 'courtier.user', 'bien'])->get();
        return $accords;
    }
}
