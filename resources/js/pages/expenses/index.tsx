import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: '/expenses',
    },
];

// --- Placeholder Data ---
const expenseData = {
    totalExpenses: 'R 8,500.00', // Total Expenses (This Month)
    expenseHistory: [
        {
            title: 'Weekly groceries',
            date: 'Wed 10 Oct',
            amount: 'R 850.00',
            category: 'Groceries',
            icon: '🛒',
        },
        {
            title: 'Toll to work',
            date: 'Tue 9 Oct',
            amount: 'R 35.80',
            category: 'Transport',
            icon: '🚗',
        },
        {
            title: 'Snacks',
            date: 'Tue 9 Oct',
            amount: 'R 42.00',
            category: 'Food',
            icon: '🍟',
        },
        {
            title: 'Monthly airtime',
            date: 'Sun 7 Oct',
            amount: 'R 120.00',
            category: 'Bills',
            icon: '📱',
        },
        {
            title: 'Eskom bill',
            date: 'Sat 6 Oct',
            amount: 'R 1,200.00',
            category: 'Utilities',
            icon: '💡',
        },
        {
            title: 'Data for the month',
            date: 'Sat 6 Oct',
            amount: 'R 99.00',
            category: 'Bills',
            icon: '📶',
        },
    ],
};

// Component for a single expense entry in the list
const ExpenseEntry = ({ entry }) => (
    <div className="flex items-center justify-between p-4 border-b border-sidebar-border/70 dark:border-sidebar-border last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition duration-150 cursor-pointer">
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 size-10 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 flex items-center justify-center">
                {entry.icon}
            </div>
            <div>
                <p className="font-semibold text-sm">{entry.title}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{entry.date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-red-600 dark:text-red-400 text-sm">
                - {entry.amount}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{entry.category}</p>
        </div>
    </div>
);

// --- New Component: Placeholder Modal for Adding Expense ---
const AddExpenseModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-11/12 max-w-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Add New Expense</h2>
                
                <form className="space-y-4">
                    {/* Placeholder for Input 1: Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount (R)</label>
                        <input type="number" placeholder="e.g., 500" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    {/* Placeholder for Input 2: Category */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Category (e.g., Groceries, Rent)</label>
                        <input type="text" placeholder="Category Name" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    {/* Placeholder for Input 3: Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input type="text" placeholder="e.g., Weekly supermarket run" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    {/* Placeholder for Input 4: Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input type="date" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                            Save Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function ExpensesIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All'); 
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // ⭐️ Backend/Data Logic: This would trigger a live search/filter function ⭐️
        console.log(`Searching for: ${e.target.value}`);
    };
    
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        // ⭐️ Backend/Data Logic: This would trigger a data fetch/filter function ⭐️
        console.log(`Filtering by category: ${filter}`);
    };

    const categories = ['All', 'Groceries', 'Transport', 'Food', 'Bills', 'Utilities'];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />
            <div className="relative flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">
                
                {/* --- Floating Action Button (FAB) for Adding Expense --- */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    // Fixed position in the top right corner
                    className="fixed right-6 top-24 z-30 size-12 rounded-full bg-red-500 text-white text-3xl font-bold shadow-xl flex items-center justify-center hover:bg-red-600 transition"
                    style={{ lineHeight: '0' }} // Adjust for vertical centering of '+'
                >
                    +
                </button>


                {/* --- 1. Header: Search and Timeframe --- */}
                <div className="flex items-center justify-between p-2">
                    {/* Left: Month/Timeframe Title */}
                    <div className="text-lg font-bold">
                        This Month: **October 2023** </div>
                    {/* Right: Search Icon (Button) */}
                    <button 
                        onClick={() => console.log('Toggling search field')} // Placeholder to show interactivity
                        className="text-2xl text-neutral-600 dark:text-neutral-400 hover:text-red-500 transition"
                    >
                        🔍
                    </button>
                </div>
                
                {/* Search Input (Hidden by default, can be toggled via state) */}
                {searchQuery && (
                    <input 
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="p-2 mb-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700"
                    />
                )}

                {/* --- 2. Category Filter Buttons --- */}
                <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleFilterClick(category)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition duration-150 ${
                                activeFilter === category
                                    ? 'bg-red-500 text-white shadow-md'
                                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-red-100 dark:hover:bg-red-900/50'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* --- 3. Expense History List --- */}
                {/* We removed the bottom-bar height offset, so we don't need the mb-16 anymore */}
                <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden"> 
                    <div className="flex-1 overflow-y-auto">
                        {expenseData.expenseHistory.map((entry, index) => (
                            <ExpenseEntry key={index} entry={entry} />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* The Add Expense Modal Component */}
            <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </AppLayout>
    );
}