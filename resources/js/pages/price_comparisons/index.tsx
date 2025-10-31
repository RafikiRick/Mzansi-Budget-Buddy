import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Price Comparisons',
        href: '/price_comparisons',
    },
];

// --- Enhanced Placeholder Data (Simulating Real-Life Data) ---
const initialPriceComparisonData = [
    {
        id: 1,
        product: 'Clover Full Cream Milk 1L',
        store: 'Shoprite',
        category: 'Dairy',
        price: 23.50,
        updated: '2 hours ago',
        isBestDeal: true,
    },
    {
        id: 2,
        product: 'Clover Full Cream Milk 1L',
        store: 'Pick n Pay',
        category: 'Dairy',
        price: 23.50,
        updated: '2 hours ago',
        isBestDeal: false,
    },
    {
        id: 3,
        product: 'Albany White Bread 700g',
        store: 'Woolworths',
        category: 'Bakery',
        price: 24.99,
        updated: '1 hour ago',
        isBestDeal: false,
    },
    {
        id: 4,
        product: 'Albany White Bread 700g',
        store: 'Checkers',
        category: 'Bakery',
        price: 19.99,
        updated: '2 hours ago',
        isBestDeal: true,
    },
    {
        id: 5,
        product: 'Vodacom 1GB Data Bundle',
        store: 'Vodacom (Voucher)',
        category: 'Data/Airtime',
        price: 99.00,
        updated: '5 minutes ago',
        isBestDeal: true,
    },
    {
        id: 6,
        product: 'Vodacom 1GB Data Bundle',
        store: 'MTN (Voucher)',
        category: 'Data/Airtime',
        price: 105.00,
        updated: '10 minutes ago',
        isBestDeal: false,
    },
];

// The available categories for filtering (now includes data types)
const filterOptions = ['Product', 'Store', 'Category', 'Date']; 

// Component for a single price result entry
const PriceEntry = ({ entry }) => {
    // Format currency to South African Rand (R)
    const formatCurrency = (amount) => `R ${amount.toFixed(2)}`;

    // Determine color based on deal status for a modern look
    const priceColor = entry.isBestDeal ? 'text-green-600 dark:text-green-400' : 'text-neutral-900 dark:text-neutral-100';

    return (
        <div 
            className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border-b border-neutral-200/60 dark:border-neutral-700/60 last:border-b-0 cursor-pointer 
                       transition-all duration-300 hover:shadow-lg hover:scale-[1.005] hover:bg-neutral-50/50 dark:hover:bg-neutral-800"
        >
            <div className="flex items-center space-x-3">
                {/* Removed product icons for cleaner look */}
                <div>
                    {/* Best Deal Tag */}
                    {entry.isBestDeal && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/80 text-white mr-2 shadow-sm">
                            🏆 Best Deal
                        </span>
                    )}
                    <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{entry.product}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{entry.store} | updated {entry.updated}</p>
                </div>
            </div>
            <p className={`font-bold text-lg ${priceColor}`}>
                {formatCurrency(entry.price)}
            </p>
        </div>
    );
};

// --- Main Price Comparison Component ---
export default function PriceComparisonIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Product'); 

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
        let results = initialPriceComparisonData.filter(item => 
            item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
                <div className="relative p-2 -mx-2 mb-2">
                    <input
                        type="search"
                        placeholder="Search for products (e.g., bread, milk, data bundles)"
                        value={searchQuery}
                        onChange={handleSearch}
                        // Search bar styling simplified and permanent
                        className="w-full p-3 border border-neutral-300 rounded-lg dark:bg-neutral-800 dark:border-neutral-700 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>

                {/* --- 2. Filter Buttons (With Hover Functionality) --- */}
                <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {filterOptions.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition duration-150 whitespace-nowrap ${
                                activeFilter === filter
                                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 hover:scale-[1.05]' // Hover pop
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* --- 3. Price Comparison Results List (Overall Pop on Hover) --- */}
                <div 
                    className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 overflow-hidden 
                                transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]" // Overall Pop
                > 
                    <div className="flex-1 overflow-y-auto divide-y divide-neutral-200/60 dark:divide-neutral-700/60">
                        {filteredAndSortedResults.map((entry) => (
                            // PriceEntry also has its own individual hover pop
                            <PriceEntry key={entry.id} entry={entry} />
                        ))}
                        
                        {filteredAndSortedResults.length === 0 && (
                            <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">
                                No price results found. Please adjust your search.
                            </div>
                        )}
                    </div>
                </div>

                {/* --- 4. Crowdsourced Disclaimer (Footer) --- */}
                <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Prices are crowdsourced and updated daily, last sync: **10:55 AM**
                </div>
            </div>
        </AppLayout>
    );
}