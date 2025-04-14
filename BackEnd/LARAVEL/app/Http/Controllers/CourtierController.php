<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Agence;
use App\Models\Courtier;
use App\Models\User;
use App\Mail\CourtierActivated; // Ensure this class exists in the App\Mail namespace and implements Mailable
use Illuminate\Validation\Rule;
use Error;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

use function Laravel\Prompts\error;

class CourtierController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validation = $request->validate([
                'step1.nom' => 'required',
                'step1.prenom' => 'required',
                'step1.email' => [
                    'required',
                    'email',
                    Rule::unique('users', 'email')
                ],
                'step1.telephone' => 'required',
                'step2.agence' => 'required',
                'step2.ICE' => 'required',
                'step2.RC' => 'required',
            ], [
                'step1.email.unique' => 'L\'email est déjà utilisé.',
            ]);
            if (!$validation) {
                return response()->json([
                    'message' => 'tous les champes sont obligés !'
                ], 500);
            }
            $user = User::create([
                "nom" => $request['step1']['nom'],
                "prenom" => $request['step1']['prenom'],
                "email" => $request['step1']['email'],
                "password" => Hash::make(Str::random(16)),
                "telephone" => $request['step1']['telephone'],
                'role' => 'courtier',
            ]);
            if (!$user) {
                return response()->json([
                    'message' => 'erreur !!'
                ], 500);
            }
            $Agence = Agence::create([
                'agence' => $request['step2']['agence'],
                'Numéro_ICE' => $request['step2']['ICE'],
                'RC' => $request['step2']['RC'],
            ]);
            if (!$Agence) {
                return response()->json([
                    'message' => 'erreur quand agence !!'
                ], 500);
            }
            $Courtier = Courtier::create([
                'agence_id' => $Agence->id,
                'user_id' => $user->id,
                'status' => 'pas activé'
            ]);
            if (!$Courtier) {
                return response()->json([
                    'message' => 'erreur quand courtier !!'
                ], 500);
            }
            return response()->json([
                'message' => "votre compte a été crée .. aprés 24h va étre validé par l'administration"
            ], 201);
        } catch (Error $error) {
            return response()->json([
                'message' => $error
            ], 500);
        }
    }

    public function recentCourtiers()
    {
        $recentCourtiers = Courtier::where('status', 'pas activé')
            ->with(['user', 'agence'])
            ->get();
        return response()->json($recentCourtiers, 200);
    }

    public function StatusCourtiers(Request $request)
    {
        try {
            $courtier_id = $request->input('idCourtie');
            $status = $request->input('status');

            $courtier = Courtier::find($courtier_id);
            if (!$courtier) {
                return response()->json([
                    'message' => 'Courtier introuvable.'
                ], 404);
            }

            $courtier->status = $status;
            $courtier->user->email_verified_at = now();
            $courtier->user->email_verified = true;
            $courtier->user->save();
            $courtier->save();
            if ($status === 'activé') {
                if ($courtier->user && $courtier->user->email) {
                    $token = $courtier->user->createToken('courtier-token')->plainTextToken;
                    Mail::to($courtier->user->email)->send(new CourtierActivated($courtier, $token));
                }
            }
            return response()->json([
                'message' => "Le statut du courtier a été mis à jour avec succès. avec le status $status"
            ], 200);
        } catch (Error $error) {
            return response()->json([
                'message' => $error
            ]);
        }
    }
    public function ActuelCourtier(Request $request)
    {
        $ActuelCourtier = Courtier::findOrFail($request->input('user_id'));
        return response()->json([
            'ActuelCourtier' => $ActuelCourtier
        ], 200);
    }
}
