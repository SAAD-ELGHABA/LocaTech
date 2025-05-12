<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EvaluationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = ['débutante', 'intermédiaire', 'professionnelle'];

        foreach ($levels as $level) {
            DB::table('evaluations')->insert([
                'evaluation' => $level,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
