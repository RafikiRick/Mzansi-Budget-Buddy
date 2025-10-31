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
        { name: 'Rent Payment', amount: '- R 3,500', date: 'Oct 25', type: 'expense' },
        { name: 'Electricity', amount: '- R 450', date: 'Oct 24', type: 'expense' },
        { name: 'Freelance Project', amount: '+ R 2,500', date: 'Oct 23', type: 'income' },
        { name: 'Restaurant', amount: '- R 320', date: 'Oct 22', type: 'expense' },
        { name: 'Gas', amount: '- R 600', date: 'Oct 21', type: 'expense' },
    ]
};

// --- MetricCard Component (Enhanced with Hyperlink Capability) ---
const MetricCard = ({ title, value, colorClass = '', href, hoverBgColor }) => {
    // NOTE: In a real Inertia/React application, you would use 'router.visit(href)' here.
    const handleClick = () => {
        console.log(`Navigating to: ${href}`);
        // Example of a client-side navigation that would occur in a full application
        // window.location.href = href; 
    };

    return (
        // Added 'cursor-pointer' and enhanced styling for hover/click feel
        <div 
            onClick={handleClick}
            className={`relative aspect-video overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-800/50 group ${hoverBgColor}`}
        >
            <h3 className="text-sm text-neutral-500 dark:text-neutral-400 font-medium transition-colors duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                {title}
            </h3>
            <p className={`text-3xl font-bold ${colorClass} transition-transform duration-300 group-hover:scale-105`}>
                R {value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </p>
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 opacity-10 transition-opacity duration-300 group-hover:opacity-5" />
            
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
    );
};

// --- Financial Oversight Component ---
const FinancialOversightBox = ({ income, expenses }) => {
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
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100/50 dark:from-neutral-800 dark:to-neutral-800/80 rounded-xl p-6 border border-neutral-200/60 dark:border-neutral-700/60 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:bg-white/90 dark:hover:bg-neutral-800/90">
            <h3 className="text-xl font-bold mb-4 flex items-center text-neutral-800 dark:text-neutral-100">
                Financial Oversight 
            </h3>
            
            <p className={`text-lg font-semibold ${adviceColor} transition-colors duration-300`}>{adviceTitle}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">{adviceBody}</p>

            <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-white/50 dark:bg-neutral-700/30 transition-colors duration-200 hover:bg-white/80 dark:hover:bg-neutral-700/50">
                    <span className="text-neutral-500 dark:text-neutral-400">Income/Expense Ratio:</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{expenseRatio.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-white/50 dark:bg-neutral-700/30 transition-colors duration-200 hover:bg-white/80 dark:hover:bg-neutral-700/50">
                    <span className="text-neutral-500 dark:text-neutral-400">Total Income Sources:</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{summaryData.categories.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-white/50 dark:bg-neutral-700/30 transition-colors duration-200 hover:bg-white/80 dark:hover:bg-neutral-700/50">
                    <span className="text-neutral-500 dark:text-neutral-400">Projected Savings:</span>
                    <span className="font-semibold text-blue-500 dark:text-blue-400">R 5,000.00</span> 
                </div>
            </div>
        </div>
    );
};

// --- CategorySpendingChart Component ---
const CategorySpendingChart = () => (
    <div className="relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-4 mb-4 bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-800/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:bg-white/90 dark:hover:bg-neutral-800/90">
        <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">Income Category Breakdown</h3>
        <div className="size-24 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 flex items-center justify-center text-xs text-neutral-600 dark:text-neutral-400 mx-auto shadow-inner transition-transform duration-300 hover:scale-110">
            

[Image of Donut Chart]

        </div>
        <ul className="mt-4 text-sm space-y-1">
            {summaryData.categories.map((cat, index) => (
                <li key={index} className="flex justify-between p-2 rounded-lg transition-all duration-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-700/50">
                    <span className={`${cat.color} font-medium`}>{cat.name}</span>
                    <span className="text-neutral-700 dark:text-neutral-300">{cat.amount}</span>
                </li>
            ))}
        </ul>
    </div>
);

// --- RecentTransactionsList Component ---
const RecentTransactionsList = () => (
    <div className="relative overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-4 bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-900 dark:to-neutral-800/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:bg-white/90 dark:hover:bg-neutral-800/90">
        <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-100">Recent Transactions</h3>
        
        {/* Divider below heading */}
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mb-4" />
        
        {/* Scrollable transactions list */}
        <div className="max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-3">
                {summaryData.recentTransactions.map((transaction, index) => (
                    <li 
                        key={index} 
                        className="flex justify-between items-center text-sm p-3 rounded-lg transition-all duration-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-700/50 hover:shadow-sm"
                    >
                        <div className="flex flex-col">
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">{transaction.name}</span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{transaction.date}</span>
                        </div>
                        <span className={`${transaction.type === 'income' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'} font-semibold`}>
                            {transaction.amount}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
        
    </div>
);


// --- Main Dashboard Component ---
export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                {/* 1. Three Boxes on Top for Key Metrics - Now Hyperlinks */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    
                    {/* Box 1: Total Income -> Links to /income */}
                    <MetricCard 
                        title="Total Income (This Month)" 
                        value={summaryData.totalIncome} 
                        colorClass="text-green-600 dark:text-green-400"
                        href="/income" // <--- Hyperlink target
                        hoverBgColor="hover:bg-green-100/60 dark:hover:bg-green-900/30"
                    />

                    {/* Box 2: Total Expenses -> Links to /expenses */}
                    <MetricCard 
                        title="Total Expenses (This Month)" 
                        value={summaryData.totalExpenses} 
                        colorClass="text-red-600 dark:text-red-400"
                        href="/expenses" // <--- Hyperlink target
                        hoverBgColor="hover:bg-red-100/60 dark:hover:bg-red-900/30"
                    />

                    {/* Box 3: Remaining Budget -> Links to /savings-goal */}
                    <MetricCard 
                        title="Remaining Budget" 
                        value={summaryData.remainingBudget} 
                        colorClass="text-blue-600 dark:text-blue-400"
                        href="/savings" // <--- Hyperlink target
                        hoverBgColor="hover:bg-blue-100/60 dark:hover:bg-blue-900/30"
                    />
                </div>
                
                {/* 2. One Large Box Underneath for Main Content/Insights */}
                <div className="flex-1 overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-4 bg-white/50 dark:bg-neutral-800/50">
                    
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