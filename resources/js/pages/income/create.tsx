import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Siren } from 'lucide-react';
import React from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income',
        href: '/income',
    },
    {
        title: 'Add Income',
        href: '/income/create',
    },
];

const sourceOptions = ['Salary', 'Side Hustle', 'Rental Income', 'Investment'];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        title: '',
        source: 'Salary',
        date: new Date().toISOString().substring(0, 10),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('income.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Income Entry" />
            <div className="container mx-auto max-w-2xl p-6">
                {/* Header matching modal style */}
                <div className="mb-6 border-b border-neutral-200 pb-2 dark:border-neutral-700">
                    <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                        Add New Income
                    </h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Display Errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <Siren className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Amount Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Amount (R)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 15000"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-green-500 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            required
                        />
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Description / Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Monthly Salary Deposit"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-green-500 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                    </div>

                    {/* Source Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Source Category
                        </label>
                        <select
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-green-500 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.source}
                            onChange={(e) => setData('source', e.target.value)}
                            required
                        >
                            {sourceOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Date
                        </label>
                        <input
                            type="date"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-green-500 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="rounded-lg px-5 py-2 text-sm font-semibold transition"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-green-600 hover:shadow-lg"
                        >
                            {processing ? 'Saving...' : 'Save Income'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
