import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: '/expenses',
    },
];

const categories = ['All', 'Groceries', 'Transport', 'Food', 'Bills', 'Utilities'];

// --- Helper to get Current Month/Year ---
const getCurrentMonthYear = () => {
    const date = new Date();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
};

// Component for a single expense entry in the list
const ExpenseEntry = ({ entry }) => {
    // Format date from database format (YYYY-MM-DD) to display format
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    };

    const {processing, delete: destroy} = useForm();
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete the ${title} expense?`)) {
            destroy(route('expenses.destroy', id));
        }
    }


    return (
        <div className="group flex items-center justify-between p-4 border-b border-neutral-200/60 dark:border-neutral-700/60 last:border-b-0 hover:bg-neutral-100/50 dark:hover:bg-neutral-800 transition duration-200 cursor-pointer">
            <div className="flex items-start space-x-3 flex-1">
                <div className="flex-1">
                    <p className="font-medium text-sm text-neutral-800 dark:text-neutral-100">{entry.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{formatDate(entry.date)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="font-bold text-red-600 dark:text-red-400 text-sm">
                        - R {parseFloat(entry.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full mt-1">
                        {entry.category}
                    </p>
                </div>
                <div className="flex space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 overflow-hidden p-0 transition-all duration-200 hover:w-16"
                    >
                        <Link href={route('expenses.edit', entry.id)}>
                            <span className="whitespace-nowrap">Edit</span>
                        </Link>
                    </Button>
                    <Button
                        disabled={processing}
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 overflow-hidden p-0 transition-all duration-200 hover:w-16"
                        onClick={() => handleDelete(entry.id, entry.title)}
                    >
                        <span className="whitespace-nowrap">Delete</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

interface Expense {
    id: number;
    title: string;
    amount: string;
    category: string;
    date: string;
    created_at: string;
}

interface PageProps {
    flash?: {
        success?: string;
    };
    expenses?: Expense[];
}

export default function ExpensesIndex({ expenses = []}: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const { flash } = usePage<PageProps>().props;

    // Get current date for header
    const currentMonthYear = useMemo(() => getCurrentMonthYear(), []);

    // --- Filtering Logic with Real Data ---
    const filteredExpenses = useMemo(() => {
        return (expenses || [])
            .filter(entry => activeFilter === 'All' || entry.category === activeFilter)
            .filter(entry =>
                entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [expenses, activeFilter, searchQuery]);

    // Calculate Total Expense for display
    const totalExpenses = useMemo(() =>
            filteredExpenses.reduce((sum, entry) => sum + parseFloat(entry.amount), 0),
        [filteredExpenses]
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />

            {/* Flash Message */}
            {flash?.success && (
                <div className="m-4">
                    <Alert className="bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800">
                        <Megaphone className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800 dark:text-green-400">Success</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-300">
                            {flash.success}
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="relative flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">

                {/* --- 1. Header and Search Bar (Permanent) --- */}
                <div className="flex flex-col gap-3 p-2">
                    {/* Month/Timeframe Title (Uses current date) */}
                    <div className="text-xl font-extrabold text-neutral-800 dark:text-neutral-100">
                        This Month: <span className="text-red-600 dark:text-red-400">{currentMonthYear}</span>
                    </div>

                    {/* Permanent Search Input */}
                    <input
                        type="text"
                        placeholder="Search transactions (e.g., Groceries, Toll)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 border border-neutral-300 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 focus:ring-red-500 focus:border-red-500 transition"
                    />
                </div>

                {/* --- Current Total Expenses Display --- */}
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm">
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">Total Filtered Expenses:</p>
                    <p className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                        R {totalExpenses.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                </div>

                {/* --- 2. Category Filter Buttons (with Add Button integrated) --- */}
                <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide items-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition duration-150 whitespace-nowrap ${
                                activeFilter === category
                                    ? 'bg-red-500 text-white shadow-md hover:bg-red-600'
                                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}

                    {/* --- Integrated Add Expense Button - Now links to create page --- */}
                    <Button asChild className="flex-shrink-0 size-10 rounded-full bg-red-500 text-white text-xl font-bold shadow-md flex items-center justify-center hover:bg-red-600 transition duration-200 ml-4 p-0">
                        <Link href={route('expenses.create')}>+</Link>
                    </Button>
                </div>

                {/* --- 3. Expense History List (With Hover Pop) --- */}
                <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]">
                    <div className="flex-1 overflow-y-auto">
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((entry) => (
                                <ExpenseEntry key={entry.id} entry={entry} />
                            ))
                        ) : (
                            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                                {(expenses || [] ).length === 0 ? (
                                    <div>
                                        <p>No expense entries yet.</p>
                                        <Button asChild className="mt-2">
                                            <Link href={route('expenses.create')}>Add Your First Expense</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    'No expenses found for the current filter or search criteria.'
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
