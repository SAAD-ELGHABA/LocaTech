<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Agence;
use App\Models\Courtier;
use App\Models\User;
use App\Mail\CourtierActivated; // Ensure this class exists in the App\Mail namespace and implements Mailable
use App\Models\Status;
use Illuminate\Validation\Rule;
use Error;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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
                'status_id' => 4
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
        $recentCourtiers = Courtier::where('status_id', 4)
            ->with(['user', 'agence'])
            ->get();
        return response()->json($recentCourtiers, 200);
    }

    public function StatusCourtiers(Request $request)
    {
        try {
            $courtier_id = $request->input('idCourtie');
            $status_id = $request->input('status_id');

            $courtier = Courtier::find($courtier_id);
            if (!$courtier) {
                return response()->json([
                    'message' => 'Courtier introuvable.'
                ], 404);
            }

            $courtier->status_id = $status_id;
            $courtier->user->email_verified_at = now();
            $courtier->user->email_verified = true;
            $courtier->user->save();
            $courtier->save();
            $status = Status::where('id', $status_id)->first();
            if ($status && strtolower($status->nom) === 'activé') {
                if ($courtier->user && $courtier->user->email) {
                    $token = $courtier->user->createToken('courtier-token')->plainTextToken;
                    try {
                        Mail::to($courtier->user->email)->send(new CourtierActivated($courtier, $token));
                    } catch (\Exception $e) {
                        Log::error('Email sending failed: ' . $e->getMessage());
                    }
                } else {
                    return response()->json([
                        'message' => 'Email non trouvé pour le courtier.'
                    ], 404);
                }
            }
            return response()->json([
                'message' => "Le statut du courtier a été mis à jour avec succès."
            ], 200);
        } catch (Error $error) {
            return response()->json([
                'message' => $error
            ]);
        }
    }
    public function ActuelCourtier(Request $request)
    {
        try {
            $userId = $request->input('user_id');
            $courtier = Courtier::where('user_id', $userId)
                ->with(['agence.evaluation', 'user', 'biens.status'])
                ->first();

            if (!$courtier) {
                return response()->json([
                    'message' => 'Courtier non trouvé.'
                ], 404);
            }

            return response()->json([
                'ActuelCourtier' => $courtier
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération du courtier.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function updateProfileCourtier(Request $request)
    {
        try {
            $user = Auth::user();
            $validated = $request->validate([
                'nom' => 'sometimes|string|max:255',
                'prenom' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $user->id,
                'telephone' => 'sometimes|string|max:15',
                'image' => 'sometimes|url',

                'Licence_professionnelle' => 'sometimes|file|mimes:pdf,jpg,jpeg,png|max:2048',

                'Brève_présentation' => 'sometimes|string|nullable',
                'Zone_activité' => 'sometimes|string|nullable',
                'SEO' => 'sometimes|string|nullable',
                'Années_expérience' => 'sometimes|integer|nullable',
                'Type_activité' => 'sometimes|string|nullable',
            ]);

            $user->update($request->only(['nom', 'prenom', 'email', 'telephone', 'image']));

            $courtierData = $request->only([
                'Brève_présentation',
                'Zone_activité',
                'SEO',
                'Années_expérience',
                'Type_activité'
            ]);

            if ($request->hasFile('Licence_professionnelle')) {
                $file = $request->file('Licence_professionnelle');
                $path = $file->store('licences', 'public');
                $courtierData['Licence_professionnelle'] = $path;
            }

            $courtier = $user->courtier;

            if ($courtier) {
                $data = $request->all();

                if (isset($data['Brève_présentation'])) {
                    $courtier->{'Brève_présentation'} = $data['Brève_présentation'];
                }

                if (isset($data['Zone_activité'])) {
                    $courtier->{'Zone_activité'} = $data['Zone_activité'];
                }

                if (isset($data['SEO'])) {
                    $courtier->{'SEO'} = $data['SEO'];
                }

                if (isset($data['Années_expérience'])) {
                    $courtier->{'Années_expérience'} = $data['Années_expérience'];
                }

                if (isset($data['Type_activité'])) {
                    $courtier->{'Type_activité'} = $data['Type_activité'];
                }

                if ($request->hasFile('Licence_professionnelle')) {
                    $file = $request->file('Licence_professionnelle');
                    $path = $file->store('licences', 'public');
                    $courtier->{'Licence_professionnelle'} = $path;
                }

                $courtier->save();
            }


            return response()->json([
                'message' => 'Profil mis à jour avec succès.',
                'user' => User::find($user->id),
                'currentCourtier' => $user->courtier()->first()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Erreur lors de la modification du profil.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
