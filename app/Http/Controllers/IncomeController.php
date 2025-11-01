<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Income;

class IncomeController extends Controller
{
    public function index(){
        $incomes = Auth::user()->incomes()->latest()->get();

        return Inertia::render('income/index', compact('incomes'));
    }

    public function create(){
        return Inertia::render('income/create');
    }

    public function store(Request $request){
        //Data Validation
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'source' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        //Use Validated Data
        Auth::user()->incomes()->create($validated);
        return redirect()->route('income.index')->with('success', 'Income created successfully.');
    }
}
