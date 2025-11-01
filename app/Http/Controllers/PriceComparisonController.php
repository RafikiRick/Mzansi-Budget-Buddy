<?php

namespace App\Http\Controllers;

use App\Models\PriceComparison;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PriceComparisonController extends Controller
{

    public function index(){

        $priceComparison = PriceComparison::all();

        return Inertia::render('price_comparisons/index', compact('priceComparison'));
    }
}
