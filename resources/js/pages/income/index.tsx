import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income',
        href: '/income',
    },
];
// --- Placeholder Data ---
const incomeData = {
    totalIncome: 'R 38,500.00', // Total Income (This Month)
    incomeHistory: [
        {
            title: 'Monthly Salary',
            date: '28 Jun 2024',
            amount: 'R 28,000.00',
            source: 'Salary',
            icon: '💰',
            color: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
        },
        {
            title: 'Freelance Design Project',
            date: '02 Jun 2024',
            amount: 'R 4,500.00',
            source: 'Side Hustle',
            icon: '💻',
            color: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
        },
        {
            title: 'Rental Income - Unit 3B',
            date: '01 Jun 2024',
            amount: 'R 6,000.00',
            source: 'Rental Income',
            icon: '🏠',
            color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        },
        {
            title: 'Monthly Salary',
            date: '28 May 2024',
            amount: 'R 27,500.00',
            source: 'Salary',
            icon: '💰',
            color: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
        },
    ],
};

// Component for a single income entry in the list
const IncomeEntry = ({ entry }) => (
    <div className="flex items-center justify-between p-4 border-b border-sidebar-border/70 dark:border-sidebar-border last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition duration-150 cursor-pointer">
        <div className="flex items-start space-x-3">
            <div className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center ${entry.color}`}>
                {entry.icon}
            </div>
            <div>
                <p className="font-semibold text-sm">{entry.title}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{entry.date} | {entry.source}</p>
            </div>
        </div>
        <p className="font-bold text-green-600 dark:text-green-400 text-sm">
            + {entry.amount}
        </p>
    </div>
);

// --- New Component: Placeholder Modal for Adding Income ---
const AddIncomeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-11/12 max-w-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-4">Add New Income Entry</h2>
                
                <form className="space-y-4">
                    {/* Placeholder for Input 1: Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount (R)</label>
                        <input type="number" placeholder="e.g., 5000" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    {/* Placeholder for Input 2: Source/Category */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Source (e.g., Salary, Side Hustle)</label>
                        <input type="text" placeholder="Source Name" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    {/* Placeholder for Input 3: Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input type="date" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
                            Save Income
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function IncomeIndex() {
    // State to manage the visibility of the Add Income Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Placeholder state for active filters
    const [activeSourceFilter, setActiveSourceFilter] = useState('All');
    const [activeTimeframeFilter, setActiveTimeframeFilter] = useState('This Month');

    const handleAddIncomeClick = () => {
        setIsModalOpen(true);
    };

    const handleSourceFilterClick = (source) => {
        // ⭐️ Backend/Data Logic: This would trigger a data fetch/filter function ⭐️
        setActiveSourceFilter(source);
        // For now, we just log the change
        console.log(`Filtering by source: ${source}`);
    };

    const handleTimeframeFilterClick = (timeframe) => {
        // ⭐️ Backend/Data Logic: This would trigger a data fetch/filter function ⭐️
        setActiveTimeframeFilter(timeframe);
        // For now, we just log the change
        console.log(`Filtering by timeframe: ${timeframe}`);
    };
    
    // Placeholder for a list of filter options
    const sourceOptions = ['All', 'Salary', 'Side Hustle', 'Rental Income'];
    const timeframeOptions = ['This Month', 'Last Month', 'Last 3 Months', 'This Year'];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Income" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                {/* --- 1. Top Summary Card (Total Income) --- */}
                <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-sidebar-border/70 dark:border-sidebar-border">
                    <h2 className="text-xl font-bold mb-4">Income Management</h2>
                    <div className="w-full p-4 bg-green-50 dark:bg-green-950 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Total Income ({activeTimeframeFilter})</p>
                            <p className="text-2xl font-extrabold text-green-700 dark:text-green-400 mt-1">{incomeData.totalIncome}</p>
                        </div>
                        <span className="text-3xl">💵</span> {/* Icon placeholder */}
                    </div>
                </div>

                {/* --- 2. Income History and Filters --- */}
                <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden">
                    
                    {/* Filters and Header */}
                    <div className="flex justify-between items-center p-4 border-b border-sidebar-border/70 dark:border-sidebar-border">
                        <h3 className="font-bold text-lg">Income History</h3>
                        <div className="flex space-x-2 text-sm">
                            
                            {/* Source Filter Button (Clickable) */}
                            <div className="relative group">
                                <button 
                                    onClick={() => console.log('Toggling source filter dropdown')} // Placeholder action
                                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs font-medium"
                                >
                                    Source: **{activeSourceFilter}** 🔽
                                </button>
                                {/* Placeholder Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-lg hidden group-hover:block z-10 border border-sidebar-border/70 dark:border-sidebar-border">
                                    {sourceOptions.map(option => (
                                        <div key={option} onClick={() => handleSourceFilterClick(option)} className="cursor-pointer px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Timeframe Filter Button (Clickable) */}
                            <div className="relative group">
                                <button 
                                    onClick={() => console.log('Toggling timeframe filter dropdown')} // Placeholder action
                                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs font-medium"
                                >
                                    Timeframe: **{activeTimeframeFilter}** 🔽
                                </button>
                                {/* Placeholder Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-lg hidden group-hover:block z-10 border border-sidebar-border/70 dark:border-sidebar-border">
                                    {timeframeOptions.map(option => (
                                        <div key={option} onClick={() => handleTimeframeFilterClick(option)} className="cursor-pointer px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Income List (Scrollable Area) */}
                    <div className="flex-1 overflow-y-auto">
                        {incomeData.incomeHistory.map((entry, index) => (
                            <IncomeEntry key={index} entry={entry} />
                        ))}
                    </div>

                    {/* Add New Income Button (Clickable) */}
                    <div className="p-4 border-t border-sidebar-border/70 dark:border-sidebar-border">
                        <button 
                            onClick={handleAddIncomeClick}
                            className="w-full py-3 bg-yellow-500 text-neutral-900 font-bold rounded-lg shadow hover:bg-yellow-600 transition duration-150 flex items-center justify-center space-x-2"
                        >
                            <span>➕</span> 
                            <span>Add New Income</span>
                        </button>
                    </div>
            </div>
            
            {/* The Modal Component */}
            <AddIncomeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </AppLayout>
    );
}