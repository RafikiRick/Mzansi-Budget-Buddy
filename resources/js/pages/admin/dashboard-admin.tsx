
import AppLayoutAdmin from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin-dashboard',
    },
];

// --- Main Dashboard Component ---
export default function DashboardAdmin( ) {
    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            {/* Your admin dashboard content */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-semibold">Welcome to Admin Panel</h3>
                    <p className="mt-2 text-gray-600">
                        This is your administrative dashboard where you can manage the system.
                    </p>
                </div>

                {/* Add more admin dashboard widgets/components here */}
            </div>
        </AppLayoutAdmin>
    );
}
