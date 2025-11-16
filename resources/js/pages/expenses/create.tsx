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
        title: 'Expenses',
        href: '/expenses',
    },
    {
        title: 'Add Expense',
        href: '/expenses/create',
    },
];

const categories = ['Groceries', 'Transport', 'Food', 'Bills', 'Utilities'];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        title: '',
        category: 'Groceries',
        date: new Date().toISOString().substring(0, 10),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('expenses.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Expense" />
            <div className="container mx-auto max-w-2xl p-6">
                <div className="mb-6 border-b border-neutral-200 pb-2 dark:border-neutral-700">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                        Add New Expense
                    </h2>
                </div>
                {/* Display Errors */}
                {Object.keys(errors).length > 0 && (
                    <Alert className="bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">
                        <Siren className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription className="text-red-700 dark:text-red-300">
                            <ul>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Amount Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Amount (R)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 500"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-red-500 focus:ring-red-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            required
                        />
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Description
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Weekly supermarket run"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-red-500 focus:ring-red-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                    </div>

                    {/* Category Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Category
                        </label>
                        <select
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-red-500 focus:ring-red-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            required
                        >
                            {categories.map((option) => (
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
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-red-500 focus:ring-red-500 dark:border-neutral-700 dark:bg-neutral-800"
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
                            className="rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 hover:shadow-lg"
                        >
                            {processing ? 'Saving...' : 'Save Expense'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
