'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

interface OrderItem {
    product: {
        id: string;
        name: string;
        price: number;
    };
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
    shipping: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    status: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const storedOrders = localStorage.getItem('orders');
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders));
            }
        }
    }, [isAuthenticated]);

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
                            Please login to view your orders.
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

    const getStatusConfig = (status: string) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return {
                    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
                    icon: '⏳',
                    steps: [
                        { label: 'Order Placed', completed: true },
                        { label: 'Processing', completed: true },
                        { label: 'Shipped', completed: false },
                        { label: 'Delivered', completed: false },
                    ]
                };
            case 'shipped':
                return {
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
                    icon: '📦',
                    steps: [
                        { label: 'Order Placed', completed: true },
                        { label: 'Processing', completed: true },
                        { label: 'Shipped', completed: true },
                        { label: 'Delivered', completed: false },
                    ]
                };
            case 'delivered':
                return {
                    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
                    icon: '✅',
                    steps: [
                        { label: 'Order Placed', completed: true },
                        { label: 'Processing', completed: true },
                        { label: 'Shipped', completed: true },
                        { label: 'Delivered', completed: true },
                    ]
                };
            case 'cancelled':
                return {
                    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
                    icon: '❌',
                    steps: [
                        { label: 'Order Placed', completed: false },
                        { label: 'Processing', completed: false },
                        { label: 'Shipped', completed: false },
                        { label: 'Delivered', completed: false },
                    ]
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
                    icon: '📋',
                    steps: [
                        { label: 'Order Placed', completed: false },
                        { label: 'Processing', completed: false },
                        { label: 'Shipped', completed: false },
                        { label: 'Delivered', completed: false },
                    ]
                };
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            My Orders
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track and manage your orders
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Continue Shopping
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                        <div className="text-8xl mb-6">📦</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            No orders yet
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            You haven't placed any orders yet. Start shopping to see your orders here!
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
                    <div className="space-y-6">
                        {orders.slice().reverse().map((order) => {
                            const statusConfig = getStatusConfig(order.status);
                            return (
                                <div
                                    key={order.id}
                                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                                                    Order ID
                                                </span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {order.id}
                                                </span>
                                            </div>
                                            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                                                    Date
                                                </span>
                                                <span className="text-gray-900 dark:text-white">
                                                    {new Date(order.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusConfig.color}`}>
                                            {statusConfig.icon} {order.status}
                                        </span>
                                    </div>

                                    {/* Order Timeline */}
                                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center justify-between">
                                            {statusConfig.steps.map((step, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="flex flex-col items-center">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step.completed
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                                            }`}>
                                                            {step.completed ? (
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : (
                                                                index + 1
                                                            )}
                                                        </div>
                                                        <span className={`text-xs mt-1 hidden sm:block ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                    {index < statusConfig.steps.length - 1 && (
                                                        <div className={`w-8 md:w-16 h-0.5 mx-1 ${step.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Items */}
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                                                    Order Items
                                                </h3>
                                                <div className="space-y-2">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="flex justify-between items-center">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg">
                                                                    📦
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-900 dark:text-white font-medium">
                                                                        {item.product.name}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        Qty: {item.quantity}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className="font-medium text-gray-900 dark:text-white">
                                                                ${(item.product.price * item.quantity).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Shipping Info */}
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                                                    Shipping Address
                                                </h3>
                                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                                                    <p className="text-gray-900 dark:text-white font-medium">
                                                        {order.shipping.firstName} {order.shipping.lastName}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                        {order.shipping.address}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                        {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                        {order.shipping.country}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                                                <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                                    ${order.total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

