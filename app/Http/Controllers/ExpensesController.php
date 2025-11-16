<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Expense;
use Illuminate\Support\Facades\Auth;

class ExpensesController extends Controller
{
    public function index(){
        $expenses = Auth::user()->expenses()->latest()
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('expenses/index', [
            'expenses' => $expenses,
            'flash' => [
                'success' => session('success')
            ]
        ]);
    }

    public function create(){
        return Inertia::render('expenses/create');
    }

    public function destroy(Expense $expense){
        $expense->delete();
        return redirect()->route('expenses.index')->with('success', 'Expense deleted successfully.');
    }

    public function edit(Expense $expense){
        return Inertia::render('expenses/edit', compact('expense'));
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
            'category' => 'required|string|max:255',
            'date' => 'required|date|before_or_equal:today',
        ], [
            'title.regex' => 'The Expense Description field may only contain letters and spaces.',
            'date.before_or_equal' => 'The Date field cannot be in the future.',
        ]);

        //Use Validated Data
        Auth::user()->expenses()->create($validated);
        return redirect()->route('expenses.index')->with('success', 'Expense created successfully.');

    }

    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'title' => [
                'required',
                'string',
                'max:255',
                'regex:/^[A-Za-z\s]+$/'
            ],
            'category' => 'required|string|max:255',
            'date' => 'required|date|before_or_equal:today',
        ], [
            'title.regex' => 'The Expense Description field may only contain letters and spaces.',
            'date.before_or_equal' => 'The Date field cannot be in the future.',
        ]);

        $expense->update($validated);
        return redirect()->route('expenses.index')->with('success', 'Expense updated successfully.');
    }
}
