<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Bien;
use App\Models\Rating;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $biens = Bien::all();

        if ($users->count() === 0 || $biens->count() === 0) {
            $this->command->info('Users or Biens not found, skipping rating seeder.');
            return;
        }

        foreach ($biens as $bien) {
            $numberOfRatings = rand(3, 10);

            for ($i = 0; $i < $numberOfRatings; $i++) {
                Rating::create([
                    'bien_id' => $bien->id,
                    'user_id' => $users->random()->id,
                    'rating' => rand(1, 5),
                    'comment' => fake()->sentence(rand(50, 70)),
                    'created_at' => now()->subDays(rand(1, 60)),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
