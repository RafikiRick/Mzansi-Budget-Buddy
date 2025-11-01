import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';
import savings from '@/routes/savings';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Savings Goal',
        href: '/savings',
    },
];

// --- Helper to get Current Date for display ---
const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// --- GoalCard Component ---
const GoalCard = ({ goal, onCardClick }) => {
    const progress = (parseFloat(goal.saved_amount) / parseFloat(goal.target_amount)) * 100;
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

    const formatCurrency = (amount) => `R ${parseFloat(amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    const isOngoing = goal.deadline === '2099-01-01' || new Date(goal.deadline) > new Date('2099-01-01');
    const formattedDeadline = isOngoing ? 'Ongoing' : new Date(goal.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the ${name} savings goal?`)) {
            destroy(route('savings.destroy', id));
        }
    }

    return (
        <div className="group flex items-center cursor-pointer">
            {/* Goal Card Content */}
            <div
                onClick={() => onCardClick(goal)}
                className="flex-1 p-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60
                           transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/90 dark:hover:bg-neutral-800/80"
            >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{goal.name}</h3>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(goal.saved_amount)}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    <p>Due: {formattedDeadline}</p>
                    <p>of {formatCurrency(goal.target_amount)}</p>
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

            {/* Edit/Delete Buttons */}
            <div className="flex space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ml-2">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 overflow-hidden p-0 transition-all duration-200 hover:w-16"
                >
                    <Link href={route('savings.edit', goal.id)}>
                        <span className="whitespace-nowrap">Edit</span>
                    </Link>
                </Button>
                <Button
                    disabled={processing}
                    variant="destructive"
                    size="sm"
                    className="h-8 w-8 overflow-hidden p-0 transition-all duration-200 hover:w-16"
                    onClick={() => handleDelete(goal.id, goal.name)}
                >
                    <span className="whitespace-nowrap">Delete</span>
                </Button>
            </div>
        </div>
    );
};

interface SavingsGoal {
    id: number;
    name: string;
    target_amount: string;
    saved_amount: string;
    deadline: string;
    status: string;
    description?: string;
    created_at: string;
}

interface PageProps {
    flash?: {
        success?: string;
    };
    savings: SavingsGoal[];
}

export default function SavingsGoalIndex({ savings }: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Deadline');
    const { flash } = usePage<PageProps>().props;

    const currentDate = useMemo(() => getCurrentDate(), []);

    // ⭐️ Sorting Logic ⭐️
    const sortGoals = (goals, criteria) => {
        const mutableGoals = [...goals];
        if (criteria === 'Deadline') {
            return mutableGoals.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        }
        if (criteria === 'Progress') {
            return mutableGoals.sort((a, b) =>
                (parseFloat(b.saved_amount) / parseFloat(b.target_amount)) -
                (parseFloat(a.saved_amount) / parseFloat(a.target_amount))
            );
        }
        if (criteria === 'Target Amount') {
            return mutableGoals.sort((a, b) => parseFloat(b.target_amount) - parseFloat(a.target_amount));
        }
        return goals;
    };

    // ⭐️ Filtering and Sorting Memo ⭐️
    const filteredAndSortedGoals = useMemo(() => {
        const filtered = savings.filter(goal =>
            goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ( goal.status && goal.status.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        return sortGoals(filtered, sortBy);
    }, [savings, sortBy, searchQuery]);

    const handleGoalCardClick = (goal) => {
        // For now, we'll just navigate to a future edit page
        // You can implement edit functionality later
        console.log('Edit goal:', goal);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Savings Goals" />

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

            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4 md:p-6">

                {/* --- 1. Header, Date, and Search Bar --- */}
                <div className="flex flex-col gap-3 p-2">
                    {/* Current Date Display */}
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
                <div className="flex justify-between items-center sticky top-0  backdrop-blur-sm py-2 z-10 border-b border-neutral-200/50 dark:border-neutral-700/50 -mx-4 px-4">

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

                    {/* Add Goal Button - Now links to create page */}
                    <Button asChild className="size-10 rounded-full bg-blue-500 text-white text-2xl font-bold shadow-lg flex items-center justify-center hover:bg-blue-600 transition duration-200 p-0">
                        <Link href={route('savings.create')}>+</Link>
                    </Button>
                </div>

                {/* --- 3. Savings Goals List --- */}
                <div className="flex flex-col space-y-4">
                    {filteredAndSortedGoals.length > 0 ? (
                        filteredAndSortedGoals.map((goal) => (
                            <GoalCard key={goal.id} goal={goal} onCardClick={handleGoalCardClick} />
                        ))
                    ) : (
                        <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                            {savings.length === 0 ? (
                                <div>
                                    <p>No savings goals yet.</p>
                                    <Button asChild className="mt-2">
                                        <Link href={route('savings.create')}>Create Your First Goal</Link>
                                    </Button>
                                </div>
                            ) : (
                                'No savings goals match your filter or search criteria.'
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
