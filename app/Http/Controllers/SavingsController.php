<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Saving;

class SavingsController extends Controller
{
    public function index(){
        $savings = Auth::user()->savings()
        ->orderBy('deadline', 'desc')
        ->orderBy('created_at', 'desc')
        ->get();
        return Inertia::render('savings/index', compact('savings'));    }

    public function create(){
        return Inertia::render('savings/create');
    }

    public function store(Request $request){
        // Data Validation
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'saved_amount' => 'required|numeric|min:0',
            'deadline'=> 'required|date',
            'description'=> 'required|string|max:255',
        ]);

        Auth::user()->savings()->create($validated);
        return redirect()->route('savings.index')->with('success', 'Saving created successfully.');
    }

    public function destroy(Saving $saving){
        $saving->delete();
        return redirect()->route('savings.index')->with('success', 'Saving deleted successfully.');
    }

    public function update(Request $request, Saving $saving){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'saved_amount' => 'required|numeric|min:0',
            'deadline'=> 'required|date',
            'description'=> 'required|string|max:255',
        ]);

        $saving->update([
            'name' => $request->input('name'),
            'target_amount' => $request->input('target_amount'),
            'saved_amount' => $request->input('saved_amount'),
            'deadline' => $request->input('deadline'),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('savings.index')->with('success', 'Saving updated successfully.');
    }

    public function edit(Saving $saving){
        return Inertia::render('savings/edit', compact('saving'));
    }
}
