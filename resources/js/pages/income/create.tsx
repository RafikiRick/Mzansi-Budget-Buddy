import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import React from 'react';
import { route } from 'ziggy-js';
import { Siren } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Income',
        href: '/income',
    },
];


export default function index() {

    {/*Add Cateogory*/}

    const {data, setData, post, processing, errors } = useForm({
        amount: '',
        source: '',
        date: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('income.store'))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Income Entry" />
            <div className="w-6/12 p-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/*Display Error*/}
                        {Object.keys(errors).length > 0 && (
                            <Alert>
                                <Siren/>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    <ul>
                                        {Object.entries(errors).map(([key, message])=> (
                                            <li key={key}> {message as string}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}
                        {/* Placeholder for Input 1: Amount */}
                        <div className="gap-1.5">
                            <label className="block text-sm font-medium mb-1">Amount (R)</label>
                            <input type="number" placeholder="e.g., 5000" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" value={data.amount}  onChange={(e)=>setData('amount', e.target.value)}/>
                        </div>
                        {/* Placeholder for Input 2: Source/Category */}
                        <div className="gap-1.5">
                            <label className="block text-sm font-medium mb-1">Source (e.g., Salary, Side Hustle)</label>
                            <input type="text" placeholder="Source Name" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"  value={data.source} onChange={(e)=>setData('source', e.target.value)}/>
                        </div>
                        {/* Placeholder for Input 3: Date */}
                        <div className="gap-1.5">
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input type="date" className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700" value={data.date} onChange={(e)=>setData('date', e.target.value)}/>
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
