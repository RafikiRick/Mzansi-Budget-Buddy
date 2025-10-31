import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js'; // Keeping the original route import for context

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

// --- Initial Placeholder Data (Converting amount to number for dynamic updates) ---
const initialIncomeHistory = [
    {
        id: 1,
        title: 'Monthly Salary',
        date: '28 Jun 2024',
        amount: 28000.00,
        source: 'Salary',
    },
    {
        id: 2,
        title: 'Freelance Design Project',
        date: '02 Jun 2024',
        amount: 4500.00,
        source: 'Side Hustle',
    },
    {
        id: 3,
        title: 'Rental Income - Unit 3B',
        date: '01 Jun 2024',
        amount: 6000.00,
        source: 'Rental Income',
    },
    {
        id: 4,
        title: 'Monthly Salary',
        date: '28 May 2024',
        amount: 27500.00,
        source: 'Salary',
    },
];

const sourceOptions = ['All', 'Salary', 'Side Hustle', 'Rental Income', 'Investment'];
const timeframeOptions = ['This Month', 'Last Month', 'Last 3 Months', 'This Year'];


// Component for a single income entry in the list (Icons removed)
const IncomeEntry = ({ entry }) => (
    <div className="flex items-center justify-between p-4 border-b border-neutral-200/60 dark:border-neutral-700/60 last:border-b-0 hover:bg-neutral-100/50 dark:hover:bg-neutral-800 transition duration-200 cursor-pointer">
        <div className="flex items-start space-x-3">
            {/* Icons are removed for a cleaner look */}
            <div>
                <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{entry.title}</p>
                {/* Updated to display formatted amount */}
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{entry.date} | {entry.source}</p>
            </div>
        </div>
        <p className="font-bold text-green-600 dark:text-green-400 text-sm">
            + R {entry.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
        </p>
    </div>
);

// --- New Component: Add Income Modal (with blurred backdrop) ---
const AddIncomeModal = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('Salary');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title || !amount || !source) return;

        const newEntry = {
            id: Date.now(), // Unique ID
            title,
            amount: parseFloat(amount),
            source,
            date: new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        };

        onSave(newEntry);
        onClose();
    };

    return (
        // Blurred Backdrop using backdrop-blur-sm
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-11/12 max-w-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 transform scale-100 transition-transform duration-300 ease-out">
                <h2 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400 border-b pb-2 border-neutral-200 dark:border-neutral-700">Add New Income</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Input 1: Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Amount (R)</label>
                        <input 
                            type="number" 
                            placeholder="e.g., 15000" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-green-500 focus:border-green-500 transition" 
                            required
                        />
                    </div>
                    
                    {/* Input 2: Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Description / Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g., Monthly Salary Deposit" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-green-500 focus:border-green-500 transition" 
                            required
                        />
                    </div>
                    
                    {/* Input 3: Source */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Source Category</label>
                        <select 
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-green-500 focus:border-green-500 appearance-none transition" 
                            required
                        >
                            {sourceOptions.filter(c => c !== 'All').map(c => (
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
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-green-500 focus:border-green-500 transition" 
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg transition">
                            Save Income
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function IncomeIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSourceFilter, setActiveSourceFilter] = useState('All');
    const [activeTimeframeFilter, setActiveTimeframeFilter] = useState('This Month');
    const [incomeHistory, setIncomeHistory] = useState(initialIncomeHistory);

    const currentMonthYear = useMemo(() => getCurrentMonthYear(), []);

    const handleSaveIncome = (newEntry) => {
        // Add new income to the list and sort by id to simulate newest first
        setIncomeHistory(prevHistory => {
            const updatedHistory = [...prevHistory, newEntry];
            return updatedHistory.sort((a, b) => b.id - a.id);
        });
    };

    // --- Filtering Logic ---
    const filteredIncome = incomeHistory
        .filter(entry => activeSourceFilter === 'All' || entry.source === activeSourceFilter)
        // Note: Timeframe filter is visual only for now, would require date comparisons in a real app
        .filter(entry => 
            entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            entry.source.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
    const totalIncome = filteredIncome.reduce((sum, entry) => sum + entry.amount, 0);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Income" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">

                {/* --- 1. Header and Search Bar (Replaced "Income Management") --- */}
                <div className="flex flex-col gap-3 p-2">
                    {/* Header Title (Using current date) */}
                    <div className="text-xl font-extrabold text-neutral-800 dark:text-neutral-100">
                        Income History: <span className="text-green-600 dark:text-green-400">{currentMonthYear}</span> 
                    </div>
                    
                    {/* Permanent Search Input (Replaces magnifying glass toggle) */}
                    <input 
                        type="text"
                        placeholder="Search income (e.g., Salary, Project title)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 border border-neutral-300 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 focus:ring-green-500 focus:border-green-500 transition"
                    />
                </div>

                {/* --- 2. Top Summary Card (Total Income) - With Hover Pop --- */}
                <div 
                    className="flex flex-col items-center p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 
                                transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer"
                >
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950/30 rounded-lg flex justify-between items-center transition-colors">
                        <div>
                            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Total Income ({activeTimeframeFilter})</p>
                            <p className="text-3xl font-extrabold text-green-700 dark:text-green-400 mt-1 transition-transform hover:scale-105">
                                R {totalIncome.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        {/* Removed cash emoji */}
                    </div>
                </div>

                {/* --- 3. Income History and Filters (Main Box) - With Hover Pop --- */}
                <div 
                    className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden 
                                transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]"
                >

                    {/* Filters and Header */}
                    <div className="flex justify-between items-center p-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                        <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">Transactions</h3>
                        <div className="flex space-x-2 text-sm items-center">
                            
                            {/* Source Filter Dropdown (Emoji removed) */}
                            <div className="relative group">
                                <button
                                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition"
                                >
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

                            {/* Timeframe Filter Dropdown (Emoji removed) */}
                            <div className="relative group">
                                <button
                                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition"
                                >
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
                            
                            {/* Add New Income Button (Replaced Create Product) */}
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="size-8 rounded-full bg-green-500 text-white text-xl font-bold shadow-md flex items-center justify-center hover:bg-green-600 transition duration-200 ml-4"
                                style={{ lineHeight: '0' }}
                                aria-label="Add New Income"
                            >
                                +
                            </button>
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
                                No income entries found for the current filter or search criteria.
                            </div>
                        )}
                    </div>
                    
                    {/* Removed the original "Create a Product" button here */}
            </div>

            {/* The Modal Component */}
            <AddIncomeModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveIncome}
            />
            </div>
        </AppLayout>
    )
;}