<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Controllers\Controller;
use App\Models\Accord;
use App\Models\Bien;
use App\Models\Courtier;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{

    public function handleAdmin(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user) {
            $user->update([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'telephone' => $validated['telephone'],
                'email' => $validated['email'],
            ]);

            $admin = Admin::where('user_id', $user->id)->first();
            if (!$admin) {
                Admin::create([
                    'user_id' => $user->id,
                ]);
            }

            return response()->json(['message' => 'Admin mis à jour avec succès.']);
        } else {
            $user = User::create([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'email' => $validated['email'],
                'telephone' => $validated['telephone'],
                'password' => bcrypt(Str::random(10)),
            ]);

            Admin::create([
                'user_id' => $user->id,
                'password_admin' => $user->password
            ]);

            return response()->json(['message' => 'Admin créé avec succès.']);
        }
    }

    public function handleUsers(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:20',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user) {
            $user->update([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'telephone' => $validated['telephone'],
                'email' => $validated['email'],

            ]);
        } else {
            $user = User::create([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'email' => $validated['email'],
                'telephone' => $validated['telephone'],
                'password' => bcrypt('defaultpassword'),
                'email_verified_at' => now(),
                'email_verified' => true
            ]);
        }

        return response()->json([
            'message' => $user->wasRecentlyCreated
                ? 'Utilisateur créé avec succès.'
                : 'Informations de l\'utilisateur mises à jour avec succès.',
            'user' => $user,
        ]);
    }

    public function deleteUser($selectedUser)
    {
        $user = User::find($selectedUser);

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé.',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Utilisateur supprimé avec succès.',
        ], 200);
    }

    public function deleteAdmin($selectedAdminId)
    {

        $admin = User::where('id', $selectedAdminId)
            ->where('role', 'admin')
            ->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Administrateur non trouvé.',
            ], 404);
        }

        $admin->delete();

        return response()->json([
            'message' => 'Administrateur supprimé avec succès.',
        ], 200);
    }


    public function lastMonthStats()
    {
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        $courtierCount = Courtier::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $usersCount = User::where('role', 'user')
            ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $biensCount = Bien::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $accordsCount = Accord::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        return response()->json([
            'courtiers' => $courtierCount,
            'users' => $usersCount,
            'biens' => $biensCount,
            'accords' => $accordsCount,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
