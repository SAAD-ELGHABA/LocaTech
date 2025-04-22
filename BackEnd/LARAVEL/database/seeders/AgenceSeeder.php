<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Agence;
use Illuminate\Support\Str;

class AgenceSeeder extends Seeder
{
    public function run(): void
    {
        \Faker\Factory::create('fr_FR')->unique(true); // Optional for French format
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            Agence::create([
                'agence' => $faker->company,
                'Adresse' => $faker->address,
                'telephone' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'Type_activité' => $faker->randomElement(['Vente', 'Location', 'Vente & Location']),
                'Types_biens' => implode(', ', $faker->randomElements(['Appartement', 'Villa', 'Terrain', 'Local commercial'], 2)),
                'Zone_activité' => $faker->city,
                'siteWeb' => $faker->url,
                'SEO' => $faker->sentence(6),
                'Lien_Google_Reviews' => $faker->url,
                'Réseaux_sociaux' => json_encode([
                    'facebook' => $faker->url,
                    'instagram' => $faker->url,
                    'linkedin' => $faker->url,
                ]),
                'Numéro_ICE' => $faker->numerify('#########'),
                'RC' => $faker->numerify('RC#######'),
            ]);
        }
    }
}
