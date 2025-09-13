import { apiClient } from '@/lib/api';
import { Category, CategoryRequest, ApiResponse, PaginatedResponse } from '@/types/api';

export const categoryService = {
  // Get all categories
  async getCategories(page = 1, size = 10): Promise<PaginatedResponse<Category>> {
    const response = await apiClient.get<PaginatedResponse<Category>>(`/api/v1/category?page=${page}&size=${size}`);
    return response.data;
  },

  // Create category
  async createCategory(categoryData: CategoryRequest): Promise<ApiResponse<Category>> {
    const response = await apiClient.post<ApiResponse<Category>>('/api/v1/category/create', categoryData);
    return response.data;
  },

  // Get category detail
  async getCategoryDetail(id: string): Promise<ApiResponse<Category>> {
    const response = await apiClient.get<ApiResponse<Category>>(`/api/v1/category/detail/${id}`);
    return response.data;
  },

  // Update category
  async updateCategory(id: string, categoryData: Partial<CategoryRequest>): Promise<ApiResponse<Category>> {
    const response = await apiClient.patch<ApiResponse<Category>>(`/api/v1/category/edit/${id}`, categoryData);
    return response.data;
  },

  // Delete category
  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/v1/category/delete/${id}`);
    return response.data;
  }
};