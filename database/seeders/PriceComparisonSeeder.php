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
        // Seed Records
        PriceComparison::factory()->count(50)->create();

        //Update and select only the lowest as the best given a product
        $products = PriceComparison::select('product')->distinct()->get();

        foreach ($products as $product) {
            // Search for lowest price for given product
            $bestDeal = PriceComparison::where('product', $product->product)
                ->orderBy('price', 'asc')
                ->first();

            //Reset others that dont meat it for best deal
            PriceComparison::where('product', $product->product)->update([
                'is_best_deal'=>false
            ]);

            //Set only lowest as best
            $bestDeal->update(['is_best_deal'=>true]);
        }
    }
}
