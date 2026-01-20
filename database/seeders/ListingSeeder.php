<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Listing::factory(10)->create(['listing_status' => 'pending']);
        \App\Models\Listing::factory(10)->create(['listing_status' => 'active']);
        \App\Models\Listing::factory(5)->create(['listing_status' => 'inactive']);
    }
}
