<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Announcement;
use App\Models\BlogPost;
use App\Models\LiveStream;
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

        BlogPost::firstOrCreate(
            [
                'title' => 'WE ARE SOCIAL 2021 TURKIYE RAPORU',
            ],
            [
                'excerpt' => "Dijital verilerle 2021'e bakis: We Are Social ve Hootsuite raporu.",
                'content' => '2021 raporu, dijital dunyada guncel trendleri ve istatistikleri ele aliyor.',
                'image' => 'https://izeko.org.tr/files/system//t99qo9ZTQBRLIUY8lWmR22fuoAwLuwGA6StWhjLp.png',
                'date' => '2025-11-25',
            ]
        );

        BlogPost::firstOrCreate(
            [
                'title' => 'WE ARE SOCIAL 2020 TURKIYE RAPORU',
            ],
            [
                'excerpt' => '2020 raporu: Emlak sektorunde dijital gelecegin esigindeyiz.',
                'content' => 'Sektorde dijital donusum, online pazarlama ve veri odakli yaklasimlar ele aliniyor.',
                'image' => 'https://izeko.org.tr/files/system//f7JWqwrGCjEsAvbZR9s02uRbVRLKmjnisNYP0Nsg.png',
                'date' => '2025-11-25',
            ]
        );

        BlogPost::firstOrCreate(
            [
                'title' => 'MUSTERIMI NEDEN TANIMALIYIM?',
            ],
            [
                'excerpt' => 'Musterinizi tanimak neden onemlidir? Kisisellestirilmis deneyimlerin gucu.',
                'content' => 'Musteri beklentilerini anlamak, sadakati ve memnuniyeti artirir.',
                'image' => 'https://izeko.org.tr/files/system//TvnhOiApwmIZnPftvQH5IUBLGNh0C1eKM9KwlH5H.png',
                'date' => '2025-11-25',
            ]
        );

        LiveStream::firstOrCreate(
            [
                'title' => 'IZEKO Canli Yayin - Piyasa Degerlendirmesi',
            ],
            [
                'date' => '2025-11-25',
                'video_url' => 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                'thumbnail' => 'https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg',
            ]
        );

        LiveStream::firstOrCreate(
            [
                'title' => 'Gayrimenkul Sektoru Canli Yayini 2025',
            ],
            [
                'date' => '2025-11-25',
                'video_url' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
                'thumbnail' => 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
            ]
        );

        LiveStream::firstOrCreate(
            [
                'title' => 'IZEKO Bolge Temsilcileri Canli Toplanti',
            ],
            [
                'date' => '2025-11-25',
                'video_url' => 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                'thumbnail' => 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg',
            ]
        );

        Announcement::firstOrCreate(
            [
                'title' =>
                    'ODAMIZA YAPILACAK TUM ODEMELER ICIN SISTEMDE GERCEKLESEN DEGISIKLIK',
            ],
            [
                'subtitle' => 'DIKKAT! Onemli Duyuru',
                'excerpt' => 'Sayin Uyelerimiz,',
                'content' =>
                    'Odemeler sisteminde yapilan degisiklikler hakkinda bilgilendirme.',
                'image' => 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
                'link' => null,
                'date' => '2025-11-25',
            ]
        );

        Announcement::firstOrCreate(
            [
                'title' => 'AIDAT ODEMELERI ICIN YENI HATIRLATMA SISTEMI',
            ],
            [
                'subtitle' => 'Bilgilendirme',
                'excerpt' => 'Uyelerimizin dikkatine,',
                'content' =>
                    'Aidat odemelerinde yeni hatirlatma sistemi devreye alinmistir.',
                'image' => 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
                'link' => null,
                'date' => '2025-11-20',
            ]
        );
    }
}
