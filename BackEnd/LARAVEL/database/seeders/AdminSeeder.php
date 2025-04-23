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
        // You can also loop over multiple users or select specific ones
        $user = User::inRandomOrder()->first(); // pick a random user

        if ($user) {
            Admin::create([
                'user_id' => $user->id,
                'password_admin' => Hash::make('adminpassword123'), // encrypt password
            ]);
        }
    }
}
