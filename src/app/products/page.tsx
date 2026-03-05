'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

// Product data
const productsData: Product[] = [
    {
        id: 'PRD-1024',
        name: 'CMS Starter Plan',
        sku: 'CMS-ST-01',
        category: 'Subscriptions',
        price: 19.00,
        stock: 243,
        status: 'active',
        trend: '+12%',
    },
    {
        id: 'PRD-1008',
        name: 'CMS Pro Plan',
        sku: 'CMS-PR-01',
        category: 'Subscriptions',
        price: 49.00,
        stock: 88,
        status: 'active',
        trend: '+7%',
    },
    {
        id: 'PRD-0992',
        name: 'SEO Toolkit Addon',
        sku: 'ADD-SEO-01',
        category: 'Addons',
        price: 9.00,
        stock: 510,
        status: 'active',
        trend: '+23%',
    },
    {
        id: 'PRD-0975',
        name: 'Analytics Upgrade',
        sku: 'ADD-ANALYTICS',
        category: 'Addons',
        price: 15.00,
        stock: 132,
        status: 'draft',
        trend: '-',
    },
    {
        id: 'PRD-2001',
        name: 'Smartphone',
        sku: 'ELEC-001',
        category: 'Electronics',
        price: 299.00,
        stock: 50,
        status: 'active',
        trend: '+5%',
    },
    {
        id: 'PRD-2002',
        name: 'T-Shirt',
        sku: 'CLOT-101',
        category: 'Clothing',
        price: 19.99,
        stock: 120,
        status: 'active',
        trend: '+2%',
    },
    {
        id: 'PRD-2003',
        name: 'Book: Learn JS',
        sku: 'BOOK-201',
        category: 'Books',
        price: 29.00,
        stock: 75,
        status: 'active',
        trend: '+8%',
    },
];

// Category icons mapping
const categoryIcons: Record<string, string> = {
    'All': '🏷️',
    'Subscriptions': '📦',
    'Addons': '🧩',
    'Electronics': '📱',
    'Clothing': '👕',
    'Books': '📚',
};

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const categories = ['All', ...new Set(productsData.map((p) => p.category))];

    const filteredProducts = productsData.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                Our Products
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Browse our collection of {productsData.length} products
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent shadow-sm transition-all duration-200"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setCategoryFilter(category)}
                                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${categoryFilter === category
                                        ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-md'
                                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <span className="text-lg">{categoryIcons[category] || '📦'}</span>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Info */}
                {searchTerm && (
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            No products match your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('All');
                            }}
                            className="text-secondary hover:text-secondary/80 font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

