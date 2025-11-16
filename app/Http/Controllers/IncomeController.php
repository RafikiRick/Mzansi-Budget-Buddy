<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Income;

class IncomeController extends Controller
{
    public function index(){
        $incomes = Auth::user()->incomes()->latest()
        ->orderBy('date', 'desc')
        ->orderBy('created_at', 'desc')
        ->get();

        return Inertia::render('income/index', [
            'incomes' => $incomes,
            'flash' => [
                'success' => session('success')
            ]
        ]);
    }

    public function create(){
        return Inertia::render('income/create');
    }

    public function store(Request $request){
        //Data Validation
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'title' => 'required|string|max:255',
            'source' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        //Use Validated Data
        Auth::user()->incomes()->create($validated);
        return redirect()->route('income.index')->with('success', 'Income created successfully.');
    }

    public function destroy(Income $income){
        $income->delete();
        return redirect()->route('income.index')->with('success', 'Income deleted successfully.');
    }

    public function update(Request $request, Income $income){
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'title' => 'required|string|max:255',
            'source' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        $income->update([
            'amount' => $request->input('amount'),
            'title' => $request->input('title'),
            'source' => $request->input('source'),
            'date' => $request->input('date'),
        ]);

        return redirect()->route('income.index')->with('success', 'Income updated successfully.');
    }

    public function edit(Income $income){
        return Inertia::render('income/edit', compact('income'));
    }
}
