'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useAppSelector } from '@/store/hooks';
import { selectCartTotalItems } from '@/store/cartSlice';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const totalItems = useAppSelector(selectCartTotalItems);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggle = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass shadow-lg py-3'
                : 'bg-white dark:bg-gray-900 py-4'
                } border-b border-gray-200/50 dark:border-gray-700/50`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Image
                                src="/logo.svg"
                                alt="CMS Store Logo"
                                width={36}
                                height={36}
                                className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute -inset-1 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="font-bold text-xl gradient-text">CMS Store</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/products"
                            className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors relative group"
                        >
                            Products
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/cart"
                                    className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors relative group"
                                >
                                    Cart
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link
                                    href="/orders"
                                    className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors relative group"
                                >
                                    Orders
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/cart"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-secondary/25"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                View Cart
                                {totalItems > 0 && (
                                    <span className="bg-white text-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/cart"
                                className="relative sm:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 group"
                            >
                                <span className="text-xl block group-hover:scale-110 transition-transform">🛒</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                            <div className="hidden sm:flex items-center gap-3 pl-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    Hi, {user?.name?.split(' ')[0]}
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-gray-700 dark:text-gray-300 hover:text-danger transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-secondary/25"
                        >
                            Login
                        </Link>
                    )}
                    <button
                        className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                        onClick={toggle}
                        aria-label="Toggle dark mode"
                    >
                        <span className="block group-hover:rotate-12 transition-transform duration-300">
                            {darkMode ? '🌙' : '☀️'}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}
