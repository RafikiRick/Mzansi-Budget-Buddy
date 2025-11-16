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
        title: 'Savings Goals',
        href: '/savings',
    },
    {
        title: 'Add Savings Goal',
        href: '/savings/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        target_amount: '',
        saved_amount: '0',
        deadline: new Date().toISOString().substring(0, 10),
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('savings.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Savings Goal" />
            <div className="container mx-auto max-w-2xl p-6">
                <div className="mb-6 border-b border-neutral-200 pb-2 dark:border-neutral-700">
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        Add New Savings Goal
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
                    {/* Goal Name Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Goal Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., New Car, Vacation, Emergency Fund"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>

                    {/* Target Amount Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Target Amount (R)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 50000"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.target_amount}
                            onChange={(e) => setData('target_amount', e.target.value)}
                            step="0.01"
                            min="0.01"
                            required
                        />
                    </div>

                    {/* Saved Amount Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Amount Already Saved (R)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 5000"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.saved_amount}
                            onChange={(e) => setData('saved_amount', e.target.value)}
                            step="0.01"
                            min="0"
                        />
                    </div>

                    {/* Deadline Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Target Date
                        </label>
                        <input
                            type="date"
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.deadline}
                            onChange={(e) => setData('deadline', e.target.value)}
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Description (Optional)
                        </label>
                        <textarea
                            placeholder="Describe your savings goal..."
                            rows={3}
                            className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
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
                            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 hover:shadow-lg"
                        >
                            {processing ? 'Creating...' : 'Create Goal'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
