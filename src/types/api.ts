// Auth types
export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Mediafile types
export interface MediaFile {
  _id: string;
  title: string;
  type: string;
  size: number;
  path: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
}

// Generic API response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    total: number;
    size: string;
    page: string;
  };
}

export interface Event {
  _id: string;
  intro: string;
  logo: string;
  title: string;
  video_list: string[];
  streaming: string;
  username: string;
  password: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  devices: string[];
}

export interface EventRequest {
  title: string;
  description?: string;
}
