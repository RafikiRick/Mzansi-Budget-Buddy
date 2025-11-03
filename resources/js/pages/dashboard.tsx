import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { ChartPieSimple } from '../../../components/ui/shadcn-io/pie-chart-01';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    totalIncome: number;
    totalExpenses: number;
    remainingBudget: number;
    incomeByCategory: Array<{ source: string; total: number }>;
    recentTransactions: Array<{
        id: number;
        name: string;
        amount: string;
        date: string;
        type: string;
    }>;
}

interface PieChartData {
    name: string;
    value: number;
    color?: string;
}

// --- MetricCard Component (Enhanced with Hyperlink Capability) ---
const MetricCard = ({
    title = '',
    value = '',
    colorClass = '',
    href = '',
    hoverBgColor = '',
}) => {
    // NOTE: In a real Inertia/React application, you would use 'router.visit(href)' here.
    const handleClick = () => {
        if (href) {
            router.visit(href);
        }
    };

    return (
        // Added 'cursor-pointer' and enhanced styling for hover/click feel
        <div
            onClick={handleClick}
            className={`group relative flex aspect-video cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/60 bg-gradient-to-br from-white to-neutral-50/50 p-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl dark:border-neutral-700/60 dark:from-neutral-900 dark:to-neutral-800/50 ${hoverBgColor}`}
        >
            <h3 className="text-sm font-medium text-neutral-500 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300">
                {title}
            </h3>
            <p
                className={`text-3xl font-bold ${colorClass} transition-transform duration-300 group-hover:scale-105`}
            >
                R {value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </p>
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 opacity-10 transition-opacity duration-300 group-hover:opacity-5 dark:stroke-neutral-100/20" />

            {/* Subtle gradient overlay on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-white/5" />
        </div>
    );
};

// --- Financial Oversight Component ---
const FinancialOversightBox = ({ income, expenses, incomeByCategory, remainingBudget }) => {
    // ⭐️ LOGIC based on user data ⭐️
    const expenseRatio = (expenses / income) * 100;

    let adviceTitle = 'Excellent Financial Health!';
    let adviceBody = 'Your spending is well under control. Keep up the great work saving and growing your wealth.';
    let adviceColor = 'text-green-500 dark:text-green-400';

    if (expenseRatio > 50 && expenseRatio <= 70) {
        adviceTitle = 'Good Progress, Watch Expenses 🟡';
        adviceBody = `You are spending ${expenseRatio.toFixed(1)}% of your income. Focus on cutting discretionary expenses to boost savings.`;
        adviceColor = 'text-yellow-600 dark:text-yellow-400';
    } else if (expenseRatio > 70) {
        adviceTitle = 'Attention Required: High Spending 🚨';
        adviceBody = `Your expenses are at ${expenseRatio.toFixed(1)}% of your income. Review your budget to prevent future financial strain.`;
        adviceColor = 'text-red-600 dark:text-red-400';
    }

    return (
        <div className="h-full rounded-xl border border-neutral-200/60 bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6 transition-all duration-300 hover:scale-[1.01] hover:bg-white/90 hover:shadow-lg dark:border-neutral-700/60 dark:from-neutral-800 dark:to-neutral-800/80 dark:hover:bg-neutral-800/90">
            <h3 className="mb-4 flex items-center text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Financial Oversight
            </h3>

            <p
                className={`text-lg font-semibold ${adviceColor} transition-colors duration-300`}
            >
                {adviceTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {adviceBody}
            </p>

            <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-white/50 p-2 text-sm transition-colors duration-200 hover:bg-white/80 dark:bg-neutral-700/30 dark:hover:bg-neutral-700/50">
                    <span className="text-neutral-500 dark:text-neutral-400">
                        Income/Expense Ratio:
                    </span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {expenseRatio.toFixed(1)}%
                    </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/50 p-2 text-sm transition-colors duration-200 hover:bg-white/80 dark:bg-neutral-700/30 dark:hover:bg-neutral-700/50">
                    <span className="text-neutral-500 dark:text-neutral-400">
                        Total Income Sources:
                    </span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {incomeByCategory.length}
                    </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/50 p-2 text-sm transition-colors duration-200 hover:bg-white/80 dark:bg-neutral-700/30 dark:hover:bg-neutral-700/50">
                    <span className="text-neutral-500 dark:text-neutral-400">
                        Projected Savings:
                    </span>
                    <span className="font-semibold text-blue-500 dark:text-blue-400">
                        R {remainingBudget.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- CategorySpendingChart Component ---
const CategorySpendingChart = ({
    incomeByCategory,
}: {
    incomeByCategory: Array<{ source: string; total: number }>;
}) => (
    <div className="relative mb-4 overflow-hidden rounded-xl border border-neutral-200/60 bg-gradient-to-br from-white to-neutral-50/50 p-4 transition-all duration-300 hover:scale-[1.01] hover:bg-white/90 hover:shadow-lg dark:border-neutral-700/60 dark:from-neutral-900 dark:to-neutral-800/50 dark:hover:bg-neutral-800/90">
        <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            Income Category Breakdown
        </h3>

        <div className="scale-130">
            <ChartPieSimple
                data={incomeByCategory.map((cat, index) => {
                    const colors = [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6',
                    ];
                    return {
                        name: cat.source,
                        value: cat.total,
                        color: colors[index % colors.length],
                    };
                })}
            />
        </div>

        <ul className="mt-4 space-y-1 text-sm">
            {incomeByCategory.map((cat, index) => (
                <li
                    key={index}
                    className="flex justify-between rounded-lg p-2 transition-all duration-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-700/50"
                >
                    <span className="font-medium text-blue-500">
                        {cat.source}
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300">
                        {cat.total.toLocaleString('en-ZA', {
                            minimumFractionDigits: 2,
                        })}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

// --- RecentTransactionsList Component ---
const RecentTransactionsList = ({ recentTransactions }) => (
    <div className="relative overflow-hidden rounded-xl border border-neutral-200/60 bg-gradient-to-br from-white to-neutral-50/50 p-4 transition-all duration-300 hover:scale-[1.01] hover:bg-white/90 hover:shadow-lg dark:border-neutral-700/60 dark:from-neutral-900 dark:to-neutral-800/50 dark:hover:bg-neutral-800/90">
        <h3 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            Recent Transactions
        </h3>

        {/* Divider below heading */}
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-600" />

        {/* Scrollable transactions list */}
        <div className="max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between rounded-lg p-3 text-sm transition-all duration-200 hover:bg-neutral-100/70 hover:shadow-sm dark:hover:bg-neutral-700/50"
                    >
                        <div className="flex flex-col">
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                {transaction.name}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {transaction.date}
                            </span>
                        </div>
                        <span
                            className={`${transaction.type === 'income' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'} font-semibold`}
                        >
                            {transaction.amount}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// --- Main Dashboard Component ---
export default function Dashboard({
    totalIncome,
    totalExpenses,
    remainingBudget,
    incomeByCategory,
    recentTransactions,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* 1. Three Boxes on Top for Key Metrics - Now Hyperlinks */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Box 1: Total Income -> Links to /income */}
                    <MetricCard
                        title="Total Income (This Month)"
                        value={totalIncome}
                        colorClass="text-green-600 dark:text-green-400"
                        hoverBgColor="hover:bg-green-100/60 dark:hover:bg-green-900/30"
                        href={route('income.index')} // <--- Hyperlink target
                    />

                    {/* Box 2: Total Expenses -> Links to /expenses */}
                    <MetricCard
                        title="Total Expenses (This Month)"
                        value={totalExpenses}
                        colorClass="text-red-600 dark:text-red-400"
                        href={route('expenses.index')} // <--- Hyperlink target
                        hoverBgColor="hover:bg-red-100/60 dark:hover:bg-red-900/30"
                    />

                    {/* Box 3: Remaining Budget -> Links to /savings-goal */}
                    <MetricCard
                        title="Savings"
                        value={remainingBudget}
                        colorClass="text-blue-600 dark:text-blue-400"
                        href={route('savings.index')} // <--- Hyperlink target
                        hoverBgColor="hover:bg-blue-100/60 dark:hover:bg-blue-900/30"
                    />
                </div>

                {/* 2. One Large Box Underneath for Main Content/Insights */}
                <div className="flex-1 overflow-hidden rounded-xl border border-neutral-200/60 bg-white/50 p-4 dark:border-neutral-700/60 dark:bg-neutral-800/50">
                    {/* This large box is now split into two main areas */}
                    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Left Column (Financial Oversight) - Spans one column */}
                        <div className="md:col-span-1">
                            <FinancialOversightBox
                                income={totalIncome}
                                expenses={totalExpenses}
                                incomeByCategory={incomeByCategory}
                                remainingBudget={remainingBudget}
                            />
                        </div>

                        {/* Right Column (Category Chart & Transactions) - Spans two columns */}
                        <div className="flex flex-col space-y-4 md:col-span-2">
                            <CategorySpendingChart
                                incomeByCategory={incomeByCategory}
                            />
                            <RecentTransactionsList
                                recentTransactions={recentTransactions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
