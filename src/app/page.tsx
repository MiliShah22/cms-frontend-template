'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-secondary bg-secondary/10 rounded-full">
                ✨ Your One-Stop Shop
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Discover Amazing{' '}
                <span className="gradient-text">Products</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Browse our wide range of products with competitive prices.
                Shop with confidence and track your orders easily.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="group bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-secondary/25"
                >
                  <span className="flex items-center justify-center gap-2">
                    Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-2.5 rounded-lg font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-secondary transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">500+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">4.9★</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Floating Cards */}
            <div className="relative hidden lg:block animate-slide-in-right">
              <div className="relative w-full aspect-square">
                {/* Main floating card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 card-hover-lift animate-float">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-4 flex items-center justify-center text-6xl">
                    🛍️
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Premium Collection</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Up to 50% off</p>
                </div>

                {/* Floating badge */}
                <div className="absolute top-8 right-8 bg-accent text-white px-4 py-2 rounded-full shadow-lg animate-bounce-subtle">
                  <span className="font-semibold">Hot Deal 🔥</span>
                </div>

                {/* Floating stats card */}
                <div className="absolute bottom-8 left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 card-hover-lift">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Free Shipping</p>
                      <p className="font-semibold text-gray-900 dark:text-white">On orders $50+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-gray-50 dark:text-gray-900" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CMS Store
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide an exceptional shopping experience with features designed to make your life easier.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg card-hover-lift">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🛍️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Browse Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our wide range of products with detailed information, competitive prices, and real-time stock availability.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg card-hover-lift">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🛒
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Easy Shopping Cart
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add products to your cart with one click. Manage quantities, view totals, and proceed to checkout seamlessly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg card-hover-lift">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📦
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Track Orders
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View your complete order history, track delivery status, and manage all your purchases in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best online shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="bg-white text-secondary hover:bg-gray-100 px-6 py-2.5 rounded-lg font-medium transition-all duration-300"
            >
              Browse Products
            </Link>
            <Link
              href="/register"
              className="bg-white/10 text-white hover:bg-white/20 border-2 border-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold gradient-text">CMS Store</span>
              <p className="text-gray-400 mt-2">Your trusted online shopping destination.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link>
              <Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2024 CMS Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
