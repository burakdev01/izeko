<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 20 Active Users
        User::factory(20)->create([
            'is_active' => true,
        ]);

        // Create 10 Pending Users (Inactive)
        User::factory(10)->create([
            'is_active' => false,
        ]);
    }
}
