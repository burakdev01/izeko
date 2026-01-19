<?php

namespace Database\Factories;

use App\Models\Announcement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    protected $model = Announcement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = rtrim(fake()->sentence(6), '.');

        return [
            'title' => $title,
            'subtitle' => fake()->sentence(4),
            'excerpt' => fake()->sentence(12),
            'content' => fake()->paragraphs(3, true),
            'image' => fake()->imageUrl(1200, 800),
            'link' => fake()->boolean(60) ? fake()->url() : null,
            'active' => true,
            'sort_order' => fake()->numberBetween(1, 50),
        ];
    }
}
