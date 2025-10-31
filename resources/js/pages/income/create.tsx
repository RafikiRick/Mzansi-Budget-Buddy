import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income',
        href: '/income',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Income Entry" />
            <div className="w-6/12 p-4">
                    <form className="space-y-4">
                        {/* Placeholder for Input 1: Amount */}
                        <div className="gap-1.5">
                            <label className="block text-sm font-medium mb-1">Amount (R)</label>
                            <input type="number" placeholder="e.g., 5000" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                        {/* Placeholder for Input 2: Source/Category */}
                        <div className="gap-1.5">
                            <label className="block text-sm font-medium mb-1">Source (e.g., Salary, Side Hustle)</label>
                            <input type="text" placeholder="Source Name" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                        {/* Placeholder for Input 3: Date */}
                        <div className="gap-1.5">
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input type="date" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <Button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
                                Save Income
                            </Button>
                        </div>
                    </form>
            </div>
        </AppLayout>
    );
}
