<?php

namespace Database\Factories;

use App\Models\LiveStream;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LiveStream>
 */
class LiveStreamFactory extends Factory
{
    protected $model = LiveStream::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $videoId = fake()->regexify('[A-Za-z0-9_-]{11}');

        return [
            'title' => rtrim(fake()->sentence(4), '.'),
            'video_url' => 'https://www.youtube.com/watch?v='.$videoId,
            'thumbnail' => 'https://img.youtube.com/vi/'.$videoId.'/hqdefault.jpg',
            'active' => true,
            'sort_order' => fake()->numberBetween(1, 50),
        ];
    }
}
