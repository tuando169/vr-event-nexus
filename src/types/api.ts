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

// Category types
export interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRequest {
  title: string;
  description?: string;
}

// Mediafile types
export interface MediaFile {
  _id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  folder: string;
  path: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

// Tour types
export interface Tour {
  _id: string;
  title: string;
  "sub-title": string;
  path: {
    main: string;
    image: string[];
    video: string[];
  };
  description: {
    vi: string;
    en: string;
    tw: string;
    ger: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TourRequest {
  title: string;
  "sub-title": string;
  path: {
    main: string;
    image: string[];
    video: string[];
  };
  description: {
    vi: string;
    en: string;
    tw: string;
    ger: string;
  };
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
  data: {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}