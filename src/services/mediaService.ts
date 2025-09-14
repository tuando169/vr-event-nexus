import { apiClient } from "@/lib/api";
import { MediaFile, ApiResponse, PaginatedResponse } from "@/types/api";

export const mediaService = {
  // Get all media files
  async getMediaFiles(): Promise<PaginatedResponse<MediaFile>> {
    const response = await apiClient.get<PaginatedResponse<MediaFile>>(
      `/api/v1/mediafile?page=1&size=1000`
    );
    return response.data;
  },

  // Upload media file
  async uploadFile(
    file: File,
    folder: string = "image",
    createdBy?: string
  ): Promise<{
    code: number;
    message: string;
    files: MediaFile[];
  }> {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("folder", folder);
    if (createdBy) formData.append("createdBy", createdBy);

    const response = await apiClient.post(
      "/api/v1/mediafile/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Delete media file
  async deleteFile(id: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/api/v1/mediafile/delete/${id}`
    );
    return response.data;
  },
};
