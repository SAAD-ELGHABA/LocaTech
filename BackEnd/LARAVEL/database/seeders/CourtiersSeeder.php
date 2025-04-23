<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Agence;
use App\Models\Courtier;
use App\Models\Status; // Add Status model

class CourtiersSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $agences = Agence::all();
        $statuses = Status::all();

        if ($users->count() > 0 && $agences->count() > 0 && $statuses->count() > 0) {
            foreach ($users->take(100) as $user) {
                Courtier::create([
                    'user_id' => $user->id,
                    'agence_id' => $agences->random()->id,
                    'Années_expérience' => '5',
                    'Type_activité' => 'Vente',
                    'Zone_activité' => 'Marrakech',
                    'SEO' => 'Optimisé',
                    'Licence_professionnelle' => 'path/to/licence.pdf',
                    'Brève_présentation' => 'Courtier avec 5 ans d\'expérience dans l\'immobilier.',
                    'status_id' => $statuses->where('nom', 'pas activé')->first()?->id ?? $statuses->random()->id,
                ]);
            }

            $this->command->info('Courtier seeder completed successfully.');
        } else {
            $this->command->error('Missing required users, agences, or statuses to create courtiers.');
        }
    }
}
