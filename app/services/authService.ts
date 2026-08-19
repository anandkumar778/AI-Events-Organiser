import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  location?: string;
  bio?: string;
  createdAt?: string;
}

class AuthService {
  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<{
        success: boolean;
        message: string;
        data?: { user?: User; token?: string; refreshToken?: string };
      }>("/auth/login", data);

      const payload = response.data.data || {};
      const authResponse: AuthResponse = {
        success: response.data.success,
        message: response.data.message,
        token: payload.token,
        refreshToken: payload.refreshToken,
        user: payload.user,
      };

      if (payload.token) {
        localStorage.setItem("authToken", payload.token);
      }
      if (payload.refreshToken) {
        localStorage.setItem("refreshToken", payload.refreshToken);
      }

      return authResponse;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Login failed");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Register user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<{
        success: boolean;
        message: string;
        data?: { user?: User; token?: string; refreshToken?: string };
      }>("/auth/register", data);

      const payload = response.data.data || {};
      const authResponse: AuthResponse = {
        success: response.data.success,
        message: response.data.message,
        token: payload.token,
        refreshToken: payload.refreshToken,
        user: payload.user,
      };

      if (payload.token) {
        localStorage.setItem("authToken", payload.token);
      }
      if (payload.refreshToken) {
        localStorage.setItem("refreshToken", payload.refreshToken);
      }

      return authResponse;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Registration failed");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authUser");
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>("/auth/me");
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to fetch user");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>("/auth/profile", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to update profile");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Change password
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/change-password", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to change password");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/forgot-password", { email });
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to process request");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Reset password
  async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/reset-password", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to reset password");
      (err as any).status = error.response?.status;
      throw err;
    }
  }
}

export default new AuthService();
