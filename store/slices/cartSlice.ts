import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/products";

export interface CartItem extends Product {
  qty: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
}

const initialState: CartState = {
  items: [],
  couponCode: "",
  couponDiscount: 0,
};

const VALID_COUPONS: Record<string, number> = {
  LUXE20: 20,
  SAVE10: 10,
  FIRST15: 15,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        qty?: number;
        selectedSize?: string;
        selectedColor?: string;
      }>
    ) => {
      const { product, qty = 1, selectedSize = "M", selectedColor = "Dark" } =
        action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ ...product, qty, selectedSize, selectedColor });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQty: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty = Math.max(1, Math.min(10, action.payload.qty));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.couponCode = "";
      state.couponDiscount = 0;
    },

    applyCoupon: (state, action: PayloadAction<string>) => {
      const code = action.payload.toUpperCase().trim();
      if (VALID_COUPONS[code]) {
        state.couponCode = code;
        state.couponDiscount = VALID_COUPONS[code];
      }
    },

    removeCoupon: (state) => {
      state.couponCode = "";
      state.couponDiscount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((s, i) => s + i.qty, 0);
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((s, i) => s + i.price * i.qty, 0);
export const selectCartDiscount = (state: { cart: CartState }) =>
  state.cart.items.reduce((s, i) => s + (i.old - i.price) * i.qty, 0);
export const selectCouponDiscount = (state: { cart: CartState }) =>
  state.cart.couponDiscount;
export const selectCouponCode = (state: { cart: CartState }) =>
  state.cart.couponCode;
export const selectCartTotal = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state);
  const couponPct = state.cart.couponDiscount;
  const afterCoupon = subtotal - (subtotal * couponPct) / 100;
  const tax = Math.round(afterCoupon * 0.18);
  return afterCoupon + tax;
};

export default cartSlice.reducer;
