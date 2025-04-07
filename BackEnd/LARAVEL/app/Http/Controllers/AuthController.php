<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
                    'user' => $user,
                    'token' => $token
                ]);
            } else {
                return response()->json([
                    'message' => 'invalid credentials !'
                ], 401);
            }
        } catch (Error $error) {
            return response()->json([
                'message' => $error->getMessage()
            ], 500);
        }
    }
    public function index()
    {
        //
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
                'email' => 'required',
                'password' => 'required|confirmed',
                'telephone' => 'required',
                'adresse' => 'required',
                'ville' => 'required',
                'CIN' => 'required',
                'age' => 'required',
                'sexe' => 'required',
            ]);
            $villes = Ville::all();
            $ville = $villes->where('nom', $request->input('ville'))->first();
            $user = User::create([
                "nom" => $request->input('nom'),
                "prenom" => $request->input('prenom'),
                "email" => $request->input('email'),
                "password" => Hash::make($request->input('password')),
                "telephone" => $request->input('telephone'),
                "adresse" => $request->input('adresse'),
                "code_postal" => $ville->code_postal,
                "ville" => $request->input('ville'),
                "CIN" => $request->input('CIN'),
                "age" => $request->input('age'),
                "sexe" => $request->input('sexe'),
            ]);
            event(new Registered($user));
            if (!$user) {
                return response()->json([
                    'message' => 'something went wrong !'
                ], 500);
            } else {
                $token = $user->createToken('authToken')->plainTextToken;
                return response()->json([
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
