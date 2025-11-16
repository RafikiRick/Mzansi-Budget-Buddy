import AppLayoutAdmin from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin-dashboard',
    },
];

// --- Dashboard Props ---

interface DashboardAdminProps {
    recentNotifications: Array<{
        id: number;
        user: { name: string };
        type: string;
        data: object;
        created_at: string;
    }>;
    userGrowth: Array<{
        month: string;
        count: number;
    }>;
    financialStats: {
        totalPlatformIncome: number;
        totalPlatformExpenses: number;
        averageSavingsRate: number;
        savingsGoalSuccessRate: number;
        mostCommonCategories: Array<{ category: string; count: number }>;
    };
}

// Notification Entry Component
const NotificationEntry = ({ entry }) => {
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short',
        });
    };

    const renderData = () => {
        const data =
            typeof entry.data === 'string'
                ? JSON.parse(entry.data)
                : entry.data;

        switch (entry.type) {
            case 'Email Change':
                return `${data.old_email} → ${data.new_email}`;
            case 'Name Change':
                return `${data.old_name} → ${data.new_name}`;
            case 'Sign Up':
                return 'New user registration';
            default:
                return JSON.stringify(data);
        }
    };

    return (
        <div className="flex items-center justify-between border-b border-neutral-200/60 p-3 transition duration-200 last:border-b-0 hover:bg-neutral-100/50 dark:border-neutral-700/60 dark:hover:bg-neutral-800">
            <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    {entry.user.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {renderData()}
                </p>
            </div>
            <div className="text-right">
                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                    {entry.type}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {formatDate(entry.created_at)}
                </p>
            </div>
        </div>
    );
};

// Financial Stats Component
const FinancialStats = ({ financialStats }) => {
    return (
        <div className="space-y-4">
            {/* Total Platform Income */}
            <div className="rounded-lg border border-neutral-200/60 bg-gradient-to-br from-green-50 to-green-100/50 p-4 dark:border-neutral-700/60 dark:from-green-950/20 dark:to-green-900/30">
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Total Platform Income
                </h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    R{' '}
                    {financialStats.totalPlatformIncome.toLocaleString(
                        'en-ZA',
                        { minimumFractionDigits: 2 },
                    )}
                </p>
            </div>

            {/* Total Platform Expenses */}
            <div className="rounded-lg border border-neutral-200/60 bg-gradient-to-br from-red-50 to-red-100/50 p-4 dark:border-neutral-700/60 dark:from-red-950/20 dark:to-red-900/30">
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Total Platform Expenses
                </h4>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    R{' '}
                    {financialStats.totalPlatformExpenses.toLocaleString(
                        'en-ZA',
                        { minimumFractionDigits: 2 },
                    )}
                </p>
            </div>

            {/* Average Savings Rate */}
            <div className="rounded-lg border border-neutral-200/60 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 dark:border-neutral-700/60 dark:from-blue-950/20 dark:to-blue-900/30">
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Average Savings Rate
                </h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {financialStats.averageSavingsRate.toFixed(1)}%
                </p>
            </div>

            {/* Savings Goal Success Rate */}
            <div className="rounded-lg border border-neutral-200/60 bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 dark:border-neutral-700/60 dark:from-purple-950/20 dark:to-purple-900/30">
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Savings Goal Success
                </h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {financialStats.savingsGoalSuccessRate.toFixed(1)}%
                </p>
            </div>
        </div>
    );
};

const RadarChartComponent = ({ userGrowth }) => {
    // Sort Data

    const sortedUserGrowth = [...userGrowth].sort((a, b) =>
        a.month.localeCompare(b.month),
    );

    const chartData = sortedUserGrowth.map((item) => ({
        month: new Date(item.month + '-01').toLocaleDateString('en-US', {
            month: 'short',
        }),
        users: item.count,
    }));

    const latestGrowth =
        sortedUserGrowth.length > 1
            ? (
                  ((sortedUserGrowth[sortedUserGrowth.length - 1].count -
                      sortedUserGrowth[sortedUserGrowth.length - 2].count) /
                      sortedUserGrowth[sortedUserGrowth.length - 2].count) *
                  100
              ).toFixed(1)
            : '0';

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                    User Growth Radar
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Showing user growth over the last 6 months
                </p>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chartData}>
                        <PolarGrid stroke="#e5e5e5" />
                        <PolarAngleAxis
                            dataKey="month"
                            tick={{ fill: '#737373', fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                            tick={{ fill: '#737373', fontSize: 10 }}
                        />
                        <Radar
                            name="Users"
                            dataKey="users"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                    Last 6 months
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                    Trending up by {latestGrowth}% this month
                </span>
            </div>
        </div>
    );
};

// --- Admin Dashboard Component ---
export default function DashboardAdmin({
    recentNotifications,
    userGrowth,
    financialStats,
}: DashboardAdminProps) {
    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            {/* Your admin dashboard content */}
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden rounded-xl border border-neutral-200/60 bg-white/50 p-4 dark:border-neutral-700/60 dark:bg-neutral-800/50">
                    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-5">
                        {/* Left Column - Notifications (Full Height) */}
                        <div className="flex flex-col space-y-4 md:col-span-2">
                            <div className="h-full rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                                <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                                    Recent Notifications
                                </h3>
                                <div className="h-[calc(100vh-200px)] overflow-y-auto">
                                    <Link href={route('user-management')}>
                                        {recentNotifications.length > 0 ? (
                                            recentNotifications.map((entry) => (
                                                <NotificationEntry
                                                    key={entry.id}
                                                    entry={entry}
                                                />
                                            ))
                                        ) : (
                                            <p className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                                No recent notifications
                                            </p>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Radar Chart & Financial Aggregation (Stacked) */}
                        <div className="flex flex-col space-y-4 md:col-span-3">
                            {/* Radar Chart */}
                            <div className="rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                                <RadarChartComponent userGrowth={userGrowth} />
                            </div>

                            {/* Financial Aggregation */}
                            <div className="rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                                <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                                    Platform Financial Overview
                                </h3>
                                <FinancialStats
                                    financialStats={financialStats}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayoutAdmin>
    );
}
