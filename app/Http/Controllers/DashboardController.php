<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Get current month dates
        $startOfMonth = date('Y-m-01');
        $endOfMonth = date('Y-m-t');

        // Total Income (current month)
        $totalIncome = $user->incomes()
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        // Total Expenses (current month)
        $totalExpenses = $user->expenses()
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        // Remaining Budget
        $remainingBudget = $totalIncome - $totalExpenses;

        // Income by category (for pie chart)
        $incomeByCategory = $user->incomes()
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->selectRaw('source, SUM(amount) as total')
            ->groupBy('source')
            ->get();

        // Recent transactions (last 8, mixed income & expenses)
        $recentIncomes = $user->incomes()
            ->latest('date')
            ->take(5)
            ->get()
            ->map(function($income) {
                return [
                    'id' => $income->id,
                    'name' => $income->title,
                    'amount' => '+ R ' . number_format($income->amount, 2),
                    'date' => date('M d', strtotime($income->date)),
                    'type' => 'income'
                ];
            });

        $recentExpenses = $user->expenses()
            ->latest('date')
            ->take(5)
            ->get()
            ->map(function($expense) {
                return [
                    'id' => $expense->id,
                    'name' => $expense->title,
                    'amount' => '- R ' . number_format($expense->amount, 2),
                    'date' => date('M d', strtotime($expense->date)),
                    'type' => 'expense'
                ];
            });

        // Merge and sort by date (newest first)
        $recentTransactions = $recentIncomes->merge($recentExpenses)
            ->sortByDesc(function($transaction) {
                return strtotime($transaction['date']);
            })
            ->take(8)
            ->values();

        return Inertia::render('dashboard', compact(
            'totalIncome',
            'totalExpenses',
            'remainingBudget',
            'incomeByCategory',
            'recentTransactions'
        ));
    }
}
