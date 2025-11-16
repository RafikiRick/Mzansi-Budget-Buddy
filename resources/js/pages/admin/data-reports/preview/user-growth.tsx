import { Button } from '@/components/ui/button';
import AppLayoutAdmin from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Reports',
        href: '/admin/data-reports',
    },
    {
        title: 'User Growth Report Preview',
        href: '/admin/data-reports/preview/user-growth',
    },
];

interface UserGrowthData {
    month: string;
    count: number;
}

interface Props {
    userGrowth: UserGrowthData[];
}

const RadarChartComponent = ({
    userGrowth,
}: {
    userGrowth: UserGrowthData[];
}) => {
    const chartData = userGrowth.map((item) => ({
        month: new Date(item.month + '-01').toLocaleDateString('en-US', {
            month: 'short',
        }),
        users: item.count,
    }));

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis
                        dataKey="month"
                        tick={{ fill: '#737373', fontSize: 12 }}
                    />
                    <PolarRadiusAxis tick={{ fill: '#737373', fontSize: 10 }} />
                    <Radar
                        name="Users"
                        dataKey="users"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default function UserGrowthPreview({ userGrowth = [] }: Props) {
    const sortedUserGrowth = [...userGrowth].sort((a, b) =>
        a.month.localeCompare(b.month),
    );
    const totalUsers = sortedUserGrowth.reduce(
        (sum, month) => sum + month.count,
        0,
    );
    const latestGrowthValue =
        sortedUserGrowth.length > 1
            ? ((sortedUserGrowth[sortedUserGrowth.length - 1].count -
                  sortedUserGrowth[sortedUserGrowth.length - 2].count) /
                  sortedUserGrowth[sortedUserGrowth.length - 2].count) *
              100
            : 0;

    const latestGrowth = Math.abs(latestGrowthValue).toFixed(1);
    const growthSign = latestGrowthValue >= 0 ? '+' : '-';
    const growthColor =
        latestGrowthValue >= 0
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400';

    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="User Growth Report Preview" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                            User Growth Report
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            User registration trends over the last 6 months
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('data-reports.download.user-growth')}>
                            Download PDF
                        </Link>
                    </Button>
                </div>

                {/* Radar Chart */}
                <div className="rounded-xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-700/60 dark:bg-neutral-800">
                    <RadarChartComponent userGrowth={sortedUserGrowth} />
                </div>

                {/* Report Summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-neutral-200/60 bg-white p-4 dark:border-neutral-700/60 dark:bg-neutral-800">
                        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
                            Total Users (6 months)
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {totalUsers}
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-white p-4 dark:border-neutral-700/60 dark:bg-neutral-800">
                        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
                            Latest Growth
                        </h3>
                        <p className={`text-2xl font-bold ${growthColor}`}>
                            {growthSign}
                            {latestGrowth}%
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/60 bg-white p-4 dark:border-neutral-700/60 dark:bg-neutral-800">
                        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
                            Months Tracked
                        </h3>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {userGrowth.length}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayoutAdmin>
    );
}
