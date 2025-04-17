<?php

namespace Database\Seeders;

use App\Models\Ville;
use App\Models\Quartier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Http;

class BiensSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $villes = Ville::all();
        $types = ['maison', 'villa', 'appartement'];
        $typeAffaires = ['acheter', 'louer'];

        $unsplashApiKey = 'qD0j0a5xnYos-jARVLIUoMT0nAItGv3tAt8PxxfXZwI'; // Replace with your actual API key
        $unsplashUrl = 'https://api.unsplash.com/photos/random?query=interior,house&count=5&client_id=' . $unsplashApiKey;

        for ($i = 0; $i < 5000; $i++) {
            $images = [];
            $ville = $faker->randomElement($villes);
            $quartiers = Quartier::where('ville_id', $ville->id)->get(); // Get quartiers for the selected city

            try {
                $response = Http::get($unsplashUrl);
                $imageData = $response->json();

                foreach ($imageData as $image) {
                    if (isset($image['urls']['regular'])) {
                        $images[] = $image['urls']['regular'];
                    }
                }
            } catch (\Exception $e) {
                for ($j = 0; $j < 5; $j++) {
                    $images[] = 'https://source.unsplash.com/1200x700/?interior,house&sig=' . rand(1, 1000);
                }
            }

            DB::table('biens')->insert([
                'courtier_id'      => 1,
                'title'            => $faker->sentence(6),
                'description'      => $faker->paragraph(4),
                'budget'           => $faker->numberBetween(50000, 1000000),
                'superficier'      => $faker->numberBetween(50, 500),
                'ville'            => $ville->nom,
                'quartier'         => $quartiers->isNotEmpty() ? $faker->randomElement($quartiers)->nom : null, // Random quartier name
                'type'             => $faker->randomElement($types),
                'typeAffaire'      => $faker->randomElement($typeAffaires),
                'images'           => json_encode($images),
                'video_url'        => $faker->optional()->url,
                'status'           => 1,
                'chambres'         => $faker->numberBetween(1, 5),
                'salles_de_bain'   => $faker->numberBetween(1, 3),
                'etage'            => $faker->numberBetween(0, 10),
                'meuble'           => $faker->boolean(),
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);
        }
    }
}
