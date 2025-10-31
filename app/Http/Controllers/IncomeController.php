<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index(){
        return Inertia::render('income/index', []);
    }

    public function create(){
        return Inertia::render('income/create');
    }

    public function store(Request $request){
        //Data Validation
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'source' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        return redirect()->route('income.index')->with('success', 'Income created successfully.');
    }
}
