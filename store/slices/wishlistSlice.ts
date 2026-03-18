import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: number[];
}

const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<number>) {
      const idx = state.ids.indexOf(action.payload);
      if (idx >= 0) state.ids.splice(idx, 1);
      else state.ids.push(action.payload);
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistIds  = (s: { wishlist: WishlistState }) => s.wishlist.ids;
export const selectIsWishlisted = (id: number) => (s: { wishlist: WishlistState }) =>
  s.wishlist.ids.includes(id);

export default wishlistSlice.reducer;
