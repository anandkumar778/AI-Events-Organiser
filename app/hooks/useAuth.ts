"use client";

import { useState, useCallback } from "react";
import { useAuthStore } from "@/app/features/auth/authStore";
import authService, {
  LoginData,
  RegisterData,
  User,
} from "@/app/services/authService";

interface UseAuthReturn {
  // State
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Methods
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(
    async (data: LoginData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.login(data);
        if (response.user) {
          setUser(response.user);
        }
      } catch (err: any) {
        setError(err.message || "Login failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.register(data);
        if (response.user) {
          setUser(response.user);
        }
      } catch (err: any) {
        setError(err.message || "Registration failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, [setUser]);

  const updateProfile = useCallback(
    async (data: Partial<User>) => {
      setIsLoading(true);
      setError(null);
      try {
        const updatedUser = await authService.updateProfile(data);
        setUser(updatedUser);
      } catch (err: any) {
        setError(err.message || "Failed to update profile");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser]
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.changePassword({
          currentPassword,
          newPassword,
        });
      } catch (err: any) {
        setError(err.message || "Failed to change password");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(email);
    } catch (err: any) {
      setError(err.message || "Failed to process request");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(
    async (token: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.resetPassword({ token, password });
      } catch (err: any) {
        setError(err.message || "Failed to reset password");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    user: user || null,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    clearError,
  };
};
