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

        return Inertia::render('savings/index', [
            'savings' => $savings,
            'flash' => [
                'success' => session('success')
            ]
        ]);
    }

    public function create(){
        return Inertia::render('savings/create');
    }

    public function destroy(Saving $saving){
        $saving->delete();
        return redirect()->route('savings.index')->with('success', 'Saving deleted successfully.');
    }

    public function edit(Saving $saving){
        return Inertia::render('savings/edit', compact('saving'));
    }

    public function store(Request $request){
        // Data Validation
        $validated = $request->validate([
            'name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/',
            'target_amount' => 'required|numeric|min:0',
            'saved_amount' => 'required|numeric|min:0',
            'deadline'=> 'required|date|after_or_equal:today',
            'description'=> 'nullable|string|max:255',
        ],[
            'name.regex' => 'The Goal Name field may only contain letters and spaces.',
            'deadline.after_or_equal' => 'The Target Date field cannot be in the past.'
        ]);

        Auth::user()->savings()->create($validated);
        return redirect()->route('savings.index')->with('success', 'Saving created successfully.');
    }


    public function update(Request $request, Saving $saving){
        $validated = $request->validate([
            'name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/',
            'target_amount' => 'required|numeric|min:0',
            'saved_amount' => 'required|numeric|min:0',
            'deadline'=> 'required|required|date|after_or_equal:today',
            'description'=> 'nullable|string|max:255',
        ],[
            'name.regex' => 'The Goal Name field may only contain letters and spaces.',
            'deadline.after_or_equal' => 'The Target Date field cannot be in the past.'
        ]);

        $saving->update($validated);

        return redirect()->route('savings.index')->with('success', 'Saving updated successfully.');
    }

}
