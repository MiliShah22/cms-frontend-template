'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    register: (name: string, email: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string): boolean => {
        // Simulate login - replace with actual API call
        if (email && password) {
            setUser({
                id: '1',
                email,
                name: email.split('@')[0],
            });
            return true;
        }
        return false;
    };

    const register = (name: string, email: string, password: string): boolean => {
        // Simulate registration - replace with actual API call
        if (name && email && password) {
            setUser({
                id: '1',
                email,
                name,
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

