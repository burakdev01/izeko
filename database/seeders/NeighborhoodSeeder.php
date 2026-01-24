<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NeighborhoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $neighborhoods = [
            'Kadıköy' => ['Caferağa', 'Fenerbahçe', 'Caddebostan', 'Suadiye', 'Göztepe', 'Erenköy'],
            'Beşiktaş' => ['Bebek', 'Etiler', 'Levent', 'Ortaköy'],
            'Çankaya' => ['Kızılay', 'Bahçelievler', 'Çayyolu'],
            'Konak' => ['Alsancak', 'Gültepe', 'Basmane'],
        ];

        foreach ($neighborhoods as $districtName => $neighborhoodNames) {
            $district = \App\Models\District::where('name', $districtName)->first();
            if ($district) {
                foreach ($neighborhoodNames as $neighborhoodName) {
                    $district->neighborhoods()->firstOrCreate(['name' => $neighborhoodName]);
                }
            }
        }
    }
}
