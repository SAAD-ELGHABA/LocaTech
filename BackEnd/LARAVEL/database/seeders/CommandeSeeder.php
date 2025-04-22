<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Commande;
use App\Models\User;
use App\Models\Bien;

class CommandeSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $biens = Bien::all();

        if ($users->count() === 0 || $biens->count() === 0) {
            $this->command->info('No users or biens found. Please seed them first.');
            return;
        }

        // Create 10 fake commandes
        for ($i = 0; $i < 50; $i++) {
            Commande::create([
                'user_id' => $users->random()->id,
                'bien_id' => $biens->random()->id,
            ]);
        }
    }
}
