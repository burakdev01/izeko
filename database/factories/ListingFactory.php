<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => 0,
            'office_id' => $this->faker->numberBetween(1, 10),
            'user_id' => \App\Models\User::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 1000, 1000000),
            'visit_count' => $this->faker->numberBetween(0, 1000),
            'listing_type' => $this->faker->randomElement([0, 1]),
            'listing_status' => $this->faker->randomElement(['pending', 'active', 'inactive']),
        ];
    }
}
