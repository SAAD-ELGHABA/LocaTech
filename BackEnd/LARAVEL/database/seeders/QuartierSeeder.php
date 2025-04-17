<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Ville;
use App\Models\Quartier;

class QuartierSeeder extends Seeder
{
    public function run()
    {
        // Load the JSON file
        $json = File::get(database_path('seeders/morocco-cities-quartiers.json'));
        $data = json_decode($json, true);

        // Iterate over each city
        foreach ($data as $cityData) {
            // Check if the city data has 'City' key
            if (isset($cityData['City'])) {
                // Find or create the city using the 'City' field
                $city = Ville::firstOrCreate(['nom' => $cityData['City']]);

                // Iterate over each neighborhood of the city
                foreach ($cityData['Neighborhoods'] as $neighborhoodData) {
                    // Check if the neighborhood data has 'Neighborhood' key
                    if (isset($neighborhoodData['Neighborhood'])) {
                        // Create the neighborhood and associate it with the city
                        Quartier::firstOrCreate([
                            'nom' => $neighborhoodData['Neighborhood'],
                            'ville_id' => $city->id,
                        ]);
                    }
                }
            }
        }
    }
}
