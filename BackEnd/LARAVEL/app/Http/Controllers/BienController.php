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
        // return $request->input('images');
        try {
            $validatedData = $request->validate([
            'id' => 'nullable|exists:biens,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required',
            'superficier' => 'required',
            'mapUrl' => 'required',
            'ville' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'typeAffaire' => 'required|string|max:255',
            ]);

            $validatedData['courtier_id'] = $request->input('courtier_id');
            $validatedData['images'] = $request->input('images');

            if (!$validatedData) {
            return response()->json([
                'message' => 'Validation error.'
            ], 400);
            }

            $bien = Bien::find($validatedData['id']);

            if ($bien) {
            $bien->update($validatedData);
            return response()->json([
                'message' => 'Bien a été modifié avec succée !',
                'data' => $bien,
            ], 200);
            } else {
            $bien = Bien::create($validatedData);
            return response()->json([
                'message' => 'Bien a été crée avec succée',
                'data' => $bien,
            ], 201);
            }
        } catch (Error $error) {
            return response()->json([
            'message' => 'erreur quand faire ce process .. !',
            'error' => $error,
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
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
