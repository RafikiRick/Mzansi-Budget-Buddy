<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\Saving;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
class DataReportController extends Controller
{
    public function index()
    {
        $availableReports = [
            [
                'id' => 1,
                'title' => 'User Growth Report',
                'description' => 'User registration trends over the last 6 months',
                'type' => 'growth',
                'preview_route' => 'data-reports.preview.user-growth',
                'download_route' => 'data-reports.download.user-growth'
            ],
            [
                'id' => 2,
                'title' => 'Platform Financial Overview',
                'description' => 'Total income, expenses, and savings rates',
                'type' => 'financial',
                'preview_route' => 'data-reports.preview.financial-overview',
                'download_route' => 'data-reports.download.financial-overview'
            ],
            [
                'id' => 3,
                'title' => 'Savings Goal Performance',
                'description' => 'Success rates and progress on savings goals',
                'type' => 'savings',
                'preview_route' => 'data-reports.preview.savings-performance',
                'download_route' => 'data-reports.download.savings-performance'
            ]
        ];

        return Inertia::render('admin/data-reports/index', compact('availableReports'));
    }

    public function previewUserGrowth()
    {
        $userGrowth = $this->getUserGrowthData();

        return Inertia::render('admin/data-reports/preview/user-growth', compact('userGrowth'));
    }

    public function downloadUserGrowth()
    {
        $userGrowth = $this->getUserGrowthData();
        $sortedUserGrowth = collect($userGrowth)->sortBy('month')->values();

        $totalUsers = collect($sortedUserGrowth)->sum('count');
        $latestGrowth = $sortedUserGrowth->count() > 1 ?
            (($sortedUserGrowth->last()['count'] - $sortedUserGrowth->slice(-2, 1)->first()['count']) /
                $sortedUserGrowth->slice(-2, 1)->first()['count'] * 100) : 0;

        $pdf = Pdf::loadView('pdf.user-growth', [
            'totalUsers' => $totalUsers,
            'latestGrowth' => number_format($latestGrowth, 1),
            'userGrowth' => $sortedUserGrowth->toArray()
        ]);

        // Add proper headers
        return $pdf->download('user-growth-report-' . date('Y-m-d') . '.pdf', [
            'Content-Type' => 'application/pdf',
        ]);
    }

    public function previewFinancialOverview()
    {
        $financialStats = $this->getPlatformFinanialStats();

        return Inertia::render('admin/data-reports/preview/financial-overview', compact('financialStats'));
    }

    public function downloadFinancialOverview()
    {
        $financialStats = $this->getPlatformFinanialStats();
        $netCashFlow = $financialStats['totalPlatformIncome'] - $financialStats['totalPlatformExpenses'];

        $pdf = Pdf::loadView('pdf.financial-overview', [
            'financialStats' => $financialStats,
            'netCashFlow' => $netCashFlow
        ]);

        return $pdf->download('financial-overview-' . date('Y-m-d') . '.pdf');
    }

    public function previewSavingsPerformance()
    {
        $savingsStats = [
            'successRate' => $this->calculateSavingsGoalSuccess(),
            'totalGoals' => Saving::count(),
            'completedGoals' => Saving::where('current_amount', '>=', DB::raw('target_amount'))->count(),
        ];

        return Inertia::render('admin/data-reports/preview/savings-performance', compact('savingsStats'));
    }

    public function downloadSavingsPerformance()
    {
        $savingsStats = [
            'successRate' => $this->calculateSavingsGoalSuccess(),
            'totalGoals' => Saving::count(),
            'completedGoals' => Saving::where('current_amount', '>=', DB::raw('target_amount'))->count(),
        ];

        $completionRate = $savingsStats['totalGoals'] > 0 ?
            ($savingsStats['completedGoals'] / $savingsStats['totalGoals'] * 100) : 0;

        $activeGoals = $savingsStats['totalGoals'] - $savingsStats['completedGoals'];
        $activeGoalsPercentage = $savingsStats['totalGoals'] > 0 ?
            ($activeGoals / $savingsStats['totalGoals'] * 100) : 0;

        $pdf = Pdf::loadView('pdf.savings-performance', [
            'savingsStats' => $savingsStats,
            'completionRate' => $completionRate,
            'activeGoals' => $activeGoals,
            'activeGoalsPercentage' => $activeGoalsPercentage
        ]);

        return $pdf->download('savings-performance-' . date('Y-m-d') . '.pdf');
    }

    private function getUserGrowthData()
    {
        return User::where('created_at', '>=', now()->subMonths(6))
            ->get()
            ->groupBy(function($user) {
                return $user->created_at->format('Y-m');
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
        $totalIncome = Income::sum('amount');
        $totalExpenses = Expense::sum('amount');

        return $totalIncome > 0 ? (($totalIncome - $totalExpenses) / $totalIncome) * 100 : 0;
    }

    private function calculateSavingsGoalSuccess()
    {
        $totalUsers = User::count();
        $usersWithSuccessfulSavings = Saving::where('current_amount', '>=', DB::raw('target_amount'))->count();

        return $totalUsers > 0 ? ($usersWithSuccessfulSavings / $totalUsers) * 100 : 0;
    }

    private function getMostCommonCategories()
    {
        return Expense::select('category', DB::raw('COUNT(*) as count'))
            ->groupBy('category')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get();
    }
}
