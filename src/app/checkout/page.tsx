'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotalPrice, clearCart } from '@/store/cartSlice';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'credit-card',
    });
    const [error, setError] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const router = useRouter();

    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const { isAuthenticated, user } = useAuth();

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
                            Please login to complete your order.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0 && !orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
                <Navbar />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
                        <div className="text-6xl mb-6">🛒</div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Your Cart is Empty
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Add some products to your cart first.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email ||
            !formData.address || !formData.city || !formData.state ||
            !formData.zipCode || !formData.country) {
            setError('Please fill in all required fields');
            return;
        }

        // Simulate order placement
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({
            id: orderId,
            date: new Date().toISOString(),
            items: items,
            total: totalPrice,
            shipping: formData,
            status: 'Processing',
        });
        localStorage.setItem('orders', JSON.stringify(orders));

        handleClearCart();
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
                <Navbar />
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Order Placed Successfully!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                            Thank you for your order.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Your order is being processed and will be shipped soon.
                        </p>
                        <Link
                            href="/orders"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                        >
                            View Orders
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
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Checkout
                    </h1>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white hidden md:inline">Cart</span>
                        </div>
                        <div className="w-8 md:w-16 h-0.5 bg-green-500"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white hidden md:inline">Shipping</span>
                        </div>
                        <div className="w-8 md:w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden md:inline">Payment</span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Information */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Shipping Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email || user?.email || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            State/Province <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            ZIP/Postal Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Payment Method
                                </h2>
                                <div className="space-y-3">
                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'credit-card'
                                        ? 'border-secondary bg-secondary/5'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="credit-card"
                                            checked={formData.paymentMethod === 'credit-card'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-secondary"
                                        />
                                        <span className="ml-3 font-medium text-gray-900 dark:text-white">Credit Card</span>
                                        <div className="ml-auto flex gap-2">
                                            <span className="text-2xl">💳</span>
                                        </div>
                                    </label>
                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'paypal'
                                        ? 'border-secondary bg-secondary/5'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={formData.paymentMethod === 'paypal'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-secondary"
                                        />
                                        <span className="ml-3 font-medium text-gray-900 dark:text-white">PayPal</span>
                                        <div className="ml-auto flex gap-2">
                                            <span className="text-2xl">🅿️</span>
                                        </div>
                                    </label>
                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'cash-on-delivery'
                                        ? 'border-secondary bg-secondary/5'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cash-on-delivery"
                                            checked={formData.paymentMethod === 'cash-on-delivery'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-secondary"
                                        />
                                        <span className="ml-3 font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
                                        <div className="ml-auto flex gap-2">
                                            <span className="text-2xl">💵</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Order Summary
                                </h2>
                                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {item.product.name} x{item.quantity}
                                            </span>
                                            <span className="text-gray-900 dark:text-white font-medium">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600 dark:text-green-400">
                                        <span className="flex items-center gap-1">Shipping</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span className="font-medium">$0.00</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900 dark:text-white">Total</span>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                                ${totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white py-4 rounded-xl font-semibold mt-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-secondary/25"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

