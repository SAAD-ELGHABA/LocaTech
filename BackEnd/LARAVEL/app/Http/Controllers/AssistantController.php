<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Assistant;
use App\Models\Bien;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class AssistantController extends Controller
{


    public function storeAssistant(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email',
            'telephone' => 'required|string|max:20',
        ]);

        $user = User::where('email', $validated['email'])->first();
        $message = '';
        if ($user) {
            $user->update([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'telephone' => $validated['telephone'],
                'email' => $validated['email'],
                'role' => 'assistant',
                'image' => null,
                'email_verified' => true,
                'email_verified_at' => Carbon::now(),
            ]);

            $assistant = Assistant::where('user_id', $user->id)->first();
            if (!$assistant) {
                Assistant::create([
                    'user_id' => $user->id,
                    'status_id' => 5,
                ]);
            }
            $message = 'Assistant mis à jour avec succès.';
        } else {
            $user = User::create([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'email' => $validated['email'],
                'telephone' => $validated['telephone'],
                'role' => 'assistant',
                'password' => Hash::make('password-assistant'),
                'image' => $request->input('image'),
                'email_verified' => true,
                'email_verified_at' => Carbon::now(),
            ]);

            Assistant::create([
                'user_id' => $user->id,
                'status_id' => 5,
            ]);
            $message = 'Assistant créé avec succès.';
        }

        $assistants = Assistant::with(['user', 'status'])->get();

        return response()->json([
            'message' => $message,
            'assistant' => $user,
            'assistants' => $assistants,
        ], 201);
    }

    public function getBiens()
    {
        $status = Status::all();
        $allBiens = Bien::with(['courtier.user', 'status'])->get();
        return response()->json([
            'allBiens' => $allBiens,
            'status' => $status
        ]);
    }

}
