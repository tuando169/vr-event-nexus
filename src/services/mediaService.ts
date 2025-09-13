import { apiClient } from '@/lib/api';
import { MediaFile, ApiResponse, PaginatedResponse } from '@/types/api';

export const mediaService = {
  // Get all media files
  async getMediaFiles(page = 1): Promise<PaginatedResponse<MediaFile>> {
    const response = await apiClient.get<PaginatedResponse<MediaFile>>(`/api/v1/mediafile?page=${page}`);
    return response.data;
  },

  // Upload media file
  async uploadFile(file: File, folder: string = 'image', createdBy: string, scale?: string): Promise<ApiResponse<MediaFile>> {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('folder', folder);
    formData.append('created_by', createdBy);
    if (scale) {
      formData.append('scale', scale);
    }

    const response = await apiClient.post<ApiResponse<MediaFile>>('/api/v1/mediafile/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete media file
  async deleteFile(id: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/v1/mediafile/delete/${id}`);
    return response.data;
  }
};