import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
}

const STATIC_USERS = [
  { email: "admin@admin.com", password: "123123", name: "Admin User", role: "Admin" },
  { email: "user@luxe.com",   password: "user123", name: "Demo User",  role: "Customer" },
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const match = STATIC_USERS.find(
        (u) => u.email === action.payload.email && u.password === action.payload.password
      );
      if (match) {
        state.user = { email: match.email, name: match.name, role: match.role };
        state.isAuthenticated = true;
        state.error = "";
      } else {
        state.error = "Invalid email or password";
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = "";
    },
    clearError(state) {
      state.error = "";
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;

export const selectAuth        = (s: { auth: AuthState }) => s.auth;
export const selectUser        = (s: { auth: AuthState }) => s.auth.user;
export const selectIsLoggedIn  = (s: { auth: AuthState }) => s.auth.isAuthenticated;

export default authSlice.reducer;
