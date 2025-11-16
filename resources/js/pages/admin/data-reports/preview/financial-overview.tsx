import { Button } from '@/components/ui/button';
import AppLayoutAdmin from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Reports',
        href: '/admin/data-reports',
    },
    {
        title: 'Financial Overview Preview',
        href: '/admin/data-reports/preview/financial-overview',
    },
];

interface FinancialStats {
    totalPlatformIncome: number;
    totalPlatformExpenses: number;
    averageSavingsRate: number;
    savingsGoalSuccessRate: number;
    mostCommonCategories: Array<{ category: string; count: number }>;
}

interface Props {
    financialStats: FinancialStats;
}

export default function FinancialOverviewPreview({ financialStats }: Props) {
    const netCashFlow = financialStats.totalPlatformIncome - financialStats.totalPlatformExpenses;

    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="Financial Overview Report Preview" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                            Financial Overview Report
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Total income, expenses, and savings rates across the platform
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('data-reports.download.financial-overview')}>
                            Download PDF
                        </Link>
                    </Button>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-green-50 to-green-100/50 p-4 dark:border-neutral-700/60 dark:from-green-950/20 dark:to-green-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Income</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            R {financialStats.totalPlatformIncome.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-red-50 to-red-100/50 p-4 dark:border-neutral-700/60 dark:from-red-950/20 dark:to-red-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Expenses</h3>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            R {financialStats.totalPlatformExpenses.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 dark:border-neutral-700/60 dark:from-blue-950/20 dark:to-blue-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Net Cash Flow</h3>
                        <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            R {netCashFlow.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 dark:border-neutral-700/60 dark:from-purple-950/20 dark:to-purple-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Savings Rate</h3>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {financialStats.averageSavingsRate.toFixed(1)}%
                        </p>
                    </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                        <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                            Savings Goal Performance
                        </h3>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {financialStats.savingsGoalSuccessRate.toFixed(1)}%
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                            Success rate across all savings goals
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                        <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                            Top Expense Categories
                        </h3>
                        <div className="space-y-2">
                            {financialStats.mostCommonCategories.map((category, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-neutral-600 dark:text-neutral-400">{category.category}</span>
                                    <span className="font-medium text-neutral-800 dark:text-neutral-100">{category.count} transactions</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayoutAdmin>
    );
}
