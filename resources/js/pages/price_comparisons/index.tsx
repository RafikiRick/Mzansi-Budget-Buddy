import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Price Comparisons',
        href: '/price_comparisons',
    },
];
// --- Placeholder Data ---
const priceComparisonData = [
    {
        product: 'Clover Full Cream Milk 1L',
        store: 'Shoprite',
        price: 23.50,
        updated: '2 hours ago',
        isBestDeal: true,
        icon: '🥛',
    },
    {
        product: 'Clover Full Cream Milk 1L',
        store: 'Pick n Pay',
        price: 23.50,
        updated: '2 hours ago',
        isBestDeal: false,
        icon: '🥛',
    },
    {
        product: 'Albany White Bread 700g',
        store: 'Woolworths',
        price: 24.99,
        updated: '1 hour ago',
        isBestDeal: false,
        icon: '🍞',
    },
    {
        product: 'Albany White Bread 700g',
        store: 'Checkers',
        price: 19.99,
        updated: '2 hours ago',
        isBestDeal: true,
        icon: '🍞',
    },
    {
        product: 'Albany White Bread 700g',
        store: 'Shoprite',
        price: 19.99,
        updated: '4 hours ago',
        isBestDeal: false,
        icon: '🍞',
    },
    {
        product: 'Albany White Bread 700g',
        store: 'Pick n Pay',
        price: 19.99,
        updated: '4 hours ago',
        isBestDeal: false,
        icon: '🍞',
    },
];

// Component for a single price result entry
const PriceEntry = ({ entry }) => {
    // Format currency to South African Rand (R)
    const formatCurrency = (amount) => `R ${amount.toFixed(2)}`;

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border-b border-sidebar-border/70 dark:border-sidebar-border last:border-b-0">
            <div className="flex items-center space-x-3">
                <div className="text-2xl">{entry.icon}</div>
                <div>
                    {entry.isBestDeal && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500 text-white mr-2">
                            ⭐️ Best Deal
                        </span>
                    )}
                    <p className="font-semibold text-sm">{entry.product}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{entry.store} | updated {entry.updated}</p>
                </div>
            </div>
            <p className="font-bold text-lg text-neutral-900 dark:text-white">
                {formatCurrency(entry.price)}
            </p>
        </div>
    );
};

// --- Main Price Comparison Component ---
export default function PriceComparisonIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Product'); // Sort/Filter type

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // ⭐️ Backend/Data Logic: This would trigger a price data lookup ⭐️
        console.log(`Searching for products/deals: ${e.target.value}`);
    };
    
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        // ⭐️ Backend/Data Logic: This would trigger a sorting/filtering function on the results ⭐️
        console.log(`Filtering results by: ${filter}`);
    };

    const filterOptions = ['Product', 'Store', 'Date', 'Ticket']; // Matching the buttons in your screenshot

    // Simple filter of the placeholder data based on search term
    const filteredResults = priceComparisonData.filter(item => 
        item.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* CORRECTED HEAD TITLE */}
            <Head title="Price Comparison" /> 
            
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                
                <h2 className="text-2xl font-bold mb-2">Price Comparison</h2>
                
                {/* --- 1. Search Bar --- */}
                <div className="relative">
                    <input
                        type="search"
                        placeholder="🔍 Search for products (e.g., bread, milk, data bundles)"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full p-3 pl-10 border border-sidebar-border/70 dark:border-neutral-700 rounded-xl dark:bg-neutral-800 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {/* Search icon placeholder position */}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                        {/* You can replace this with a proper icon component */}
                    </div>
                </div>

                {/* --- 2. Filter Buttons --- */}
                <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    {filterOptions.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition duration-150 ${
                                activeFilter === filter
                                    ? 'bg-green-500 text-white shadow-md'
                                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-green-100 dark:hover:bg-green-900/50'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* --- 3. Price Comparison Results List --- */}
                <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden"> 
                    <div className="flex-1 overflow-y-auto divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                        {filteredResults.map((entry, index) => (
                            <PriceEntry key={index} entry={entry} />
                        ))}
                        
                        {filteredResults.length === 0 && (
                            <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">
                                No results found. Try searching for a product like "milk" or "bread".
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