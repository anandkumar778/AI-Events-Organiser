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
      const response = await api.post<AuthResponse>("/auth/login", data);
      
      // Store token if provided
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Login failed",
        status: error.response?.status,
      };
    }
  }

  // Register user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", data);
      
      // Store token if provided
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Registration failed",
        status: error.response?.status,
      };
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>("/auth/me");
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch user",
        status: error.response?.status,
      };
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await api.put<User>("/auth/profile", data);
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to update profile",
        status: error.response?.status,
      };
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
      throw {
        message: error.response?.data?.message || "Failed to change password",
        status: error.response?.status,
      };
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/forgot-password", { email });
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to process request",
        status: error.response?.status,
      };
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
      throw {
        message: error.response?.data?.message || "Failed to reset password",
        status: error.response?.status,
      };
    }
  }
}

export default new AuthService();
