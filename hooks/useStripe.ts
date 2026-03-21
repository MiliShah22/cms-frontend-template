"use client";

import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<any>;

const getStripe = () => {
    if (!stripePromise) {
        const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        if (key) {
            stripePromise = loadStripe(key);
        } else {
            console.warn('Stripe publishable key not found. Using null stripe instance.');
            stripePromise = Promise.resolve(null);
        }
    }
    return stripePromise;
};

export { getStripe };


