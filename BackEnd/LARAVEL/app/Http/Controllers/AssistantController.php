<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Assistant;
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
            'email' => 'required|email|unique:users,email',
            'telephone' => 'required|string|max:20',
        ]);

        $assistant = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'telephone' => $validated['telephone'],
            'role' => 'assistant',
            // 'password' => Hash::make(Str::random(10)),
            'password' => Hash::make('password-assistant'),
            'image' => $request['image'],
            'email_verified' => 'true',
            'email_verified_at' => Carbon::now(),
        ]);
        if ($assistant) {
            Assistant::create([
                'user_id' => $assistant->id,
                'status_id' => 5,
            ]);
        }
        $assistants = Assistant::with(['user', 'status'])->get();
        return response()->json([
            'message' => 'Assistant créé et e-mail marqué comme vérifié',
            'assistant' => $assistant,
            'assistants' => $assistants
        ], 201);
    }
}
