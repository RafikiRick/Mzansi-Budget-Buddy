<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\Notification;
use App\Models\Saving;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $recentNotifications = $this->getRecentNotifications();
        $userGrowth = $this->getUserGrowthData();
        $financialStats = $this->getPlatformFinanialStats();


        return Inertia::render('admin/dashboard-admin', compact(
            'recentNotifications',
            'userGrowth',
            'financialStats'
        ));
    }

    private function getRecentNotifications()
    {
        return Notification::with('user')
            ->where('created_at', '>', now()->subDay())
            ->latest()
            ->get();
    }

    private function getUserGrowthData()
    {
        return User::where('created_at', '>=', now()->subMonths(6))
            ->get()
            ->groupBy(function($user) {
                return $user->created_at->format('Y-m'); // Group by year-month
            })
            ->map(function($monthUsers, $month) {
                return [
                    'month' => $month,
                    'count' => $monthUsers->count()
                ];
            })
            ->values();
    }

    private function getPlatformFinanialStats()
    {
        return [
            'totalPlatformIncome' => Income::sum('amount'),
            'totalPlatformExpenses' => Expense::sum('amount'),
            'averageSavingsRate' => $this->calculateAverageSavingsRate(),
            'savingsGoalSuccessRate' => $this->calculateSavingsGoalSuccess(),
            'mostCommonCategories' => $this->getMostCommonCategories()
        ];
    }

    private function calculateAverageSavingsRate()
    {
        // Your savings rate calculation logic
        $totalIncome = Income::sum('amount');
        $totalExpenses = Expense::sum('amount');

        return $totalIncome > 0 ? (($totalIncome - $totalExpenses) / $totalIncome) * 100 : 0;
    }

    private function calculateSavingsGoalSuccess()
    {
        // Your savings goal success logic
        $totalUsers = User::count();
        $usersWithSuccessfulSavings = Saving::where('current_amount', '>=', DB::raw('target_amount'))->count();

        return $totalUsers > 0 ? ($usersWithSuccessfulSavings / $totalUsers) * 100 : 0;
    }

    private function getMostCommonCategories()
    {
        // Your category analysis logic
        return Expense::select('category', DB::raw('COUNT(*) as count'))
            ->groupBy('category')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get();
    }
}
