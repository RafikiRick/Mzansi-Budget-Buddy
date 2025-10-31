import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// --- Placeholder Data & Logic ---
const summaryData = {
    totalIncome: 25000.00, // Changed to number for calculation
    totalExpenses: 8500.00, // Changed to number for calculation
    remainingBudget: 16500.00,
    categories: [
        { name: 'Salary', percentage: '65%', amount: 'R 16,250', color: 'text-green-500' },
        { name: 'Side Hustle', percentage: '25%', amount: 'R 6,250', color: 'text-yellow-500' },
    ],
    recentTransactions: [
        { name: 'Salary Deposit', amount: '+ R 15,000', date: 'Oct 28', type: 'income' },
        { name: 'Etsy Sale', amount: '+ R 500', date: 'Oct 27', type: 'income' },
        { name: 'Groceries', amount: '- R 800', date: 'Oct 26', type: 'expense' },
    ]
};

// Component to display a key metric
const MetricCard = ({ title, value, colorClass = '' }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-between">
        <h3 className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">{title}</h3>
        <p className={`text-3xl font-bold ${colorClass}`}>R {value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 opacity-10" />
    </div>
);

// --- New Financial Oversight Component ---
const FinancialOversightBox = ({ income, expenses }) => {
    // ⭐️ LOGIC based on user data ⭐️
    const expenseRatio = (expenses / income) * 100;
    
    let adviceTitle = 'Excellent Financial Health!';
    let adviceBody = 'Your spending is well under control. Keep up the great work saving and growing your wealth.';
    let adviceColor = 'text-green-500 dark:text-green-400';

    if (expenseRatio > 50 && expenseRatio <= 70) {
        adviceTitle = 'Good Progress, Watch Expenses';
        adviceBody = `You are spending ${expenseRatio.toFixed(1)}% of your income. Focus on cutting discretionary expenses to boost savings.`;
        adviceColor = 'text-yellow-600 dark:text-yellow-400';
    } else if (expenseRatio > 70) {
        adviceTitle = 'Attention Required: High Spending';
        adviceBody = `Your expenses are at ${expenseRatio.toFixed(1)}% of your income. Review your budget to prevent future financial strain.`;
        adviceColor = 'text-red-600 dark:text-red-400';
    }

    return (
        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center">
                Financial Oversight 
            </h3>
            
            <p className={`text-lg font-semibold ${adviceColor}`}>{adviceTitle}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">{adviceBody}</p>

            <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Income/Expense Ratio:</span>
                    <span className="font-semibold">{expenseRatio.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Total Income Sources:</span>
                    <span className="font-semibold">{summaryData.categories.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Projected Savings:</span>
                    <span className="font-semibold text-blue-500 dark:text-blue-400">R 5,000.00</span> 
                </div>
            </div>
        </div>
    );
};

// Placeholder components from previous step for the right side of the large box
const CategorySpendingChart = () => (
    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 mb-4">
        <h3 className="text-lg font-semibold mb-4">Income Category Breakdown</h3>
        <div className="size-24 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-xs text-neutral-600 dark:text-neutral-400 mx-auto">
            [Image of Donut Chart]
        </div>
        <ul className="mt-4 text-sm space-y-1">
            {summaryData.categories.map((cat, index) => (
                <li key={index} className="flex justify-between">
                    <span className={`${cat.color} font-medium`}>{cat.name}</span>
                    <span>{cat.amount}</span>
                </li>
            ))}
        </ul>
    </div>
);

const RecentTransactionsList = () => (
    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <ul className="space-y-3">
            {summaryData.recentTransactions.map((transaction, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                        <span className="font-medium">{transaction.name}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{transaction.date}</span>
                    </div>
                    <span className={`${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                        {transaction.amount}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);


// --- Main Dashboard Component ---
export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                {/* 1. Three Boxes on Top for Key Metrics */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    
                    {/* Box 1: Total Income */}
                    <MetricCard 
                        title="Total Income (This Month)" 
                        value={summaryData.totalIncome} 
                        colorClass="text-green-600 dark:text-green-400"
                    />

                    {/* Box 2: Total Expenses */}
                    <MetricCard 
                        title="Total Expenses (This Month)" 
                        value={summaryData.totalExpenses} 
                        colorClass="text-red-600 dark:text-red-400"
                    />

                    {/* Box 3: Remaining Budget */}
                    <MetricCard 
                        title="Remaining Budget" 
                        value={summaryData.remainingBudget} 
                        colorClass="text-blue-600 dark:text-blue-400"
                    />
                </div>
                
                {/* 2. One Large Box Underneath for Main Content/Insights */}
                <div className="flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                    
                    {/* This large box is now split into two main areas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                        
                        {/* Left Column (Financial Oversight) - Spans one column */}
                        <div className="md:col-span-1">
                            <FinancialOversightBox 
                                income={summaryData.totalIncome} 
                                expenses={summaryData.totalExpenses} 
                            />
                        </div>

                        {/* Right Column (Category Chart & Transactions) - Spans two columns */}
                        <div className="md:col-span-2 flex flex-col space-y-4">
                            <CategorySpendingChart />
                            <RecentTransactionsList />
                        </div>

                    </div>
                </div>
                
            </div>
        </AppLayout>
    );
}