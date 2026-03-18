import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import wishlistReducer from "./slices/wishlistSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "luxe-root",
  storage,
  whitelist: ["cart", "auth", "wishlist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"] },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
