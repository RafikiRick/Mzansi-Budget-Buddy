<?php

namespace Database\Seeders;

use App\Models\PriceComparison;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceComparisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PriceComparison::factory()->count(50)->create();
    }
}
