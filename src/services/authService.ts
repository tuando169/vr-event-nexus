import { apiClient } from "@/lib/api";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
  ApiResponse,
  PaginatedResponse,
} from "@/types/api";

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/api/v1/auth/login",
      credentials
    );
    if (response.data.success) {
      localStorage.setItem("authToken", response.data.data.token);
    }
    return response.data;
  },

  // Signup
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/api/v1/auth/signup",
      userData
    );
    return response.data;
  },

  // Get current user
  async me(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>("/api/v1/auth/me");
    return response.data;
  },

  // List users (with pagination)
  async listUsers(page = 1, size = 10): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>(
      `/api/v1/auth?page=${page}&size=${size}`
    );
    return response.data;
  },

  // Logout
  logout(): void {
    localStorage.removeItem("authToken");
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  },

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem("authToken");
  },
};
