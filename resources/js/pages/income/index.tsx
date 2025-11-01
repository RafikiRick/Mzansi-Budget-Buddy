import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income',
        href: '/income',
    },
];

// --- Helper to get Current Month/Year ---
const getCurrentMonthYear = () => {
    const date = new Date();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
};

const sourceOptions = ['All', 'Salary', 'Side Hustle', 'Rental Income', 'Investment'];
const timeframeOptions = ['This Month', 'Last Month', 'Last 3 Months', 'This Year'];


// Component for a single income entry
const IncomeEntry = ({ entry }) => {
    // Format date from database format (YYYY-MM-DD) to display format
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-neutral-200/60 dark:border-neutral-700/60 last:border-b-0 hover:bg-neutral-100/50 dark:hover:bg-neutral-800 transition duration-200 cursor-pointer">
            <div className="flex items-start space-x-3">
                <div>
                    <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{entry.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(entry.date)} | {entry.source}
                    </p>
                </div>
            </div>
            <p className="font-bold text-green-600 dark:text-green-400 text-sm">
                + R {parseFloat(entry.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </p>
        </div>
    );
};

{/*Interface to Confirm with TypeScript*/}
interface Income {
    id: number;
    title: string;
    amount: string;
    source: string;
    date: string;
    created_at: string;
}

interface Props {
    incomes: Income[];
}


export default function IncomeIndex({ incomes }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSourceFilter, setActiveSourceFilter] = useState('All');
    const [activeTimeframeFilter, setActiveTimeframeFilter] = useState('This Month');

    const currentMonthYear = useMemo(() => getCurrentMonthYear(), []);

    // --- Filtering Logic with Real Data ---
    const filteredIncome = useMemo(() => {
        return incomes
            .filter(entry => activeSourceFilter === 'All' || entry.source === activeSourceFilter)
            .filter(entry =>
                entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.source.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [incomes, activeSourceFilter, searchQuery]);

    const totalIncome = useMemo(() =>
            filteredIncome.reduce((sum, entry) => sum + parseFloat(entry.amount), 0),
        [filteredIncome]
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Income" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">

                {/* --- 1. Header and Search Bar --- */}
                <div className="flex flex-col gap-3 p-2">
                    <div className="text-xl font-extrabold text-neutral-800 dark:text-neutral-100">
                        Income History: <span className="text-green-600 dark:text-green-400">{currentMonthYear}</span>
                    </div>

                    <input
                        type="text"
                        placeholder="Search income (e.g., Salary, Project title)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 border border-neutral-300 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 focus:ring-green-500 focus:border-green-500 transition"
                    />
                </div>

                {/* --- 2. Top Summary Card --- */}
                <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer">
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950/30 rounded-lg flex justify-between items-center transition-colors">
                        <div>
                            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Total Income ({activeTimeframeFilter})</p>
                            <p className="text-3xl font-extrabold text-green-700 dark:text-green-400 mt-1 transition-transform hover:scale-105">
                                R {totalIncome.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- 3. Income History and Filters --- */}
                <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]">

                    {/* Filters and Header */}
                    <div className="flex justify-between items-center p-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                        <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">Transactions</h3>
                        <div className="flex space-x-2 text-sm items-center">

                            {/* Source Filter Dropdown */}
                            <div className="relative group">
                                <button className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition">
                                    Source: {activeSourceFilter} <span className="ml-1">▼</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-neutral-200/60 dark:border-neutral-700">
                                    {sourceOptions.map(option => (
                                        <div
                                            key={option}
                                            onClick={() => setActiveSourceFilter(option)}
                                            className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${activeSourceFilter === option ? 'bg-neutral-200/70 dark:bg-neutral-700/70' : ''}`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Timeframe Filter Dropdown */}
                            <div className="relative group">
                                <button className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition">
                                    Timeframe: {activeTimeframeFilter} <span className="ml-1">▼</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-neutral-200/60 dark:border-neutral-700">
                                    {timeframeOptions.map(option => (
                                        <div
                                            key={option}
                                            onClick={() => setActiveTimeframeFilter(option)}
                                            className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${activeTimeframeFilter === option ? 'bg-neutral-200/70 dark:bg-neutral-700/70' : ''}`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Add New Income Button - Now links to create page */}
                            <Button asChild className="size-8 rounded-full bg-green-500 text-white text-xl font-bold shadow-md flex items-center justify-center hover:bg-green-600 transition duration-200 ml-4 p-0">
                                <Link href={route('income.create')}>+</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Income List (Scrollable Area) */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredIncome.length > 0 ? (
                            filteredIncome.map((entry) => (
                                <IncomeEntry key={entry.id} entry={entry} />
                            ))
                        ) : (
                            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                                {incomes.length === 0 ? (
                                    <div>
                                        <p>No income entries yet.</p>
                                        <Button asChild className="mt-2">
                                            <Link href={route('income.create')}>Add Your First Income</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    'No income entries found for the current filter or search criteria.'
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
