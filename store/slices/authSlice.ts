import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

// Mutable in-memory user store (simulates a DB)
export const USERS_DB: Array<{ email:string; password:string; name:string; role:string; phone?:string; address?:string }> = [
  { email:"admin@admin.com", password:"123123", name:"Admin User", role:"Admin",    phone:"+91 98765 43210", address:"Ahmedabad, Gujarat" },
  { email:"user@luxe.com",   password:"user123", name:"Demo User",  role:"Customer", phone:"+91 91234 56789", address:"Mumbai, Maharashtra" },
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: "",
  registerError: "",
  registerSuccess: false,
  passwordChangeError: "",
  passwordChangeSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email:string; password:string }>) {
      const match = USERS_DB.find(u => u.email === action.payload.email && u.password === action.payload.password);
      if (match) {
        state.user = { email:match.email, name:match.name, role:match.role, phone:match.phone, address:match.address };
        state.isAuthenticated = true;
        state.error = "";
      } else {
        state.error = "Invalid email or password";
      }
    },
    register(state, action: PayloadAction<{ name:string; email:string; password:string; phone?:string }>) {
      const exists = USERS_DB.find(u => u.email === action.payload.email);
      if (exists) {
        state.registerError = "An account with this email already exists";
        state.registerSuccess = false;
      } else {
        USERS_DB.push({ ...action.payload, role:"Customer" });
        state.registerError = "";
        state.registerSuccess = true;
        // auto-login after register
        state.user = { email:action.payload.email, name:action.payload.name, role:"Customer", phone:action.payload.phone };
        state.isAuthenticated = true;
      }
    },
    changePassword(state, action: PayloadAction<{ currentPassword:string; newPassword:string }>) {
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
    updateProfile(state, action: PayloadAction<{ name:string; phone?:string; address?:string }>) {
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
    clearError(state)    { state.error = ""; },
    clearRegisterError(state) { state.registerError = ""; state.registerSuccess = false; },
    clearPasswordStatus(state) { state.passwordChangeError = ""; state.passwordChangeSuccess = false; },
  },
});

export const { login, register, changePassword, updateProfile, logout, clearError, clearRegisterError, clearPasswordStatus } = authSlice.actions;

export const selectAuth    = (s: { auth:AuthState }) => s.auth;
export const selectUser    = (s: { auth:AuthState }) => s.auth.user;
export const selectIsLoggedIn = (s: { auth:AuthState }) => s.auth.isAuthenticated;

export default authSlice.reducer;
