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

    public function edit(Income $income){
        return Inertia::render('income/edit', compact('income'));
    }

    public function destroy(Income $income){
        $income->delete();
        return redirect()->route('income.index')->with('success', 'Income deleted successfully.');
    }

    public function store(Request $request){
        //Data Validation
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'title' => [
                'required',
                'string',
                'max:255',
                'regex:/^[A-Za-z\s]+$/'
            ],
            'source' => 'required|string|max:255',
            'date' => 'required|date|before_or_equal:today',
        ], [
            'title.regex' => 'The Income Description field may only contain letters and spaces.',
            'date.before_or_equal' => 'The Date field cannot be in the future.',
        ]);

        Auth::user()->incomes()->create($validated);
        return redirect()->route('income.index')->with('success', 'Income created successfully.');
    }

    public function update(Request $request, Income $income){
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'title' => [
                'required',
                'string',
                'max:255',
                'regex:/^[A-Za-z\s]+$/'
            ],
            'source' => 'required|string|max:255',
            'date' => 'required|date|before_or_equal:today',
        ], [
            'title.regex' => 'The Income Description field may only contain letters and spaces.',
            'date.before_or_equal' => 'The Date field cannot be in the future.',
        ]);

        $income->update($validated);
        return redirect()->route('income.index')->with('success', 'Income updated successfully.');
    }

}
