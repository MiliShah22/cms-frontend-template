import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
  registerError: string;
  registerSuccess: boolean;
  passwordChangeError: string;
  passwordChangeSuccess: boolean;
  isRegisterLoading: boolean;
}

// Mutable in-memory user store (simulates a DB)
export const USERS_DB: Array<{ email: string; password: string; name: string; role: string; phone?: string; address?: string }> = [
  { email: "admin@admin.com", password: "123123", name: "Admin User", role: "Admin", phone: "+91 98765 43210", address: "Ahmedabad, Gujarat" },
  { email: "user@luxe.com", password: "user123", name: "Demo User", role: "Customer", phone: "+91 91234 56789", address: "Mumbai, Maharashtra" },
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: "",
  registerError: "",
  registerSuccess: false,
  passwordChangeError: "",
  passwordChangeSuccess: false,
  isRegisterLoading: false,
};

// Async thunk for register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: { name: string; email: string; password: string; phone?: string }, { rejectWithValue }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const exists = USERS_DB.find(u => u.email === data.email);
    if (exists) {
      return rejectWithValue("An account with this email already exists");
    }

    USERS_DB.push({ ...data, role: "Customer" });
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const match = USERS_DB.find(u => u.email === action.payload.email && u.password === action.payload.password);
      if (match) {
        state.user = { email: match.email, name: match.name, role: match.role, phone: match.phone, address: match.address };
        state.isAuthenticated = true;
        state.error = "";
      } else {
        state.error = "Invalid email or password";
      }
    },
    // register moved to async thunk
    changePassword(state, action: PayloadAction<{ currentPassword: string; newPassword: string }>) {
      if (!state.user) return;
      const userRec = USERS_DB.find(u => u.email === state.user!.email);
      if (!userRec || userRec.password !== action.payload.currentPassword) {
        state.passwordChangeError = "Current password is incorrect";
        state.passwordChangeSuccess = false;
      } else {
        userRec.password = action.payload.newPassword;
        state.passwordChangeError = "";
        state.passwordChangeSuccess = true;
      }
    },
    updateProfile(state, action: PayloadAction<{ name: string; phone?: string; address?: string }>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        const rec = USERS_DB.find(u => u.email === state.user!.email);
        if (rec) { rec.name = action.payload.name; rec.phone = action.payload.phone; rec.address = action.payload.address; }
      }
    },
    logout(state) {
      state.user = null; state.isAuthenticated = false; state.error = "";
      state.registerSuccess = false; state.passwordChangeSuccess = false;
    },
    clearError(state) { state.error = ""; },
    clearRegisterError(state) { state.registerError = ""; state.registerSuccess = false; },
    clearPasswordStatus(state) { state.passwordChangeError = ""; state.passwordChangeSuccess = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegisterLoading = true;
        state.registerError = "";
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.registerError = "";
        state.registerSuccess = true;
        // auto-login
        state.user = { email: action.payload.email, name: action.payload.name, role: "Customer", phone: action.payload.phone };
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.registerError = action.payload as string;
        state.registerSuccess = false;
      });
  },
});

export const { login, changePassword, updateProfile, logout, clearError, clearRegisterError, clearPasswordStatus } = authSlice.actions;

export const selectAuth = (s: { auth: AuthState }) => s.auth;
export const selectUser = (s: { auth: AuthState }) => s.auth.user;
export const selectIsLoggedIn = (s: { auth: AuthState }) => s.auth.isAuthenticated;
export const selectIsRegisterLoading = (s: { auth: AuthState }) => s.auth.isRegisterLoading;

export default authSlice.reducer;

