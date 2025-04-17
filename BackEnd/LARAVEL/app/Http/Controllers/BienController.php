<?php

namespace App\Http\Controllers;

use App\Models\Bien;
use App\Http\Controllers\Controller;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Biens = Bien::with('courtier')->where('status', '!=', 'supprimé')->get();

        return response()->json([
            'Biens' => $Biens
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id' => 'nullable|exists:biens,id',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'budget' => 'required|numeric',
                'superficier' => 'required|numeric',
                'ville' => 'required|string|max:255',
                'quartier' => 'nullable|string|max:255',
                'type' => 'required|string|max:255',
                'typeAffaire' => 'required|string|max:255',
                'images' => 'required|array',
                'courtier_id' => 'required|exists:courtiers,id',
                'status' => 'nullable|boolean',
                'chambres' => 'nullable|integer|min:0',
                'salles_de_bain' => 'nullable|integer|min:0',
                'etage' => 'nullable|integer|min:0',
                'meuble' => 'nullable|boolean',
                'video_url' => 'nullable|url',
            ]);

            $bien = Bien::find($validatedData['id'] ?? null);

            if ($bien) {
                $bien->update($validatedData);
                return response()->json([
                    'message' => 'Bien a été modifié avec succès !',
                    'data' => $bien,
                ], 200);
            } else {
                $bien = Bien::create($validatedData);
                return response()->json([
                    'message' => 'Bien a été créé avec succès !',
                    'data' => $bien,
                ], 201);
            }
        } catch (\Throwable $error) {
            return response()->json([
                'message' => 'Une erreur est survenue lors du traitement.',
                'error' => $error->getMessage(),
            ], 400);
        }
    }


    /**
     * Display the specified resource.
     */
    public function filter(Request $request)
    {
        try {
            $filters = $request->only(['type', 'typeAffaire', 'budget', 'ville']);

            $query = Bien::query();

            // Apply 'type' filter
            if (!empty($filters['type'])) {
                $query->where('type', $filters['type']);
            }

            // Apply 'typeAffaire' filter
            if (!empty($filters['typeAffaire'])) {
                $query->where('typeAffaire', $filters['typeAffaire']);
            }

            // Apply 'ville' filter
            if (!empty($filters['ville'])) {
                $query->where('ville', $filters['ville']);
            }

            // Apply 'budget' filter (expecting ['min' => value, 'max' => value|null])
            if (!empty($filters['budget']) && is_array($filters['budget'])) {
                if (isset($filters['budget']['min']) && $filters['budget']['min'] !== null) {
                    $query->where('budget', '>=', $filters['budget']['min']);
                }
                if (array_key_exists('max', $filters['budget']) && $filters['budget']['max'] !== null) {
                    $query->where('budget', '<=', $filters['budget']['max']);
                }
            }

            $biens = $query->get();

            return response()->json([
                'success' => true,
                'biens' => $biens
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }



    public function show(Bien $bien)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bien $bien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bien $bien)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Bien $bien, $id)
    {
        try {
            $bien = Bien::findOrFail($id);
            $bien->status = 'supprimé';
            $bien->save();

            return response()->json([
                'message' => 'Ce Bien a été supprimé avec succée !',
                'data' => $bien,
            ], 200);
        } catch (Error $error) {
            return response()->json([
                'message' => 'erreur quand la supprition de cette bien !!',
                'error' => $error,
            ], 400);
        }
    }
}
