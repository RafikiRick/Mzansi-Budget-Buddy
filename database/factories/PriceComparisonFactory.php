<?php

namespace Database\Factories;

use App\Models\PriceComparison;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceComparisonFactory extends Factory
{
    protected $model = PriceComparison::class;

    public function definition()
    {
        // South African grocery products with realistic prices
        $products = [
            // Dairy
            'Clover Full Cream Milk 1L' => ['category' => 'Dairy', 'min' => 22, 'max' => 28],
            'Lactose Free Milk 1L' => ['category' => 'Dairy', 'min' => 30, 'max' => 38],
            'Danone Yogurt 500g' => ['category' => 'Dairy', 'min' => 25, 'max' => 32],
            'Simba Cheese 500g' => ['category' => 'Dairy', 'min' => 65, 'max' => 85],

            // Bakery
            'Albany White Bread 700g' => ['category' => 'Bakery', 'min' => 18, 'max' => 26],
            'Brown Bread 700g' => ['category' => 'Bakery', 'min' => 20, 'max' => 28],
            'Croissants 6-pack' => ['category' => 'Bakery', 'min' => 35, 'max' => 45],

            // Groceries
            'Tastic Rice 2kg' => ['category' => 'Groceries', 'min' => 45, 'max' => 55],
            'Iwisa Maize Meal 2.5kg' => ['category' => 'Groceries', 'min' => 35, 'max' => 45],
            'Coca-Cola 2L' => ['category' => 'Groceries', 'min' => 25, 'max' => 32],
            'Cremora 750g' => ['category' => 'Groceries', 'min' => 55, 'max' => 68],

            // Data/Airtime
            'Vodacom 1GB Data' => ['category' => 'Data/Airtime', 'min' => 85, 'max' => 105],
            'MTN 1GB Data' => ['category' => 'Data/Airtime', 'min' => 89, 'max' => 110],
            'Telkom 1GB Data' => ['category' => 'Data/Airtime', 'min' => 75, 'max' => 95],
            'R50 Airtime' => ['category' => 'Data/Airtime', 'min' => 50, 'max' => 50],
        ];

        // South African retailers
        $stores = [
            'Shoprite',
            'Pick n Pay',
            'Checkers',
            'Woolworths',
            'Spar',
            'Vodacom Store',
            'MTN Store',
            'Telkom Store'
        ];

        // Pick a random product
        $productName = array_rand($products);
        $product = $products[$productName];

        // Generate realistic price for this product
        $price = $this->faker->randomFloat(2, $product['min'], $product['max']);

        return [
            'product' => $productName,
            'store' => $this->faker->randomElement($stores),
            'category' => $product['category'],
            'price' => $price,
            'is_best_deal' => $this->faker->boolean(30), // 30% chance of being best deal
            'user_id' => null,
            'created_at' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-7 days', 'now'),
        ];
    }
}
