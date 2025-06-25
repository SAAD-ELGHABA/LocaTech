<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Courtier;
use App\Models\User;
use App\Models\Ville;
use Illuminate\Support\Facades\Hash;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Password;


class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request)
    {
        try {
            $validation = $request->validate([
                'email' => 'required',
                'password' => $request->input('email_verified') ? '' : 'required',
            ]);
            $credentials = $request->only('email', 'password');
            
            if ($validation && Auth::attempt($credentials)) {
                $user = User::find(Auth::id());
                $token = $user->createToken('authToken')->plainTextToken;
                if ($request->input('remember')) {
                    return response()->json([
                        'user' => $user,
                        'token' => $token
                    ])->cookie('remember_token', $token, 60 * 24 * 7);
                }
                return response()->json([
                    'message' => 'connexion succée !',
                    'user' => $user,
                    'token' => $token
                ]);
            } else {
                return response()->json([
                    'message' => "informations d'identification invalides !"
                ], 401);
            }
        } catch (Error $error) {
            return response()->json([
                'message' => $error->getMessage()
            ], 500);
        }
    }

    public function googleAuth(Request $request)
    {
        try {
            $googleData = $request->all();

            $user = User::where('email', $googleData['email'])->first();
            if ($user) {
                if (!$user->image) {
                    $user->image = $googleData['picture'];
                    $user->save();
                }
                if ($user->role === 'user') {
                    $token = $user->createToken('authToken')->plainTextToken;
                    return response()->json([
                        'message' => 'connexion succée !',
                        'user' => $user,
                        'token' => $token
                    ]);
                } else if ($user->role === 'courtier') {
                    $courtier = Courtier::where('user_id', $user->id)
                        ->with(['agence.evaluation', 'user', 'biens.status'])
                        ->first();
                    if ($courtier && $courtier->status_id === 5) {
                        $token = $user->createToken('authToken')->plainTextToken;
                        return response()->json([
                            'message' => 'connexion succée !',
                            'user' => $user,
                            'token' => $token,
                            'courtier' => $courtier
                        ]);
                    } else {
                        return response()->json([
                            'message' => "votre compte n'est pas activé ou bien n'est pas trouvé !!"
                        ]);
                    }
                }
            } else {
                $user = User::create([
                    'nom' => $googleData['family_name'],
                    'prenom' => $googleData['given_name'],
                    'image' => $googleData['picture'],
                    'age' => $googleData['age'] ?? 18,
                    'role' => 'user',
                    'sexe' => $googleData['gender'] ?? 'male',
                    'telephone' => $googleData['phone'] ?? '0000000000',
                    'adresse' => $googleData['address'] ?? 'LocaTech',
                    'code_postal' => $googleData['postal_code'] ?? 'LocaTech code_postal',
                    'ville' => $googleData['city'] ?? 'LocaTech',
                    'CIN' => $googleData['CIN'] ?? $googleData['sub'],
                    'email' => $googleData['email'],
                    'email_verified' => true,
                    'email_verified_at' => now(),
                    'password' => Hash::make(Str::random(16)),
                ]);

                $token = $user->createToken('authToken')->plainTextToken;

                return response()->json([
                    'message' => 'connexion succée !',
                    'user' => $user,
                    'token' => $token
                ]);
            }
        } catch (Error $error) {
            return response()->json([
                'message' => $error->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        try {
            $request->validate([
                'nom' => 'required',
                'prenom' => 'required',
                'email' => 'required|email|unique:users',
                'telephone' => 'required',
            ], [
                'email.unique' => 'L\'email est déjà utilisé.',
            ]);
            $user = User::create([
                "nom" => $request->input('nom'),
                "prenom" => $request->input('prenom'),
                "email" => $request->input('email'),
                'ville' => $request->input('ville') ?? 'LocaTech',
                "password" => $request->input('password') ?? Hash::make(Str::random(16)),
                "telephone" => $request->input('telephone') ?? $request->input('telephone'),
                "adresse" => $request->input('adresse') ?? 'locatech',
                'age' => $request->input('age') ?? 18,
                'CIN' => $request->input('CIN') ?? 'cin',
                'role' => $request->input('role') ?? 'user',
                'sexe' => $request->input('sexe') ?? 'male',
                'adresse' => $request->input('adresse') ?? 'LocaTech',
                'code_postal' => $request->input('code_postal') ?? 'LocaTech code_postal',
            ]);
            event(new Registered($user));
            if (!$user) {
                return response()->json([
                    'message' => "quelque chose s'est mal passé !"
                ], 500);
            } else {
                $token = $user->createToken('authToken')->plainTextToken;
                return response()->json([
                    'message' => 'Veuillez vérifier votre e-mail pour vérification.',
                    'user' => $user,
                    'token' => $token
                ]);
            }
        } catch (Error $error) {
            return response()->json([
                'message' => $error->getMessage()
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $user = Auth::user();

            $request->validate([
                'nom' => 'sometimes|string|max:255',
                'prenom' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $user->id,
                'telephone' => 'sometimes|string|max:15',
                'adresse' => 'sometimes|string|max:255',
                'code_postal' => 'sometimes',
                'ville' => 'sometimes|string|max:255',
                'CIN' => 'sometimes',
                'age' => 'sometimes|integer|min:1',
                'image' => 'sometimes|url',
            ]);

            $data = $request->only([
                'nom',
                'prenom',
                'email',
                'telephone',
                'adresse',
                'code_postal',
                'ville',
                'CIN',
                'age',
                'image'
            ]);

            $user->update($data);

            return response()->json([
                'message' => 'Profil mis à jour avec succès.',
                'user' => $user
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du profil.',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function ForgetPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();
        $email = $request->input('email');
        if (!$user) {
            return response()->json([
                'message' => "we can't find a user with that email address."
            ], 404);
        }
        $user->notify(new ResetPasswordNotification($user));
        return response()->json([
            'message' => "we sent an email to $email"
        ]);
    }

    public function ResetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PasswordReset
            ? response()->json([
                'message' => trans($status),
                'success' => 'yes',
            ])
            : response()->json([
                'message' => trans($status)
            ], 400);
    }
}
