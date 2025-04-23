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
    public function run(): void
    {
        $faker = Faker::create();
        $villes = Ville::all();
        $types = ['maison', 'villa', 'appartement'];
        $typeAffaires = ['acheter', 'louer'];

        $unsplashApiKey = 'ImFD6SXKkYd1isb7FW9uA5dgMTi1Gq5ZFVOqiUgJckA';
        $unsplashUrl = 'https://api.unsplash.com/photos/random';

<<<<<<< HEAD
        for ($i = 0; $i < 500; $i++) {
=======
        for ($i = 0; $i < 10; $i++) {
>>>>>>> daa75e2324029a3211f698f0dbc43a3bfeaf8059
            $images = [];

            $ville = $faker->randomElement($villes);
            $quartiers = Quartier::where('ville_id', $ville->id)->get();

            try {
                $response = Http::get($unsplashUrl, [
                    'query' => 'interior,house',
                    'count' => 5,
                    'client_id' => $unsplashApiKey,
                ]);

                if ($response->successful()) {
                    $imageData = $response->json();

                    if (is_array($imageData)) {
                        foreach ($imageData as $image) {
                            if (isset($image['urls']['regular'])) {
                                $images[] = $image['urls']['regular'];
                            }
                        }
                    }
                }
            } catch (\Exception $e) {
                // Nothing to do, fallback later
            }

            // If Unsplash fails or returns wrong data, fallback to static Unsplash
            if (count($images) < 5) {
                $images = [];
                for ($j = 0; $j < 5; $j++) {
                    $images[] = 'https://source.unsplash.com/1200x700/?interior,house&sig=' . rand(1, 100);
                }
            }

            DB::table('biens')->insert([
                'courtier_id'      => 2,
                'title'            => $faker->sentence(6),
                'description'      => $faker->paragraph(4),
                'budget'           => $faker->numberBetween(50000, 1000000),
                'superficier'      => $faker->numberBetween(50, 500),
                'ville'            => $ville->nom,
                'quartier'         => $quartiers->isNotEmpty() ? $faker->randomElement($quartiers)->nom : null,
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
