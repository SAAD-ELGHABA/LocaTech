<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['nom' => 'recente', 'coleur-code' => '#3490dc'],       // bleu
            ['nom' => 'supprimé', 'coleur-code' => '#e3342f'],     // rouge
            ['nom' => 'blocké', 'coleur-code' => '#f6993f'],       // orange
            ['nom' => 'pas activé', 'coleur-code' => '#6c757d'],   // gris foncé
            ['nom' => 'activé', 'coleur-code' => '#38c172'],       // vert
            ['nom' => 'désactivé', 'coleur-code' => '#9561e2'],    // violet
            ['nom' => 'recommandé', 'coleur-code' => '#ffed4a'],   // jaune
        ];

        foreach ($statuses as $status) {
            DB::table('status')->updateOrInsert(
                ['nom' => $status['nom']],
                ['coleur-code' => $status['coleur-code']]
            );
        }
    }
}
