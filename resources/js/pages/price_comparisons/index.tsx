
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Price Comparison',
        href: '/price_comparisons',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Income" />
            <div className="m-4">
                Hello Price Comparison!
            </div>
        </AppLayout>
    );
}
