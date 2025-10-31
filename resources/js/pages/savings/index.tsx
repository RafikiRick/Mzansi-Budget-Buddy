import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState, useMemo, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Savings Goal',
        href: '/savings-goal',
    },
];

// --- Initial Placeholder Data ---
const initialSavingsGoals = [
    {
        id: 1,
        name: 'December Trip',
        targetAmount: 2000,
        savedAmount: 1500,
        deadline: '2024-12-01', // ISO format for easy sorting
        status: 'On Track',
    },
    {
        id: 2,
        name: 'New Laptop',
        targetAmount: 4500,
        savedAmount: 1000,
        deadline: '2025-08-15',
        status: 'Needs Attention',
    },
    {
        id: 3,
        name: 'Emergency Fund',
        targetAmount: 10000,
        savedAmount: 10000,
        deadline: '2099-01-01', // Set a distant date for 'Ongoing/Completed'
        status: 'Completed',
    },
];

// --- Helper to get Current Date for display ---
const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// --- GoalCard Component (Modernized) ---
const GoalCard = ({ goal, onCardClick }) => {
    const progress = (goal.savedAmount / goal.targetAmount) * 100;
    const progressText = progress.toFixed(0) + '%';
    
    let statusColorClass = 'text-green-600 dark:text-green-400';
    let progressBarColor = 'bg-green-500';

    if (goal.status === 'Needs Attention') {
        statusColorClass = 'text-yellow-600 dark:text-yellow-400';
        progressBarColor = 'bg-yellow-500';
    } else if (goal.status === 'Completed') {
        statusColorClass = 'text-blue-600 dark:text-blue-400';
        progressBarColor = 'bg-blue-500';
    }

    const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    const formattedDeadline = goal.deadline === '2099-01-01' ? 'Ongoing' : new Date(goal.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div 
            onClick={() => onCardClick(goal)} // This triggers the edit modal
            className="p-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 cursor-pointer 
                       transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/90 dark:hover:bg-neutral-800/80"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{goal.name}</h3>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(goal.savedAmount)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                <p>Due: {formattedDeadline}</p>
                <p>of {formatCurrency(goal.targetAmount)}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-700/50 rounded-full h-2.5 mb-2 overflow-hidden">
                <div 
                    className={`${progressBarColor} h-full rounded-full transition-all duration-500`} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <p className={`font-semibold ${statusColorClass}`}>{goal.status}</p>
                <p className="font-bold text-neutral-800 dark:text-neutral-200">{progressText}</p>
            </div>
        </div>
    );
};

