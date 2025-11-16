import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { route } from 'ziggy-js';
import { usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Megaphone } from 'lucide-react';

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

const sourceOptions = [
    'All',
    'Salary',
    'Side Hustle',
    'Rental Income',
    'Investment',
];
const timeframeOptions = [
    'This Month',
    'Last Month',
    'Last 3 Months',
    'This Year',
];



// Component for a single income entry
const IncomeEntry = ({ entry, onEdit, }) => {
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const {processing, delete: destroy} = useForm();
    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete the ${title} income?`)) {
            destroy(route('income.destroy', id));
        }
    }

    return (
        <div className="group flex cursor-pointer items-center justify-between border-b border-neutral-200/60 p-4 transition duration-200 last:border-b-0 hover:bg-neutral-100/50 dark:border-neutral-700/60 dark:hover:bg-neutral-800">
            <div className="flex flex-1 items-start space-x-3">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                        {entry.title}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(entry.date)} | {entry.source}
                    </p>
                </div>
            </div>
            <p className="mx-4 text-sm font-bold text-green-600 dark:text-green-400">
                + R{' '}
                {parseFloat(entry.amount).toLocaleString('en-ZA', {
                    minimumFractionDigits: 2,
                })}
            </p>
            <div className="flex space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 overflow-hidden p-0 transition-all duration-200 hover:w-16"
                >
                    <Link href={route('income.edit', entry.id)}>
                        <span className="whitespace-nowrap">Edit</span>
                    </Link>
                </Button>
                <Button
                    disabled={processing}
                    variant="destructive"
                    size="sm"
                    className="h-8 w-8 overflow-hidden p-0 transition-all duration-200 hover:w-16"
                    onClick={() => {
                        handleDelete(entry.id, entry.title);
                    }}
                >
                        <span className="whitespace-nowrap">Delete</span>
                </Button>
            </div>
        </div>
    );
};

{
    /*Interface to Confirm with TypeScript*/
}
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
    flash?: {
        success?: string;
        message?: string;
    }
}


{/*Handle Delete*/}



export default function IncomeIndex({ incomes }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSourceFilter, setActiveSourceFilter] = useState('All');
    const [activeTimeframeFilter, setActiveTimeframeFilter] =
        useState('This Month');
    const { flash } = usePage().props;
    const successMessage = flash?.success || flash?.message;
    const currentMonthYear = useMemo(() => getCurrentMonthYear(), []);

    // --- Filtering Logic with Real Data ---
    const filteredIncome = useMemo(() => {
        return incomes
            .filter(
                (entry) =>
                    activeSourceFilter === 'All' ||
                    entry.source === activeSourceFilter,
            )
            .filter(
                (entry) =>
                    entry.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    entry.source
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
            );
    }, [incomes, activeSourceFilter, searchQuery]);

    const totalIncome = useMemo(
        () =>
            filteredIncome.reduce(
                (sum, entry) => sum + parseFloat(entry.amount),
                0,
            ),
        [filteredIncome],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Income" />

            {/* Success Alert Section*/}
            {successMessage && (
                <div className="m-4">
                    <Alert className="bg-green-50 border-green-200">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            {successMessage}
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">
                {/* --- 1. Header and Search Bar --- */}
                <div className="flex flex-col gap-3 p-2">
                    <div className="text-xl font-extrabold text-neutral-800 dark:text-neutral-100">
                        Income History:{' '}
                        <span className="text-green-600 dark:text-green-400">
                            {currentMonthYear}
                        </span>
                    </div>

                    <input
                        type="text"
                        placeholder="Search income (e.g., Salary, Project title)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-green-500 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-800"
                    />
                </div>

                {/* --- 2. Top Summary Card --- */}
                <div
                    className="flex cursor-pointer flex-col items-center rounded-xl border border-neutral-200/60 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl dark:border-neutral-700/60 dark:bg-neutral-900">
                    <div
                        className="flex w-full items-center justify-between rounded-lg bg-green-50 p-4 transition-colors dark:bg-green-950/30">
                        <div>
                            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                                Total Income ({activeTimeframeFilter})
                            </p>
                            <p className="mt-1 text-3xl font-extrabold text-green-700 transition-transform hover:scale-105 dark:text-green-400">
                                R{' '}
                                {totalIncome.toLocaleString('en-ZA', {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- 3. Income History and Filters --- */}
                {/*Could we consider a change here to make each item transition instead of the whole block*/}
                <div
                    className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-lg transition-all duration-300 hover:scale-[1.005] hover:shadow-2xl dark:border-neutral-700/60 dark:bg-neutral-900">
                    {/* Filters and Header */}
                    <div
                        className="flex items-center justify-between border-b border-neutral-200/60 p-4 dark:border-neutral-700/60">
                        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
                            Transactions
                        </h3>
                        <div className="flex items-center space-x-2 text-sm">
                            {/* Source Filter Dropdown */}
                            <div className="group relative">
                                <button
                                    className="flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600">
                                    Source: {activeSourceFilter}{' '}
                                    <span className="ml-1">▼</span>
                                </button>
                                <div
                                    className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-neutral-200/60 bg-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-800">
                                    {sourceOptions.map((option) => (
                                        <div
                                            key={option}
                                            onClick={() =>
                                                setActiveSourceFilter(option)
                                            }
                                            className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 ${activeSourceFilter === option ? 'bg-neutral-200/70 dark:bg-neutral-700/70' : ''}`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Timeframe Filter Dropdown */}
                            <div className="group relative">
                                <button
                                    className="flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600">
                                    Timeframe: {activeTimeframeFilter}{' '}
                                    <span className="ml-1">▼</span>
                                </button>
                                <div
                                    className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-neutral-200/60 bg-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-800">
                                    {timeframeOptions.map((option) => (
                                        <div
                                            key={option}
                                            onClick={() =>
                                                setActiveTimeframeFilter(option)
                                            }
                                            className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 ${activeTimeframeFilter === option ? 'bg-neutral-200/70 dark:bg-neutral-700/70' : ''}`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Add New Income Button - Now links to create page */}
                            <Button
                                asChild
                                className="ml-4 flex size-8 items-center justify-center rounded-full bg-green-500 p-0 text-xl font-bold text-white shadow-md transition duration-200 hover:bg-green-600"
                            >
                                <Link href={route('income.create')}>+</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Income List (Scrollable Area) */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredIncome.length > 0 ? (
                            filteredIncome.map((entry) => (
                                <IncomeEntry
                                    key={entry.id}
                                    entry={entry}
                                    onEdit={(entry) => console.log('Edit:', entry)} onDelete={undefined} />
                            ))
                        ) : (
                            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                                {incomes.length === 0 ? (
                                    <div>
                                        <p>No income entries yet.</p>
                                        <Button asChild className="mt-2">
                                            <Link href={route('income.create')}>
                                                Add Your First Income
                                            </Link>
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
