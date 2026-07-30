"use client";

import React, { createContext, useEffect, useState, useCallback } from 'react';
import authService, { User as AuthUser } from '../services/authService';

export interface User extends AuthUser {
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, role?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore parse error
        }
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });

      if (data.success && data.token) {
        const { token: newToken, user: newUser } = data;
        setToken(newToken);
        if (newUser) {
          const authUser: User = { ...newUser };
          setUser(authUser);
          localStorage.setItem("authUser", JSON.stringify(authUser));
        }
        return { success: true };
      }
      return { success: false, message: data.message || "Login failed" };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, message: error.message || "Network error. Please try again." };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role = "user") => {
    try {
      const data = await authService.register({ fullName: name, phone: "", email, password });

      if (data.success && data.token) {
        const { token: newToken, user: newUser } = data;
        setToken(newToken);
        if (newUser) {
           const authUser: User = { ...newUser };
           setUser(authUser);
           localStorage.setItem("authUser", JSON.stringify(authUser));
        }
        return { success: true };
      }
      return { success: false, message: data.message || "Registration failed" };
    } catch (error: any) {
      console.error('Register error:', error);
      return { success: false, message: error.message || "Network error. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    authService.logout();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoggedIn: !!token,
      loading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;