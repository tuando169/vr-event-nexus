// src/services/deviceService.ts
import { apiClient } from "@/lib/api";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { Device } from "@/types/api"; // bạn nên tách type Device ra file riêng

export const deviceService = {
  // Lấy danh sách thiết bị (có phân trang)
  async getDevices(): Promise<PaginatedResponse<Device>> {
    const res = await apiClient.get<PaginatedResponse<Device>>(
      `/api/v1/device?page=1&size=1000`
    );
    return res.data;
  },

  // Lấy chi tiết 1 thiết bị
  async getDeviceDetail(id: string): Promise<ApiResponse<Device>> {
    const res = await apiClient.get<ApiResponse<Device>>(
      `/api/v1/device/${id}`
    );
    return res.data;
  },

  // Tạo mới thiết bị
  async createDevice(payload: Partial<Device>): Promise<ApiResponse<Device>> {
    const res = await apiClient.post<ApiResponse<Device>>(
      `/api/v1/device`,
      payload
    );
    return res.data;
  },

  // Cập nhật thiết bị
  async updateDevice(
    id: string,
    payload: Partial<Device>
  ): Promise<ApiResponse<Device>> {
    const res = await apiClient.put<ApiResponse<Device>>(
      `/api/v1/device/${id}`,
      payload
    );
    return res.data;
  },

  // Xóa thiết bị
  async deleteDevice(id: string): Promise<ApiResponse<null>> {
    const res = await apiClient.delete<ApiResponse<null>>(
      `/api/v1/device/${id}`
    );
    return res.data;
  },
};
