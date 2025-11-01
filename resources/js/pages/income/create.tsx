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

export default function Index() {
    {
        /*Add Cateogory*/
    }

    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        source: '',
        date: new Date().toISOString().split('T')[0], //Default Today Date
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('income.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Income Entry" />
            <div className="w-6/12 p-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/*Display Error*/}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <Siren className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(
                                        ([key, message]) => (
                                            <li key={key}>
                                                {' '}
                                                {message as string}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    {/* Amount Input*/}
                    <div className="gap-1.5">
                        <label className="mb-1 block text-sm font-medium">
                            Amount (R)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 5000"
                            className="w-full rounded-lg border p-2 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                    </div>
                    {/* Source Input */}
                    <div className="gap-1.5">
                        <label className="mb-1 block text-sm font-medium">
                            Source (e.g., Salary, Side Hustle)
                        </label>
                        <input
                            type="text"
                            placeholder="Source Name"
                            className="w-full rounded-lg border p-2 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.source}
                            onChange={(e) => setData('source', e.target.value)}
                        />
                    </div>
                    {/* Date Input */}
                    <div className="gap-1.5">
                        <label className="mb-1 block text-sm font-medium">
                            Date
                        </label>
                        <input
                            type="date"
                            className="w-full rounded-lg border p-2 dark:border-neutral-700 dark:bg-neutral-800"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                            {processing ? 'Saving...' : 'Save Income'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
