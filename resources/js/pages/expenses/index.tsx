import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: '/expenses',
    },
];

// --- Placeholder Data ---
const initialExpenseHistory = [
    {
        id: 1,
        title: 'Weekly groceries',
        date: 'Wed 10 Oct',
        amount: 850.00,
        category: 'Groceries',
    },
    {
        id: 2,
        title: 'Toll to work',
        date: 'Tue 9 Oct',
        amount: 35.80,
        category: 'Transport',
    },
    {
        id: 3,
        title: 'Snacks',
        date: 'Tue 9 Oct',
        amount: 42.00,
        category: 'Food',
    },
    {
        id: 4,
        title: 'Monthly airtime',
        date: 'Sun 7 Oct',
        amount: 120.00,
        category: 'Bills',
    },
    {
        id: 5,
        title: 'Eskom bill',
        date: 'Sat 6 Oct',
        amount: 1200.00,
        category: 'Utilities',
    },
    {
        id: 6,
        title: 'Data for the month',
        date: 'Sat 6 Oct',
        amount: 99.00,
        category: 'Bills',
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
const ExpenseEntry = ({ entry }) => (
    <div className="flex items-center justify-between p-4 border-b border-neutral-200/60 dark:border-neutral-700/60 last:border-b-0 hover:bg-neutral-100/50 dark:hover:bg-neutral-800 transition duration-200 cursor-pointer">
        <div className="flex items-start space-x-3">
            <div>
                <p className="font-medium text-sm text-neutral-800 dark:text-neutral-100">{entry.title}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{entry.date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-red-600 dark:text-red-400 text-sm">
                - R {entry.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full mt-1">
                {entry.category}
            </p>
        </div>
    </div>
);

// --- Add Expense Modal (with blurred backdrop) ---
const AddExpenseModal = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Groceries');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title || !amount || !category) return;

        const newExpense = {
            id: Date.now(), 
            title,
            amount: parseFloat(amount),
            category,
            // Format date for display consistency
            date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }),
        };

        onSave(newExpense);
        onClose();
        // Reset form for next entry
        setTitle('');
        setAmount('');
        setCategory('Groceries');
        setDate(new Date().toISOString().substring(0, 10));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-11/12 max-w-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 transform scale-100 transition-transform duration-300 ease-out">
                <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400 border-b pb-2 border-neutral-200 dark:border-neutral-700">Add New Expense</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Input 1: Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Amount (R)</label>
                        <input 
                            type="number" 
                            placeholder="e.g., 500" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-red-500 focus:border-red-500 transition" 
                            required
                        />
                    </div>
                    
                    {/* Input 2: Description (Title) */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Description</label>
                        <input 
                            type="text" 
                            placeholder="e.g., Weekly supermarket run" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-red-500 focus:border-red-500 transition" 
                            required
                        />
                    </div>
                    
                    {/* Input 3: Category */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Category</label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-red-500 focus:border-red-500 appearance-none transition" 
                            required
                        >
                            {categories.filter(c => c !== 'All').map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Input 4: Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Date</label>
                        <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-red-500 focus:border-red-500 transition" 
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg transition">
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
    const [expenseHistory, setExpenseHistory] = useState(initialExpenseHistory);

    // Get current date for header
    const currentMonthYear = useMemo(() => getCurrentMonthYear(), []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleSaveExpense = (newExpense) => {
        // Add new expense to the list and sort by id to simulate newest first
        setExpenseHistory(prevHistory => {
            const updatedHistory = [...prevHistory, newExpense];
            return updatedHistory.sort((a, b) => b.id - a.id);
        });
    };

    // --- Filtering Logic ---
    const filteredExpenses = expenseHistory
        .filter(entry => activeFilter === 'All' || entry.category === activeFilter)
        .filter(entry => 
            entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            entry.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Calculate Total Expense for display
    const totalExpenses = filteredExpenses.reduce((sum, entry) => sum + entry.amount, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />
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
                        onChange={handleSearch}
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
                            onClick={() => handleFilterClick(category)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition duration-150 whitespace-nowrap ${
                                activeFilter === category
                                    ? 'bg-red-500 text-white shadow-md hover:bg-red-600'
                                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                    
                    {/* --- Integrated Add Expense Button --- */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex-shrink-0 size-10 rounded-full bg-red-500 text-white text-xl font-bold shadow-md flex items-center justify-center hover:bg-red-600 transition duration-200 ml-4"
                        style={{ lineHeight: '0' }}
                        aria-label="Add New Expense"
                    >
                        +
                    </button>
                </div>

                {/* --- 3. Expense History List (With Hover Pop) --- */}
                <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden 
                            transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]"> 
                    <div className="flex-1 overflow-y-auto">
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((entry) => (
                                <ExpenseEntry key={entry.id} entry={entry} />
                            ))
                        ) : (
                            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                                No expenses found for the current filter or search criteria.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* The Add Expense Modal Component */}
            <AddExpenseModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveExpense}
            />
        </AppLayout>
    );
}