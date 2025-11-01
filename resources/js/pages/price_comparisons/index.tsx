import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface PriceComparisons {
    id: number;
    product: string;
    store: string;
    category: string;
    price: number;
    is_best_deal: boolean;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    priceComparison: PriceComparisons[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Price Comparisons',
        href: '/price_comparisons',
    },
];

// The available categories for filtering (now includes data types)
const filterOptions = ['Product', 'Store', 'Category', 'Date'];

// Component for a single price result entry
const PriceEntry = ({ entry }) => {
    // Format currency to South African Rand (R)
    const formatCurrency = (amount) => `R ${amount.toFixed(2)}`;

    // Determine color based on deal status for a modern look
    const priceColor = entry.is_best_deal
        ? 'text-green-600 dark:text-green-400'
        : 'text-neutral-900 dark:text-neutral-100';

    return (
        <div className="flex cursor-pointer items-center justify-between border-b border-neutral-200/60 bg-white p-4 transition-all duration-300 last:border-b-0 hover:scale-[1.005] hover:bg-neutral-50/50 hover:shadow-lg dark:border-neutral-700/60 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <div className="flex items-center space-x-3">
                {/* Removed product icons for cleaner look */}
                <div>
                    {/* Best Deal Tag */}
                    {Boolean(entry.is_best_deal) && (
                        <span className="mr-2 rounded-full bg-green-500/80 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                            🏆 Best Deal
                        </span>
                    )}
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                        {entry.product}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {entry.store} | {new Date(entry.updated_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <p className={`text-lg font-bold ${priceColor}`}>
                {formatCurrency(entry.price)}
            </p>
        </div>
    );
};

// --- Main Price Comparison Component ---
export default function PriceComparisonIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Product');
    const { props } = usePage<PageProps>();
    const priceComparisons = props.priceComparison || [];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        // NOTE: In a real application, clicking the filter would trigger a data request
        // to sort the results based on the 'activeFilter' parameter.
        console.log(`Filtering results by: ${filter}`);
    };

    // --- Dynamic Filtering/Sorting Logic ---
    const filteredAndSortedResults = useMemo(() => {
        // 1. Filter based on Search Query
        let results = priceComparisons.filter(
            (item) =>
                item.product
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                item.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        // 2. Simple Sort (simulated based on activeFilter)
        if (activeFilter === 'Store') {
            results.sort((a, b) => a.store.localeCompare(b.store));
        } else if (activeFilter === 'Price') {
            results.sort((a, b) => a.price - b.price);
        } else {
            // Default sort or sort by Product
            results.sort((a, b) => a.product.localeCompare(b.product));
        }

        return results;
    }, [searchQuery, activeFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Price Comparison" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4 md:p-6">
                {/* --- 1. Search Bar (Title Removed, Search Bar Simplified) --- */}
                <div className="relative -mx-2 mb-2 p-2">
                    <input
                        type="search"
                        placeholder="Search for products (e.g., bread, milk, data bundles)"
                        value={searchQuery}
                        onChange={handleSearch}
                        // Search bar styling simplified and permanent
                        className="w-full rounded-lg border border-neutral-300 p-3 transition focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
                    />
                </div>

                {/* --- 2. Filter Buttons (With Hover Functionality) --- */}
                <div className="scrollbar-hide -mx-4 flex space-x-3 overflow-x-auto px-4 pb-2">
                    {filterOptions.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition duration-150 ${
                                activeFilter === filter
                                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                    : 'bg-neutral-100 text-neutral-700 hover:scale-[1.05] hover:bg-blue-100/50 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-blue-900/50' // Hover pop
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* --- 3. Price Comparison Results List (Overall Pop on Hover) --- */}
                <div
                    className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-lg  dark:border-neutral-700/60 dark:bg-neutral-900" // Overall Pop
                >
                    <div className="flex-1 divide-y divide-neutral-200/60 overflow-y-auto dark:divide-neutral-700/60">
                        {filteredAndSortedResults.map((entry) => (
                            // PriceEntry also has its own individual hover pop
                            <PriceEntry key={entry.id} entry={entry} />
                        ))}

                        {filteredAndSortedResults.length === 0 && (
                            <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">
                                {priceComparisons.length === 0
                                    ? 'No price data available yet.'
                                    : 'No price results found. Please adjust your search.'}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- 4. Crowdsourced Disclaimer (Footer) --- */}
                <div className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    Prices are crowdsourced and updated daily, last sync:
                    **10:55 AM**
                </div>
            </div>
        </AppLayout>
    );
}
