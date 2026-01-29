<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Announcement;
use App\Models\BlogPost;
use App\Models\HeroSlide;
use App\Models\LiveStream;
use App\Models\SystemRole;
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

        $adminRole = SystemRole::firstOrCreate(
            ['role_key' => SystemRole::ADMIN_ROLE_KEY],
            ['name' => 'Admin'],
        );

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $adminUser->systemRoles()->syncWithoutDetaching([$adminRole->id]);

        Activity::firstOrCreate(
            [
                'title' => 'Mesut GULEROGLU Izmir Emlakcilar Odasi 2018 - 2022 Faaliyetleri',
            ],
            [
                'video_url' => 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                'thumbnail' => 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg',
                'sort_order' => 1,
            ]
        );

        Activity::firstOrCreate(
            [
                'title' => 'Izmir Emlakcilar Odasi 1999 - 2013 Yillari Arasindaki Faaliyetleri',
            ],
            [
                'video_url' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
                'thumbnail' => 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
                'sort_order' => 2,
            ]
        );

        Activity::firstOrCreate(
            [
                'title' => 'IZEKO BOLGE TEMSILCILERI TOPLANTISI 2015',
            ],
            [
                'video_url' => 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                'thumbnail' => 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg',
                'sort_order' => 3,
            ]
        );

        BlogPost::firstOrCreate(
            [
                'title' => 'WE ARE SOCIAL 2021 TURKIYE RAPORU',
            ],
            [
                'content' => '2021 raporu, dijital dunyada guncel trendleri ve istatistikleri ele aliyor.',
                'image' => 'https://izeko.org.tr/files/system//t99qo9ZTQBRLIUY8lWmR22fuoAwLuwGA6StWhjLp.png',
                'sort_order' => 1,
            ]
        );

        BlogPost::firstOrCreate(
            [
                'title' => 'WE ARE SOCIAL 2020 TURKIYE RAPORU',
            ],
            [
                'content' => 'Sektorde dijital donusum, online pazarlama ve veri odakli yaklasimlar ele aliniyor.',
                'image' => 'https://izeko.org.tr/files/system//f7JWqwrGCjEsAvbZR9s02uRbVRLKmjnisNYP0Nsg.png',
                'sort_order' => 2,
            ]
        );

        BlogPost::firstOrCreate(
            [
                'title' => 'MUSTERIMI NEDEN TANIMALIYIM?',
            ],
            [
                'content' => 'Musteri beklentilerini anlamak, sadakati ve memnuniyeti artirir.',
                'image' => 'https://izeko.org.tr/files/system//TvnhOiApwmIZnPftvQH5IUBLGNh0C1eKM9KwlH5H.png',
                'sort_order' => 3,
            ]
        );

        LiveStream::firstOrCreate(
            [
                'title' => 'IZEKO Canli Yayin - Piyasa Degerlendirmesi',
            ],
            [
                'video_url' => 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                'thumbnail' => 'https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg',
                'sort_order' => 1,
            ]
        );

        LiveStream::firstOrCreate(
            [
                'title' => 'Gayrimenkul Sektoru Canli Yayini 2025',
            ],
            [
                'video_url' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
                'thumbnail' => 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
                'sort_order' => 2,
            ]
        );

        LiveStream::firstOrCreate(
            [
                'title' => 'IZEKO Bolge Temsilcileri Canli Toplanti',
            ],
            [
                'video_url' => 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                'thumbnail' => 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg',
                'sort_order' => 3,
            ]
        );

        Announcement::firstOrCreate(
            [
                'title' => 'ODAMIZA YAPILACAK TUM ODEMELER ICIN SISTEMDE GERCEKLESEN DEGISIKLIK',
            ],
            [
                'subtitle' => 'DIKKAT! Onemli Duyuru',
                'excerpt' => 'Sayin Uyelerimiz,',
                'content' => 'Odemeler sisteminde yapilan degisiklikler hakkinda bilgilendirme.',
                'image' => 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
                'link' => null,
                'sort_order' => 1,
            ]
        );

        Announcement::firstOrCreate(
            [
                'title' => 'AIDAT ODEMELERI ICIN YENI HATIRLATMA SISTEMI',
            ],
            [
                'subtitle' => 'Bilgilendirme',
                'excerpt' => 'Uyelerimizin dikkatine,',
                'content' => 'Aidat odemelerinde yeni hatirlatma sistemi devreye alinmistir.',
                'image' => 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
                'link' => null,
                'sort_order' => 2,
            ]
        );

        HeroSlide::firstOrCreate(
            [
                'title' => "Izmir'de Yasam Bir Ayricaliktir....",
            ],
            [
                'subtitle' => 'Gayrimenkul yatirimlariniz icin yetkili danismanlarla calisin.',
                'image' => 'https://izeko.org.tr/files/system//xT6wJAV6qGwtCDMVtAneKKAg4PiizuGjXQII0lM7.png',
                'video' => null,
                'poster' => null,
                'sort_order' => 1,
            ]
        );

        HeroSlide::firstOrCreate(
            [
                'title' => 'IZEKO CRM NEDIR?',
            ],
            [
                'subtitle' => "Turkiye'nin ilk ve tek esnaf odasi ozel CRM cozumu!",
                'image' => null,
                'video' => 'https://izeko.org.tr/files/system//IOFaZiyIqP3i62Z4BUZN2auVlcWSYqrrDg0x3jTk.mp4',
                'poster' => null,
                'sort_order' => 2,
            ]
        );

        $this->call([
            OfficeSeeder::class,
            ListingSeeder::class,
            FaqSeeder::class,
        ]);
    }
}
