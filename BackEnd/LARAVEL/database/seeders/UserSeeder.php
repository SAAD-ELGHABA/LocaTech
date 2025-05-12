<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        
        $faker = Faker::create();

        for ($i = 0; $i < 100; $i++) {
            DB::table('users')->insert([
                'nom' => $faker->lastName,
                'prenom' => $faker->firstName,
                'age' => $faker->numberBetween(18, 60),
                'role' => 'courtier',
                'sexe' => $faker->randomElement(['male', 'female']),
                'telephone' => $faker->phoneNumber,
                'adresse' => $faker->address,
                'code_postal' => $faker->postcode,
                'ville' => $faker->city,
                'CIN' => $faker->unique()->numerify('########'),
                'email' => $faker->unique()->safeEmail,
                'email_verified' => true,
                'email_verified_at' => now(),
                'password' => bcrypt('password123'),
                'image' => 'https://picsum.photos/seed/' . uniqid() . '/640/480',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
