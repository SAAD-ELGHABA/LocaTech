<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create the admin user
        $user = User::create([
            'nom' => 'Admin',
            'prenom' => 'Super',
            'email' => 'admin@locatech.com',
            'password' => Hash::make('locatech'), // secure password
            'email_verified' => true,
            'email_verified_at' => now(),
            'telephone' => '0612345678',
            'adresse' => 'Rue des Admins, Marrakech',
            'code_postal' => '40000',
            'ville' => 'Marrakech',
            'CIN' => 'AA123456',
            'age' => 30,
            'sexe' => 'Homme',
            'role' => 'admin',
            'image' => null,
            'fcm_token' => null,
        ]);

        // 2. Create the admin table entry
        Admin::create([
            'user_id' => $user->id,
            'password_admin' => Hash::make('locatech'), // separate admin password if needed
        ]);
    }
}