// --- Goal Form Modal (Reusable for Add and Edit) ---
const GoalFormModal = ({ isOpen, onClose, onSave, editingGoal }) => {
    // Initialize state with editingGoal data or defaults for adding
    const [name, setName] = useState(editingGoal ? editingGoal.name : '');
    const [targetAmount, setTargetAmount] = useState(editingGoal ? String(editingGoal.targetAmount) : '');
    const [savedAmount, setSavedAmount] = useState(editingGoal ? String(editingGoal.savedAmount) : '0');
    const [deadline, setDeadline] = useState(editingGoal ? editingGoal.deadline : new Date().toISOString().substring(0, 10));

    // Effect to reset state when a different goal is selected for editing
    useEffect(() => {
        if (editingGoal) {
            setName(editingGoal.name);
            setTargetAmount(String(editingGoal.targetAmount));
            setSavedAmount(String(editingGoal.savedAmount));
            setDeadline(editingGoal.deadline);
        } else {
            // Reset to defaults for 'Add' mode
            setName('');
            setTargetAmount('');
            setSavedAmount('0');
            setDeadline(new Date().toISOString().substring(0, 10));
        }
    }, [editingGoal]);


    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !targetAmount) return;

        const target = parseFloat(targetAmount);
        const saved = parseFloat(savedAmount);

        // Simple status calculation for demonstration
        let status = 'Needs Attention';
        if (saved >= target) {
            status = 'Completed';
        } else if (saved / target >= 0.75) {
            status = 'On Track';
        }


        const goalData = {
            id: editingGoal ? editingGoal.id : Date.now(),
            name,
            targetAmount: target,
            savedAmount: saved,
            deadline,
            status,
        };

        onSave(goalData, !!editingGoal); // Pass a flag indicating if it was an edit
        onClose();
    };

    const modalTitle = editingGoal ? `Edit Goal: ${editingGoal.name}` : 'Add New Savings Goal';
    const submitText = editingGoal ? 'Save Changes' : 'Create Goal';

    return (
        // Blurred Backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-xl p-6 w-11/12 max-w-lg shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50 transform scale-100 transition-transform duration-300 ease-out">
                <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b pb-2 border-neutral-200 dark:border-neutral-700">
                    {modalTitle}
                </h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Input 1: Goal Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Goal Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g., New Car" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-900/70 dark:border-neutral-700 focus:ring-blue-500 focus:border-blue-500 transition" 
                            required
                        />
                    </div>
                    
                    {/* Input 2: Target Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Target Amount (R)</label>
                        <input 
                            type="number" 
                            placeholder="e.g., 50000" 
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-900/70 dark:border-neutral-700 focus:ring-blue-500 focus:border-blue-500 transition" 
                            required
                        />
                    </div>

                    {/* Input 3: Saved Amount (Visible in Edit mode) */}
                    {editingGoal && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Amount Saved (R)</label>
                            <input 
                                type="number" 
                                placeholder="e.g., 5000" 
                                value={savedAmount}
                                onChange={(e) => setSavedAmount(e.target.value)}
                                className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-900/70 dark:border-neutral-700 focus:ring-blue-500 focus:border-blue-500 transition" 
                                required
                            />
                        </div>
                    )}
                    
                    {/* Input 4: Target Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Target Date</label>
                        <input 
                            type="date" 
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-900/70 dark:border-neutral-700 focus:ring-blue-500 focus:border-blue-500 transition" 
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 shadow-md transition">
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function SavingsGoalIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null); // New state to hold the goal being edited
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Deadline'); 
    const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoals); 

    const currentDate = useMemo(() => getCurrentDate(), []);

    const handleSaveGoal = (goalData, isEditing) => {
        setSavingsGoals(prevGoals => {
            if (isEditing) {
                // Find and replace the edited goal
                return prevGoals.map(goal => 
                    goal.id === goalData.id ? goalData : goal
                );
            } else {
                // Add new goal
                return [...prevGoals, goalData];
            }
        });
        setEditingGoal(null); // Clear editing state
    };

    const handleGoalCardClick = (goal) => {
        // Set the goal data to the editing state and open the modal
        setEditingGoal(goal);
        setIsModalOpen(true);
    };
    
    // Function to close modal and clear editing state
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingGoal(null);
    }

    // ⭐️ Sorting Logic ⭐️
    const sortGoals = (goals, criteria) => {
        const mutableGoals = [...goals];
        if (criteria === 'Deadline') {
            return mutableGoals.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        }
        if (criteria === 'Progress') {
            return mutableGoals.sort((a, b) => (b.savedAmount / b.targetAmount) - (a.savedAmount / a.targetAmount));
        }
        if (criteria === 'Target Amount') {
            return mutableGoals.sort((a, b) => b.targetAmount - a.targetAmount);
        }
        return goals;
    };
    
    // ⭐️ Filtering and Sorting Memo ⭐️
    const filteredAndSortedGoals = useMemo(() => {
        const filtered = savingsGoals.filter(goal => 
            goal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            goal.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return sortGoals(filtered, sortBy);
    }, [savingsGoals, sortBy, searchQuery]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Savings Goals" />
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4 md:p-6">
                
                {/* --- 1. Header, Date, and Search Bar --- */}
                <div className="flex flex-col gap-3 p-2">
                    {/* Current Date Display (Calendar Feature) */}
                    <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Today is: {currentDate}
                    </div>
                    
                    {/* Permanent Search Input */}
                    <input 
                        type="text"
                        placeholder="Search goals (e.g., Trip, Laptop)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 border border-neutral-300 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>

                {/* --- 2. Sort/Filter and Add Goal FAB --- */}
                <div className="flex justify-between items-center sticky top-0 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-sm py-2 z-10 border-b border-neutral-200/50 dark:border-neutral-700/50 -mx-4 px-4">
                    
                    {/* Sort Dropdown */}
                    <div className="relative group">
                        <button 
                            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition"
                        >
                            Sort by: {sortBy}<span className="ml-1">▼</span>
                        </button>
                        {/* Dropdown Menu */}
                        <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 border border-neutral-200/60 dark:border-neutral-700">
                            {['Deadline', 'Progress', 'Target Amount'].map(option => (
                                <div 
                                    key={option} 
                                    onClick={() => setSortBy(option)} 
                                    className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${sortBy === option ? 'bg-neutral-200/70 dark:bg-neutral-700/70' : ''}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Goal Button (FAB style) */}
                    <button 
                        onClick={() => {
                            setEditingGoal(null); // Ensure modal is in 'Add' mode
                            setIsModalOpen(true);
                        }}
                        className="size-10 rounded-full bg-blue-500 text-white text-2xl font-bold shadow-lg flex items-center justify-center hover:bg-blue-600 transition duration-200"
                        style={{ lineHeight: '0' }}
                        aria-label="Add New Savings Goal"
                    >
                        +
                    </button>
                </div>

                {/* --- 3. Savings Goals List --- */}
                <div className="flex flex-col space-y-4">
                    {filteredAndSortedGoals.length > 0 ? (
                        filteredAndSortedGoals.map((goal) => (
                            <GoalCard key={goal.id} goal={goal} onCardClick={handleGoalCardClick} />
                        ))
                    ) : (
                        <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                            No savings goals match your filter or search criteria.
                        </div>
                    )}
                </div>
            </div>
            
            {/* The Goal Form Modal Component (Handles both Add and Edit) */}
            <GoalFormModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} // Use the new handler to clear editing state
                onSave={handleSaveGoal}
                editingGoal={editingGoal} // Pass the goal object if we are editing
            />
        </AppLayout>
    );
}