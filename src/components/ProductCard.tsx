'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCartWithQuantity, Product, selectCartItemByProductId } from '@/store/cartSlice';

type ProductCardProps = {
    product: Product;
};

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
    'Subscriptions': '📦',
    'Addons': '🧩',
    'Electronics': '📱',
    'Clothing': '👕',
    'Books': '📚',
    'Home & Garden': '🏡',
    'Sports': '⚽',
    'default': '🛍️',
};

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Get cart item for this product
    const cartItem = useAppSelector((state) => selectCartItemByProductId(state, product.id));

    // Format price - handle both string "$19.00" and number 19.00
    const formattedPrice = typeof product.price === 'string'
        ? product.price
        : `$${product.price.toFixed(2)}`;

    // Determine status badge color
    const statusColor = product.status === 'active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';

    // Determine trend color
    const trendColor = product.trend && product.trend !== '-' && !product.trend.startsWith('-')
        ? 'text-green-600 dark:text-green-400'
        : product.trend === '-'
            ? 'text-gray-400'
            : 'text-red-600 dark:text-red-400';

    const handleAddToCart = () => {
        setIsAdding(true);
        dispatch(addToCartWithQuantity({ product, quantity }));
        setTimeout(() => setIsAdding(false), 500);
    };

    const getCategoryEmoji = () => categoryEmojis[product.category] || categoryEmojis['default'];

    const increaseQuantity = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity < (product.stock || 99)) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQuantity = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <Link href={`/products/${product.id}`} className="block h-full">
            <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 card-hover-lift border border-gray-100 dark:border-gray-800 h-full">
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden">
                    <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                        {getCategoryEmoji()}
                    </span>

                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>
                        {product.status === 'active' ? '✓ In Stock' : '⏳ Draft'}
                    </div>

                    {/* Trend Badge */}
                    {product.trend && product.trend !== '-' && (
                        <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-900/90 ${trendColor}`}>
                            {product.trend}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4">
                    {/* Category */}
                    <div className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                        {product.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-secondary transition-colors">
                        {product.name}
                    </h3>

                    {/* SKU */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        SKU: {product.sku}
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-end justify-between mb-3">
                        <div>
                            <span className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                {formattedPrice}
                            </span>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Stock</div>
                            <div className={`text-sm font-medium ${(product.stock || 0) > 50 ? 'text-green-600 dark:text-green-400' : (product.stock || 0) > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                {product.stock || 0} units
                            </div>
                        </div>
                    </div>

                    {/* Cart Button - Shows quantity if in cart, otherwise shows Add to Cart with quantity selector */}
                    {cartItem ? (
                        <div className="w-full py-2 px-3 rounded-lg font-medium bg-green-500 text-white flex items-center justify-center gap-2 text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {cartItem.quantity} in Cart
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="px-2 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <span className="px-3 py-1.5 text-gray-900 dark:text-white font-medium min-w-[40px] text-center text-sm">
                                    {quantity}
                                </span>
                                <button
                                    onClick={increaseQuantity}
                                    disabled={quantity >= (product.stock || 99)}
                                    className="px-2 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAddToCart();
                                }}
                                disabled={isAdding}
                                className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${isAdding
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white shadow-md hover:shadow-lg hover:shadow-secondary/25'
                                    }`}
                            >
                                {isAdding ? (
                                    <span className="flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Added
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add
                                    </span>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

