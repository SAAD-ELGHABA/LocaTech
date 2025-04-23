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
                $user = Auth::user();
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

            // Check if the user already exists
            $user = User::where('email', $googleData['email'])->first();

            if ($user) {
                // User exists, log them in
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
                    $courtier = Courtier::where('user_id', $user->id)->first();
                    if ($courtier->status_id === 5) {
                        $token = $user->createToken('authToken')->plainTextToken;
                        return response()->json([
                            'message' => 'connexion succée !',
                            'user' => $user,
                            'token' => $token,
                            'courtier' => $courtier
                        ]);
                    } else {
                        return response()->json([
                            'message' => "votre compte n'est pas activé !!"
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
                'ville' => $googleData['city'] ?? 'LocaTech', // Assuming city is optional
                "password" => Hash::make(Str::random(16)),
                "telephone" => $request->input('telephone'),
                "adresse" => $request->input('adresse'),
                'age' => $googleData['age'] ?? 18, // Assuming age is optional
                'CIN' => $googleData['CIN'] ?? 'cin', // Assuming CIN is optional
                'role' => 'user', // Default role
                'sexe' => $googleData['gender'] ?? 'male', // Assuming gender is optional
                'adresse' => $googleData['address'] ?? 'LocaTech', // Assuming address is optional
                'code_postal' => $googleData['postal_code'] ?? 'LocaTech code_postal',
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

    public function store(Request $request)
    {
        //
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
