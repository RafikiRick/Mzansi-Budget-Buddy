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

        return Inertia::render('expenses/index', compact('expenses'));
    }

    public function create(){
        return Inertia::render('expenses/create');
    }

    public function store(Request $request){
        //Data Validation
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        //Use Validated Data
        Auth::user()->expenses()->create($validated);
        return redirect()->route('expenses.index')->with('success', 'Expense created successfully.');

    }
}
