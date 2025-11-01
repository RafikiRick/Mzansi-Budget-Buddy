<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\SavingsController;
use App\Http\Controllers\PriceComparisonController;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing-page/welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    //Dashboard Route
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //Income Routes
    Route::get('/income', [IncomeController::class, 'index'])->name('income.index');
    Route::get('/income/create', [IncomeController::class, 'create'])->name('income.create');
    Route::post('/income', [IncomeController::class, 'store'])->name('income.store');
    Route::get('/income/{income}/edit', [IncomeController::class, 'edit'])->name('income.edit');
    Route::put('/income/{income}', [IncomeController::class, 'update'])->name('income.update');
    Route::delete('/income/{income}', [IncomeController::class, 'destroy'])->name('income.destroy');

    // Expense Routes
    Route::get('/expenses', [ExpensesController::class, 'index'])->name('expenses.index');
    Route::get('/expenses/create', [ExpensesController::class, 'create'])->name('expenses.create');
    Route::post('/expenses', [ExpensesController::class, 'store'])->name('expenses.store');
    Route::get('/expenses/{expense}/edit', [ExpensesController::class, 'edit'])->name('expenses.edit');
    Route::put('/expenses/{expense}', [ExpensesController::class, 'update'])->name('expenses.update');
    Route::delete('/expenses/{expense}', [ExpensesController::class, 'destroy'])->name('expenses.destroy');

    //Savings
    Route::get('/savings', [SavingsController::class, 'index'])->name('savings.index');
    Route::get('/savings/create', [SavingsController::class, 'create'])->name('savings.create');
    Route::post('/savings', [SavingsController::class, 'store'])->name('savings.store');
    Route::get('/savings/{saving}/edit', [SavingsController::class, 'edit'])->name('savings.edit');
    Route::put('/savings/{saving}', [SavingsController::class, 'update'])->name('savings.update');
    Route::delete('/savings/{saving}', [SavingsController::class, 'destroy'])->name('savings.destroy');

    //Price Comparisons
    Route::get('/price_comparisons', [PriceComparisonController::class, 'index'])->name('price_comparisons.index');
});

require __DIR__.'/settings.php';
