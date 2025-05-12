<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Agence;
use App\Models\Evaluation;
use Illuminate\Http\Request;

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
}
