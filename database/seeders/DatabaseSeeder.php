<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );

        Activity::firstOrCreate(
            [
                'title' =>
                    'Mesut GULEROGLU Izmir Emlakcilar Odasi 2018 - 2022 Faaliyetleri',
            ],
            [
                'date' => '2025-11-25',
                'video_url' => 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                'thumbnail' => 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg',
            ]
        );

        Activity::firstOrCreate(
            [
                'title' =>
                    'Izmir Emlakcilar Odasi 1999 - 2013 Yillari Arasindaki Faaliyetleri',
            ],
            [
                'date' => '2025-11-25',
                'video_url' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
                'thumbnail' => 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
            ]
        );

        Activity::firstOrCreate(
            [
                'title' => 'IZEKO BOLGE TEMSILCILERI TOPLANTISI 2015',
            ],
            [
                'date' => '2025-11-25',
                'video_url' => 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                'thumbnail' => 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg',
            ]
        );
    }
}
