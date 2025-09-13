import { apiClient } from '@/lib/api';
import { Tour, TourRequest, ApiResponse, PaginatedResponse } from '@/types/api';

export const tourService = {
  // Get all tours
  async getTours(page = 1, size = 4): Promise<PaginatedResponse<Tour>> {
    const response = await apiClient.get<PaginatedResponse<Tour>>(`/api/v1/tour?page=${page}&size=${size}`);
    return response.data;
  },

  // Create tour
  async createTour(tourData: TourRequest): Promise<ApiResponse<Tour>> {
    const response = await apiClient.post<ApiResponse<Tour>>('/api/v1/tour/create', tourData);
    return response.data;
  },

  // Get tour detail
  async getTourDetail(id: string): Promise<ApiResponse<Tour>> {
    const response = await apiClient.get<ApiResponse<Tour>>(`/api/v1/tour/detail/${id}`);
    return response.data;
  },

  // Update tour
  async updateTour(id: string, tourData: Partial<TourRequest>): Promise<ApiResponse<Tour>> {
    const response = await apiClient.patch<ApiResponse<Tour>>(`/api/v1/tour/edit/${id}`, tourData);
    return response.data;
  },

  // Delete tour
  async deleteTour(id: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/v1/tour/delete/${id}`);
    return response.data;
  }
};