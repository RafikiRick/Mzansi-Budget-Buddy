import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Savings Goal',
        href: '/savings-goal',
    },
];

// --- Placeholder Data ---
const savingsGoals = [
    {
        id: 1,
        name: 'December Trip',
        targetAmount: 2000,
        savedAmount: 1500,
        deadline: '01 Dec 2024',
        status: 'On Track',
    },
    {
        id: 2,
        name: 'New Laptop',
        targetAmount: 4500,
        savedAmount: 1000,
        deadline: '15 Aug 2025',
        status: 'Needs Attention',
    },
    {
        id: 3,
        name: 'Emergency Fund',
        targetAmount: 10000,
        savedAmount: 10000,
        deadline: 'Ongoing',
        status: 'Completed',
    },
];

// Component to display a single Savings Goal card
const GoalCard = ({ goal, onCardClick }) => {
    const progress = (goal.savedAmount / goal.targetAmount) * 100;
    const progressText = progress.toFixed(0) + '%';
    
    let statusColor = 'text-green-600 dark:text-green-400';
    let progressBarColor = 'bg-green-500';

    if (goal.status === 'Needs Attention') {
        statusColor = 'text-yellow-600 dark:text-yellow-400';
        progressBarColor = 'bg-yellow-500';
    } else if (goal.status === 'Completed') {
        statusColor = 'text-green-600 dark:text-green-400';
        progressBarColor = 'bg-green-500';
    }

    // Format currency to South African Rand (R)
    const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA')}`;

    return (
        <div 
            onClick={() => onCardClick(goal)} // Placeholder for navigating to Edit Goal screen
            className="p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-sidebar-border/70 dark:border-sidebar-border cursor-pointer hover:shadow-lg transition duration-200"
        >
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">{goal.name}</h3>
                <span className="text-sm font-bold">{formatCurrency(goal.savedAmount)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                <p>Due: {goal.deadline}</p>
                <p>of {formatCurrency(goal.targetAmount)}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mb-2">
                <div 
                    className={`${progressBarColor} h-2.5 rounded-full`} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <p className={statusColor}>{goal.status}</p>
                <p className="font-medium">{progressText}</p>
            </div>
        </div>
    );
};

// --- New Component: Placeholder Modal for Adding Goal ---
const AddGoalModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-11/12 max-w-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Add New Savings Goal</h2>
                
                <form className="space-y-4">
                    {/* Placeholder for Input: Goal Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Goal Name</label>
                        <input type="text" placeholder="e.g., New Car" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    {/* Placeholder for Input: Target Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Target Amount (R)</label>
                        <input type="number" placeholder="e.g., 50000" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    {/* Placeholder for Input: Target Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Target Date</label>
                        <input type="date" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                            Create Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function SavingsGoalIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Deadline'); // State for sorting

    const handleGoalCardClick = (goal) => {
        // ⭐️ Frontend Logic: This would navigate to the detailed Edit Goal screen ⭐️
        console.log('Navigating to Edit Goal screen for:', goal.name);
    };
    
    // ⭐️ Backend/Data Logic: Function to sort the goals ⭐️
    const sortGoals = (goals, criteria) => {
        // Placeholder sorting logic
        if (criteria === 'Deadline') {
            return [...goals].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        }
        if (criteria === 'Progress') {
            return [...goals].sort((a, b) => (b.savedAmount / b.targetAmount) - (a.savedAmount / a.targetAmount));
        }
        return goals;
    };
    
    const sortedGoals = sortGoals(savingsGoals, sortBy);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Savings Goals" />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                
                <h2 className="text-2xl font-bold mb-2">Savings Goals</h2>

                {/* --- 1. Sort/Filter and Add Goal FAB --- */}
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-page-background dark:bg-page-background-dark py-2 z-10">
                    
                    {/* Sort Dropdown */}
                    <div className="relative group">
                        <button 
                            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm font-medium flex items-center"
                        >
                            Sort by: **{sortBy}** 🔽
                        </button>
                        {/* Placeholder Dropdown Menu */}
                        <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-lg hidden group-hover:block z-20 border border-sidebar-border/70 dark:border-sidebar-border">
                            {['Deadline', 'Progress', 'Target Amount'].map(option => (
                                <div 
                                    key={option} 
                                    onClick={() => setSortBy(option)} 
                                    className="cursor-pointer px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Goal Button (FAB style) */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="size-10 rounded-full bg-blue-500 text-white text-2xl font-bold shadow-md flex items-center justify-center hover:bg-blue-600 transition"
                        style={{ lineHeight: '0' }}
                    >
                        +
                    </button>
                </div>

                {/* --- 2. Savings Goals List --- */}
                <div className="flex flex-col space-y-4">
                    {sortedGoals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} onCardClick={handleGoalCardClick} />
                    ))}
                </div>

                {/* --- 3. Prominent Add New Goal Button (Footer) --- */}
                 <div className="p-4 mt-6">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 bg-yellow-500 text-neutral-900 font-bold rounded-lg shadow hover:bg-yellow-600 transition duration-150 flex items-center justify-center space-x-2"
                    >
                        <span>➕</span> 
                        <span>Add New Goal</span>
                    </button>
                </div>

            </div>
            
            {/* The Add Goal Modal Component */}
            <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </AppLayout>
    );
}