'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    category: string;
    sku?: string;
    stock?: number;
    status?: string;
    trend?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product, quantity: 1 });
            }
        },
        addToCartWithQuantity: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.product.id !== productId);
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find((item) => item.product.id === productId);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((i) => i.product.id !== productId);
                } else {
                    item.quantity = quantity;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, addToCartWithQuantity, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalItems = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotalPrice = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
export const selectCartItemByProductId = (state: { cart: CartState }, productId: string) =>
    state.cart.items.find((item) => item.product.id === productId);

export default cartSlice.reducer;

