<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VilleSeeder extends Seeder
{
    public function run()
    {
        $villes = [
            ['nom' => 'Casablanca', 'code_postal' => '20000'],
            ['nom' => 'Rabat', 'code_postal' => '10000'],
            ['nom' => 'Fès', 'code_postal' => '30000'],
            ['nom' => 'Marrakech', 'code_postal' => '40000'],
            ['nom' => 'Agadir', 'code_postal' => '80000'],
            ['nom' => 'Tanger', 'code_postal' => '90000'],
            ['nom' => 'Meknès', 'code_postal' => '50000'],
            ['nom' => 'Oujda', 'code_postal' => '60000'],
            ['nom' => 'Kenitra', 'code_postal' => '14000'],
            ['nom' => 'Tétouan', 'code_postal' => '93000'],
            ['nom' => 'Safi', 'code_postal' => '46000'],
            ['nom' => 'El Jadida', 'code_postal' => '24000'],
            ['nom' => 'Béni Mellal', 'code_postal' => '23000'],
            ['nom' => 'Nador', 'code_postal' => '62000'],
            ['nom' => 'Khouribga', 'code_postal' => '25000'],
            ['nom' => 'Taza', 'code_postal' => '35000'],
            ['nom' => 'Settat', 'code_postal' => '26000'],
            ['nom' => 'Mohammedia', 'code_postal' => '28800'],
            ['nom' => 'Ksar El Kebir', 'code_postal' => '92000'],
            ['nom' => 'Larache', 'code_postal' => '92000'],
            ['nom' => 'Errachidia', 'code_postal' => '52000'],
            ['nom' => 'Guelmim', 'code_postal' => '81000'],
            ['nom' => 'Ouarzazate', 'code_postal' => '45000'],
            ['nom' => 'Berrechid', 'code_postal' => '26100'],
            ['nom' => 'Al Hoceima', 'code_postal' => '32000'],
            ['nom' => 'Taroudant', 'code_postal' => '83000'],
            ['nom' => 'Taourirt', 'code_postal' => '65000'],
            ['nom' => 'Berkane', 'code_postal' => '63000'],
            ['nom' => 'Azrou', 'code_postal' => '53100'],
            ['nom' => 'Ifrane', 'code_postal' => '53000'],
            ['nom' => 'Midelt', 'code_postal' => '54350'],
            ['nom' => 'Zagora', 'code_postal' => '47900'],
            ['nom' => 'Essaouira', 'code_postal' => '44000'],
            ['nom' => 'Dakhla', 'code_postal' => '73000'],
            ['nom' => 'Laâyoune', 'code_postal' => '70000'],
            ['nom' => 'Tan-Tan', 'code_postal' => '82000'],
            ['nom' => 'Sidi Ifni', 'code_postal' => '85000'],
            ['nom' => 'Khémisset', 'code_postal' => '15000'],
            ['nom' => 'Khénifra', 'code_postal' => '54000'],
            ['nom' => 'Tiznit', 'code_postal' => '85000'],
            ['nom' => 'El Kelaa des Sraghna', 'code_postal' => '43000'],
            ['nom' => 'Sidi Slimane', 'code_postal' => '14200'],
            ['nom' => 'Sidi Kacem', 'code_postal' => '16000'],
            ['nom' => 'Ouazzane', 'code_postal' => '15100'],
            ['nom' => 'Youssoufia', 'code_postal' => '46300'],
            ['nom' => 'Jerada', 'code_postal' => '63700'],
            ['nom' => 'Guercif', 'code_postal' => '62100'],
        ];

        DB::table('ville')->insert($villes);
    }
}
