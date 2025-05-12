<?php

namespace App\Http\Controllers;

use App\Models\Bien;
use App\Http\Controllers\Controller;
use App\Models\Courtier;
use App\Models\Status;
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
        $Biens = Bien::with('courtier')
            ->whereIn('status_id', [1, 5, 7])
            ->with(['status', 'courtier'])
            ->take(10)
            ->get();

        return response()->json([
            'Biens' => $Biens
        ], 200);
    }
    public function getBienAssistant()
    {

        $Biens = Bien::with(['status', 'courtier.agence.evaluation', 'courtier.user'])
            ->join('status', 'biens.status_id', '=', 'status.id')
            ->orderByRaw("FIELD(status.nom, 'brouillé', 'désactivé', 'activé')")
            ->select('biens.*')
            ->take(10)
            ->get();


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
            $courtier = Courtier::where('id', $request->input('courtier_id'))->with('agence.evaluation')->first();
            if (!$courtier) {
                return response()->json([
                    'message' => 'aucune courtier trouvé !'
                ]);
            }
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
                'chambres' => 'nullable|integer|min:0',
                'salles_de_bain' => 'nullable|integer|min:0',
                'etage' => 'nullable|integer|min:0',
                'meuble' => 'nullable|boolean',
                'video_url' => 'nullable|url',
            ]);
            if ($courtier->agence->evaluation->id === 1) {
                $validatedData['status_id'] = 8;
            } elseif ($courtier->agence->evaluation->id === 2) {
                $validatedData['status_id'] = 1;
            }
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
                    'message' => $courtier->agence->evaluation->id === 1 ? "votre annonce sera acceptée par l'assistant dans environ 24h" : "Bien a été créé avec succès !",
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

            if (!empty($filters['type'])) {
                $query->where('type', $filters['type']);
            }

            if (!empty($filters['typeAffaire'])) {
                $query->where('typeAffaire', $filters['typeAffaire']);
            }

            if (!empty($filters['ville'])) {
                $query->where('ville', $filters['ville']);
            }

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

    public function brouiller(Bien $bien, $id)
    {
        try {
            $bien = Bien::findOrFail($id);
            $bien->status = 6;
            $bien->save();

            return response()->json([
                'message' => 'Ce Bien a été brouillé avec succée !',
                'data' => $bien,
            ], 200);
        } catch (Error $error) {
            return response()->json([
                'message' => 'erreur quand la brouillage de cette bien !!',
                'error' => $error,
            ], 400);
        }
    }


    public function activer(Bien $bien, $id)
    {
        try {
            $bien = Bien::findOrFail($id);
            $bien->status = 5;
            $bien->save();

            return response()->json([
                'message' => 'Ce Bien a été activé avec succée !',
                'data' => $bien,
            ], 200);
        } catch (Error $error) {
            return response()->json([
                'message' => 'erreur quand la activation de cette bien !!',
                'error' => $error,
            ], 400);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function delete(Bien $bien, $id)
    {
        try {
            $bien = Bien::findOrFail($id);
            $bien->status = 2;
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

    public function statusBien(Request $request, $id)
    {
        try {
            $bien = Bien::with(['status', 'courtier.agence.evaluation', 'courtier.user'])->findOrFail($id);

            $status = Status::where('nom', $request->status)->first();

            if (!$status) {
                return response()->json([
                    'message' => 'Statut non trouvé.',
                ], 404);
            }

            $bien->status_id = $status->id;
            $bien->save();
            $Biens = Bien::with(['status', 'courtier.agence.evaluation', 'courtier.user'])
                ->join('status', 'biens.status_id', '=', 'status.id')
                ->orderByRaw("FIELD(status.nom, 'brouillé', 'désactivé', 'activé')")
                ->select('biens.*')
                ->get();
            return response()->json([
                'message' => "Le statut de ce bien a changé en {$status->nom} avec succès.",
                'bienUpdated' => $bien,
                'Biens' => $Biens
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du statut.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
