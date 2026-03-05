'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCartWithQuantity, selectCartItemByProductId, Product } from '@/store/cartSlice';

// Product data (same as in products page - in real app this would come from API/database)
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
        description: 'Perfect for small businesses getting started with content management. Includes all essential features to build and manage your website effectively.',
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
        description: 'Advanced content management solution for growing businesses. Includes analytics, SEO tools, priority support, and unlimited content storage.',
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
        description: 'Boost your search engine rankings with our comprehensive SEO toolkit. Includes keyword research, meta tag optimization, and performance tracking.',
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
        description: 'Get detailed insights into your website performance with advanced analytics. Track visitors, user behavior, conversions, and more.',
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
        description: 'Latest generation smartphone with stunning display, powerful processor, and advanced camera system. Perfect for work and entertainment.',
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
        description: 'Premium quality cotton t-shirt with comfortable fit. Available in multiple colors, perfect for everyday wear or custom printing.',
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
        description: 'Comprehensive guide to JavaScript programming. From basics to advanced concepts with practical examples and real-world projects.',
    },
];

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
    'Subscriptions': '📦',
    'Addons': '🧩',
    'Electronics': '📱',
    'Clothing': '👕',
    'Books': '📚',
    'default': '🛍️',
};

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const dispatch = useAppDispatch();

    // Get existing cart item for this product
    const cartItem = useAppSelector((state) => selectCartItemByProductId(state, id));

    // Initialize quantity with existing cart quantity if product is in cart
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    // Sync quantity with cart when cartItem changes
    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [cartItem]);

    // Find the product by ID
    const product = productsData.find((p) => p.id === id);

    // Get related products (same category, excluding current product)
    const relatedProducts = productsData
        .filter((p) => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
                <Navbar />
                <div className="container mx-auto px-4 py-8 pt-24">
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Product Not Found
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            The product you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-primary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-secondary/25 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const getCategoryEmoji = () => categoryEmojis[product.category] || categoryEmojis['default'];

    // Format price
    const formattedPrice = typeof product.price === 'string'
        ? product.price
        : `$${product.price.toFixed(2)}`;

    // Status badge
    const statusColor = product.status === 'active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';

    // Trend color
    const trendColor = product.trend && product.trend !== '-' && !product.trend.startsWith('-')
        ? 'text-green-600 dark:text-green-400'
        : product.trend === '-'
            ? 'text-gray-400'
            : 'text-red-600 dark:text-red-400';

    // Stock status
    const getStockStatus = () => {
        if (!product.stock || product.stock === 0) return { text: 'Out of Stock', color: 'text-red-600 dark:text-red-400' };
        if (product.stock > 50) return { text: 'In Stock', color: 'text-green-600 dark:text-green-400' };
        return { text: `Only ${product.stock} left`, color: 'text-yellow-600 dark:text-yellow-400' };
    };
    const stockStatus = getStockStatus();

    const handleAddToCart = () => {
        setIsAdding(true);
        // Add product with selected quantity - dispatch once with the full quantity
        dispatch(addToCartWithQuantity({ product, quantity }));
        setTimeout(() => {
            setIsAdding(false);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 3000);
        }, 500);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, Math.min(product.stock || 1, prev + delta)));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-24">
                {/* Breadcrumb */}
                <nav className="mb-8 animate-fade-in">
                    <ol className="flex items-center gap-2 text-sm">
                        <li>
                            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-secondary transition-colors">
                                Home
                            </Link>
                        </li>
                        <li className="text-gray-400 dark:text-gray-500">/</li>
                        <li>
                            <Link href="/products" className="text-gray-500 dark:text-gray-400 hover:text-secondary transition-colors">
                                Products
                            </Link>
                        </li>
                        <li className="text-gray-400 dark:text-gray-500">/</li>
                        <li>
                            <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
                        </li>
                    </ol>
                </nav>

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Product Image */}
                    <div className="animate-scale-in">
                        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
                            <span className="text-[12rem] transition-transform duration-500 hover:scale-110">
                                {getCategoryEmoji()}
                            </span>

                            {/* Status Badge */}
                            <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-semibold ${statusColor}`}>
                                {product.status === 'active' ? '✓ In Stock' : '⏳ Draft'}
                            </div>

                            {/* Trend Badge */}
                            {product.trend && product.trend !== '-' && (
                                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium bg-white/90 dark:bg-gray-900/90 ${trendColor}`}>
                                    {product.trend}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="animate-slide-up">
                        {/* Category */}
                        <div className="text-sm font-medium text-secondary uppercase tracking-wider mb-2">
                            {product.category}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {product.name}
                        </h1>

                        {/* SKU */}
                        <div className="text-gray-500 dark:text-gray-400 mb-6">
                            SKU: {product.sku}
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                {formattedPrice}
                            </span>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-3 h-3 rounded-full ${product.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                            <span className={`font-medium ${stockStatus.color}`}>
                                {stockStatus.text}
                            </span>
                            {product.stock && product.stock > 0 && (
                                <span className="text-gray-500 dark:text-gray-400">
                                    ({product.stock} units available)
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Description
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {product.description || 'No description available for this product.'}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        {product.status === 'active' && product.stock && product.stock > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Quantity
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                            className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="px-6 py-3 text-gray-900 dark:text-white font-semibold min-w-[60px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= product.stock}
                                            className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Max: {product.stock}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {product.status === 'active' && product.stock && product.stock > 0 ? (
                                <>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdding || isAdded}
                                        className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-base transition-all duration-300 ${isAdded
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white shadow-md hover:shadow-lg hover:shadow-secondary/25'
                                            }`}
                                    >
                                        {isAdding ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Adding...
                                            </span>
                                        ) : isAdded ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Added!
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Add ({quantity})
                                            </span>
                                        )}
                                    </button>

                                    {/* View Cart Button - appears after adding to cart */}
                                    {isAdded && (
                                        <Link
                                            href="/cart"
                                            className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-base bg-white dark:bg-gray-800 border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 flex items-center justify-center gap-2 animate-fade-in"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            View Cart
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <button
                                    disabled
                                    className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-base bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                >
                                    Out of Stock
                                </button>
                            )}

                            <Link
                                href="/products"
                                className="py-2.5 px-4 rounded-lg font-semibold text-base border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-secondary hover:text-secondary transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Products
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct, index) => (
                                <div
                                    key={relatedProduct.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                                >
                                    <ProductCard product={relatedProduct} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

