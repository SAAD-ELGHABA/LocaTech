<?php

namespace Database\Seeders;

use App\Models\Ville;
use App\Models\Quartier;
use App\Models\Courtier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BiensSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $villes = Ville::all();
        $courtiers = Courtier::all();
        $types = ['maison', 'villa', 'appartement'];
        $typeAffaires = ['acheter', 'louer'];

        for ($i = 0; $i < 70; $i++) {
            $images = [];

            $ville = $faker->randomElement($villes);
            $quartiers = Quartier::where('ville_id', $ville->id)->get();
            $courtier = $faker->randomElement($courtiers);

            // Generate 5 random images using picsum.photos
            for ($j = 0; $j < 10; $j++) {
                $images[] = 'https://picsum.photos/1200/700?random=' . rand(1, 10000);
            }

            $slag = $faker->slug;
            while (DB::table('biens')->where('slag', $slag)->exists()) {
                $slag = $faker->slug;
            }

            DB::table('biens')->insert([
                'courtier_id'      => $courtier->id,
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
                'status_id'           => 1,
                'chambres'         => $faker->numberBetween(1, 5),
                'salles_de_bain'   => $faker->numberBetween(1, 3),
                'etage'            => $faker->numberBetween(0, 10),
                'meuble'           => $faker->boolean(),
                'created_at'       => now(),
                'updated_at'       => now(),
                'slag'             => $slag,
            ]);
        }
    }
}
