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
        title: 'Savings Performance Preview',
        href: '/admin/data-reports/preview/savings-performance',
    },
];

interface SavingsStats {
    successRate: number;
    totalGoals: number;
    completedGoals: number;
}

interface Props {
    savingsStats: SavingsStats;
}

export default function SavingsPerformancePreview({ savingsStats }: Props) {
    const completionRate =
        savingsStats.totalGoals > 0
            ? (savingsStats.completedGoals / savingsStats.totalGoals) * 100
            : 0;

    const activeGoals = savingsStats.totalGoals - savingsStats.completedGoals;

    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="Savings Performance Report Preview" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                            Savings Performance Report
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Success rates and progress on savings goals across
                            the platform
                        </p>
                    </div>
                    <Button asChild>
                        <Link
                            href={route(
                                'data-reports.download.savings-performance',
                            )}
                        >
                            Download PDF
                        </Link>
                    </Button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-green-50 to-green-100/50 p-4 dark:border-neutral-700/60 dark:from-green-950/20 dark:to-green-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Success Rate
                        </h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {savingsStats.successRate.toFixed(1)}%
                        </p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            User success rate
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 dark:border-neutral-700/60 dark:from-blue-950/20 dark:to-blue-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Total Goals
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {savingsStats.totalGoals}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            All savings goals
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 dark:border-neutral-700/60 dark:from-purple-950/20 dark:to-purple-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Completed Goals
                        </h3>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {savingsStats.completedGoals}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            Successfully achieved
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 dark:border-neutral-700/60 dark:from-orange-950/20 dark:to-orange-900/30">
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            Completion Rate
                        </h3>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {completionRate.toFixed(1)}%
                        </p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            Goal completion rate
                        </p>
                    </div>
                </div>

                {/* Progress Visualization */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                    <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                        Goal Progress Overview
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="mb-1 flex justify-between text-sm">
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    Completed Goals
                                </span>
                                <span className="font-medium text-neutral-800 dark:text-neutral-100">
                                    {savingsStats.completedGoals} /{' '}
                                    {savingsStats.totalGoals}
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 ">
                                <div
                                    className="h-2 rounded-full bg-green-600"
                                    style={{ width: `${completionRate || 0}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-1 flex justify-between text-sm">
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    Active Goals
                                </span>
                                <span className="font-medium text-neutral-800 dark:text-neutral-100">
                                    {activeGoals} / {savingsStats.totalGoals}
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                                <div
                                    className="h-2 rounded-full bg-blue-600"
                                    style={{
                                        width: `${savingsStats.totalGoals > 0 ? (activeGoals / savingsStats.totalGoals) * 100 : 0}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Summary */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                    <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                        Performance Insights
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="p-4 text-center">
                            <div className="mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
                                {savingsStats.successRate.toFixed(1)}%
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                of users have successfully completed at least
                                one savings goal
                            </p>
                        </div>
                        <div className="p-4 text-center">
                            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {completionRate.toFixed(1)}%
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                of all savings goals have been successfully
                                completed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayoutAdmin>
    );
}
