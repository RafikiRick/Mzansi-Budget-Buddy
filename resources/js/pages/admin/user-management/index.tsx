import { Button } from '@/components/ui/button';
import AppLayoutAdmin from '@/layouts/app-layout-admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/admin/user-management',
    },
];

const typeOptions = [
    'All',
    'Sign Up',
    'Email Change',
    'User Name Change',
];

const timeframeOptions = [
    'This Month',
    'Last Month',
    'Last 3 Months',
    'This Year',
];

// Component for a single notification entry
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const NotificationEntry = ({ entry }) => {
    const { post: approve } = useForm();
    const { post: deny } = useForm();

    const handleApprove = () => {
        approve(route('notifications.approve', entry.id));
    };

    const handleDeny = () => {
        deny(route('notifications.deny', entry.id));
    };

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Render data based on notification type
    const renderData = () => {
        const data =
            typeof entry.data === 'string'
                ? JSON.parse(entry.data)
                : entry.data;

        switch (entry.type) {
            case 'Email Change':
                return `${data.old_email} → ${data.new_email}`;
            case 'Name Change':
                return `${data.old_name} → ${data.new_name}`;
            case 'Sign Up':
                return 'New user registration';
            case 'Password Change':
                return 'Password reset requested';
            default:
                return JSON.stringify(data);
        }
    };

    return (
        <div className="group flex cursor-pointer items-center justify-between border-b border-neutral-200/60 p-4 transition duration-200 last:border-b-0 hover:bg-neutral-100/50 dark:border-neutral-700/60 dark:hover:bg-neutral-800">
            {/* Details Column */}
            <div className="flex flex-1 items-start space-x-3">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                        {entry.user.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(entry.created_at)} | {entry.type}
                    </p>
                </div>
            </div>

            {/* Data Column */}
            <div className="mx-4 flex-1 text-sm text-neutral-600 dark:text-neutral-300">
                {renderData()}
            </div>

            {/* Buttons Column - Show only the taken action */}
            <div className="flex space-x-2">
                {entry.status === 'pending' ? (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleApprove}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDeny}
                        >
                            Deny
                        </Button>
                    </>
                ) : (
                    <span
                        className={`text-sm font-medium ${entry.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {entry.status === 'approved'
                            ? '✓ Approved'
                            : '✗ Denied'}
                    </span>
                )}
            </div>
        </div>
    );
};

interface Notification {
    id: number;
    user: {
        name: string;
    };
    type: string;
    status: string;
    data: object;
    created_at: string;
}

interface Props {
    notifications: Notification[];
}

export default function UserManagement({ notifications }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTypeFilter, setActiveTypeFilter] = useState('All');
    const [activeTimeframeFilter, setActiveTimeframeFilter] = useState('This Month');
    const [dropdownOpen, setDropdownOpen] = useState<'type' | 'timeframe' | null>(null);
    // --- Filtering Logic with Real Data ---
    const filteredNotifications = useMemo(() => {
        return notifications
            .filter(
                (entry) =>
                    activeTypeFilter === 'All' ||
                    entry.type === activeTypeFilter,
            )
            .filter(
                (entry) =>
                    entry.user.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    entry.type
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
            );
    }, [notifications, activeTypeFilter, searchQuery]);

    const handleApprove = (notification: Notification) => {
        // Approval logic here
        console.log('Approve:', notification);
    };

    const handleDeny = (notification: Notification) => {
        // Denial logic here
        console.log('Deny:', notification);
    };

    return (
        <AppLayoutAdmin breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:p-6">
                {/* --- 1. Header and Search Bar --- */}
                <div className="flex flex-col gap-3 p-2">
                    <div className="text-xl font-extrabold text-neutral-800 dark:text-neutral-100">
                        User Management
                    </div>

                    <input
                        type="text"
                        placeholder="Search notifications (e.g., user name, type)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                    />
                </div>

                {/* --- 2. Notifications List --- */}
                <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-lg transition-all duration-300 dark:border-neutral-700/60 dark:bg-neutral-900">
                    {/* Filters and Header */}
                    <div className="flex items-center justify-between border-b border-neutral-200/60 p-4 dark:border-neutral-700/60">
                        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
                            Notifications
                        </h3>
                        <div className="flex items-center space-x-2 text-sm">
                            {/* Type Filter Dropdown */}
                            <div className="group relative">
                                <button
                                    onClick={() => setDropdownOpen(prev => prev === 'type' ? null : 'type')}
                                    className="flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                                >
                                    Type: {activeTypeFilter} <span className="ml-1">▼</span>
                                </button>
                                {dropdownOpen === 'type' && (
                                    <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-neutral-200/60 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                                        {typeOptions.map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => {
                                                    setActiveTypeFilter(option);
                                                    setDropdownOpen(null);
                                                }}
                                                className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 ${activeTypeFilter === option ? 'bg-neutral-200/70 dark:bg-neutral-700/70' : ''}`}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Timeframe Filter Dropdown */}
                            <div className="group relative">
                                <button
                                    onClick={() => setDropdownOpen(prev => prev === 'timeframe' ? null : 'timeframe')}
                                    className="flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                                >
                                    Timeframe: {activeTimeframeFilter} <span className="ml-1">▼</span>
                                </button>
                                {dropdownOpen === 'timeframe' && (
                                    <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-neutral-200/60 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                                        {timeframeOptions.map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => {
                                                    setActiveTimeframeFilter(option);
                                                    setDropdownOpen(null);
                                                }}
                                                className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 ${activeTimeframeFilter === option ? 'bg-neutral-200/70 dark:bg-neutral-700/70' : ''}`}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notifications List (Scrollable Area) */}
                    <div className="h-[500px], h-[600px] overflow-y-auto">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((entry) => (
                                <NotificationEntry
                                    key={entry.id}
                                    entry={entry}
                                    onApprove={handleApprove}
                                    onDeny={handleDeny}
                                />
                            ))
                        ) : (
                            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                                {notifications.length === 0 ? (
                                    <p>No notifications yet.</p>
                                ) : (
                                    'No notifications found for the current filter or search criteria.'
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayoutAdmin>
    );
}
