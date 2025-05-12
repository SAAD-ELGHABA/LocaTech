<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class AssistantSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'nom' => "Assistant{$i}",
                'prenom' => "Admin{$i}",
                'age' => rand(25, 40),
                'role' => 'assistant',
                'sexe' => $i % 2 == 0 ? 'Femme' : 'Homme',
                'telephone' => '06000000' . $i,
                'adresse' => "Rue Exemple {$i}",
                'code_postal' => '40000',
                'ville' => 'Marrakech',
                'CIN' => "AB12{$i}CD",
                'email' => "assistant{$i}@example.com",
                'email_verified' => true,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'image' => "https://picsum.photos/seed/assistant{$i}/200/200",
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
