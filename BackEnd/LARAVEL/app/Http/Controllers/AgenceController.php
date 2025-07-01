<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Agence;
use App\Models\Courtier;
use App\Models\Evaluation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AgenceController extends Controller
{
    public function evaluation(Request $request, $id)
    {
        try {
            $evaluation = $request->input('evaluation');

            $evaluationId = Evaluation::where('evaluation', $evaluation)->first()->id;

            $agence = Agence::find($id);

            if ($agence) {
                $agence->update(['evaluation_id' => $evaluationId]);
                $agence->save();
            } else {
                return response()->json([
                    'message' => "Agence not found"
                ], 404);
            }
            $agences = Agence::with(['courtier.user'])->get();
            return response()->json([
                'evaluationId' => $evaluationId,
                'agence' => $agence,
                'message' => "Evaluation updated successfully",
                'agences' => $agences
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Une erreur est survenue lors de la mise à jour d'evaluation",
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            $agences = Agence::with(['courtier.user', 'evaluation'])->get();
            return response()->json([
                'agences' => $agences
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Une erreur est survenue lors de la récupération des agences",
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function toggleAgence(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required',
            'telephone' => 'required',
            'email' => 'required|email',
            'RC' => 'required',
            'Numéro_ICE' => 'required',
            'evaluation_id' => 'nullable|exists:evaluations,id',
        ]);
        $agence = Agence::where('email', $validatedData['email'])
            ->orWhere('agence', $validatedData['nom'])
            ->first();

        if ($agence) {
            $agence->update([
                'agence' => $validatedData['nom'],
                'telephone' => $validatedData['telephone'],
                'email' => $validatedData['email'],
                'RC' => $validatedData['RC'],
                'Numéro_ICE' => $validatedData['Numéro_ICE'],
                'evaluation_id' => $validatedData['evaluation_id'] ?? 1,
            ]);
            return response()->json([
                'message' => "Agence mise à jour avec succès",
                'agence' => $agence
            ], 200);
        } else {
            $agence = Agence::create([
                'agence' => $validatedData['nom'],
                'telephone' => $validatedData['telephone'],
                'email' => $validatedData['email'],
                'RC' => $validatedData['RC'],
                'Numéro_ICE' => $validatedData['Numéro_ICE'],
                'evaluation_id' => $validatedData['evaluation_id'] ?? 1,
            ]);
            return response()->json([
                'message' => "Agence créée avec succès",
                'agence' => $agence
            ], 201);
        }
    }

    public function deleteAgence($selectedAgenceId)
    {
        DB::beginTransaction();

        try {
            $agence = Agence::find($selectedAgenceId);

            if (!$agence) {
                return response()->json(['message' => 'Agence introuvable'], 404);
            }

            $courtiers = Courtier::where('agence_id', $agence->id)->get();

            foreach ($courtiers as $courtier) {
                if ($courtier->user_id) {
                    $user = User::find($courtier->user_id);
                    if ($user) {
                        $user->delete();
                    }
                }
                $courtier->delete();
            }
            $agence->delete();
            DB::commit();
            return response()->json(['message' => 'Agence et courtiers supprimés avec succès.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur lors de la suppression', 'error' => $e->getMessage()], 500);
        }
    }
}
