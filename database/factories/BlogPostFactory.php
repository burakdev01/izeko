<?php

namespace Database\Factories;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    protected $model = BlogPost::class;

    public function definition(): array
    {
        $title = rtrim(fake()->sentence(4), '.');

        return [
            'title' => $title,
            'content' => fake()->paragraphs(3, true),
            'image' => fake()->imageUrl(1200, 800),
            'active' => true,
            'seo_title' => $title,
            'seo_description' => fake()->sentence(12),
            'seo_url' => Str::slug($title),
            'sort_order' => fake()->numberBetween(1, 50),
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'active' => false,
        ]);
    }
}
