<?php

namespace Database\Factories;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    protected $model = Activity::class;

    public function definition(): array
    {
        $videoId = fake()->regexify('[A-Za-z0-9_-]{11}');

        return [
            'title' => rtrim(fake()->sentence(4), '.'),
            'video_url' => $videoId,
            'thumbnail' => 'https://img.youtube.com/vi/'.$videoId.'/hqdefault.jpg',
            'active' => true,
            'sort_order' => fake()->numberBetween(1, 50),
        ];
    }
}
