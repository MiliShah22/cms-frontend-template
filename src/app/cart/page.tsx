'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotalPrice, removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { useAuth } from '@/context/AuthContext';

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
    'Subscriptions': '📦',
    'Addons': '🧩',
    'Electronics': '📱',
    'Clothing': '👕',
    'Books': '📚',
    'default': '🛍️',
};

export default function CartPage() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const { isAuthenticated } = useAuth();

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
                <Navbar />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
                        <div className="text-6xl mb-6">🔐</div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Login Required
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Please login to view your cart and start shopping.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                        <div className="text-8xl mb-6">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
                                {items.map((item, index) => (
                                    <div
                                        key={item.product.id}
                                        className={`flex items-center p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${index === 0 ? 'border-t-0' : ''
                                            }`}
                                    >
                                        {/* Product Image */}
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
                                            {categoryEmojis[item.product.category] || categoryEmojis['default']}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 ml-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-sm text-secondary font-medium">
                                                        {item.product.category}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveFromCart(item.product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-lg font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleClearCart}
                                className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear Cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal ({items.length} items)</span>
                                        <span className="font-medium text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            </svg>
                                            Shipping
                                        </span>
                                        <span className="font-medium text-green-500">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span className="font-medium">$0.00</span>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                                ${totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="block w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-secondary/25"
                                >
                                    Proceed to Checkout
                                </Link>

                                <Link
                                    href="/products"
                                    className="block w-full text-center py-3 mt-3 text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors text-sm font-medium"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

