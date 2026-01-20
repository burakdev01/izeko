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
            'title' => $this->faker->sentence(4),
            'office' => $this->faker->company(),
            'price' => $this->faker->randomFloat(2, 1000, 1000000),
            'date' => $this->faker->date(),
            'city' => $this->faker->city(),
            'status' => $this->faker->randomElement(['pending', 'active', 'passive']),
        ];
    }
}
