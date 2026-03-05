'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './cartSlice';

// Custom storage utility for Redux persistence
const STORAGE_KEY = 'cms-cart-state';

// Load state from localStorage
const loadState = (): CartState | undefined => {
    if (typeof window === 'undefined') {
        return undefined;
    }
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading cart state from localStorage:', err);
        return undefined;
    }
};

// Save state to localStorage
const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state.cart);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
        console.error('Error saving cart state to localStorage:', err);
    }
};

// Preload cart state from localStorage
const preloadedCartState = loadState();

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: preloadedCartState ? { cart: preloadedCartState } : undefined,
});

// Subscribe to store changes and persist cart state
let saveTimeout: NodeJS.Timeout | null = null;
store.subscribe(() => {
    // Debounce saves to avoid excessive writes
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => {
        saveState(store.getState());
    }, 100);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

