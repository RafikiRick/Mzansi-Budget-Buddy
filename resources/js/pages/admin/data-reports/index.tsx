import { Button } from '@/components/ui/button';
import AppLayoutAdmin from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Reports',
        href: '/admin/data-reports',
    },
];

interface Report {
    id: number;
    title: string;
    description: string;
    type: string;
    preview_route: string;
    download_route: string;
}

interface Props {
    availableReports?: Report[];
}

// Report Card Component
const ReportCard = ({ report }: { report: Report }) => {
    return (
        <div className="flex flex-col rounded-xl border border-neutral-200/60 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-neutral-700/60 dark:bg-neutral-800">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                    {report.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {report.description}
                </p>
            </div>
            <div className="mt-4 flex space-x-3">
                <Button asChild variant="outline" size="sm">
                    <Link href={route(report.preview_route)}>
                        Preview Report
                    </Link>
                </Button>
                <Button asChild size="sm">
                    <a href={route(report.download_route)} target="_blank">
                        Download PDF
                    </a>
                </Button>
            </div>
        </div>
    );
};

export default function DataReportsIndex({ availableReports = [] }: Props) { // Add default value
    const [searchQuery, setSearchQuery] = useState('');

    const filteredReports = (availableReports || []).filter(availableReports => // Add fallback here too
        availableReports.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        availableReports.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="Data Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">
                {/* Header and Search Bar */}
                <div className="flex flex-col gap-3 p-2">
                    <div className="text-xl font-extrabold text-neutral-800 dark:text-neutral-100">
                        Data Reports
                    </div>
                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                    />
                </div>

                {/* Reports Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredReports.length > 0 ? (
                        filteredReports.map((availableReports) => (
                            <ReportCard key={availableReports.id} report={availableReports} />
                        ))
                    ) : (
                        <div className="col-span-full p-6 text-center text-neutral-500 dark:text-neutral-400">
                            No reports available yet.
                        </div>
                    )}
                </div>
            </div>
        </AppLayoutAdmin>
    );
}
