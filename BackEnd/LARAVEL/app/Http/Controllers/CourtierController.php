<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Agence;
use App\Models\Courtier;
use App\Models\User;
use Illuminate\Validation\Rule;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
}
