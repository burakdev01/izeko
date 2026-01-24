<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $districts = [
            'İstanbul' => ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli', 'Beyoğlu', 'Fatih', 'Maltepe', 'Ataşehir'],
            'Ankara' => ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan'],
            'İzmir' => ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli', 'Gaziemir'],
            'Bursa' => ['Nilüfer', 'Osmangazi', 'Yıldırım'],
            'Antalya' => ['Muratpaşa', 'Kepez', 'Konyaaltı'],
        ];

        foreach ($districts as $provinceName => $districtNames) {
            $province = \App\Models\Province::where('name', $provinceName)->first();
            if ($province) {
                foreach ($districtNames as $districtName) {
                    $province->districts()->firstOrCreate(['name' => $districtName]);
                }
            }
        }
    }
}
