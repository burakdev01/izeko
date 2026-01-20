<?php

namespace Database\Seeders;

use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some users to attach to offices
        $users = User::all();

        // Create 10 Active Offices
        Office::factory(10)->create([
            'is_active' => true,
        ])->each(function ($office) use ($users) {
            // Attach random 1-3 users to each office
            $office->users()->attach(
                $users->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

        // Create 5 Inactive Offices
        Office::factory(5)->create([
            'is_active' => false,
        ])->each(function ($office) use ($users) {
             // Attach random 1 user
             $office->users()->attach(
                $users->random(1)->pluck('id')->toArray()
            );
        });
    }
}
