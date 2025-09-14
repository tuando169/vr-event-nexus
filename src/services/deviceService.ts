// src/services/deviceService.ts
import { apiClient } from "@/lib/api";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { Device } from "@/types/api"; // bạn nên tách type Device ra file riêng

export const deviceService = {
  // Lấy danh sách thiết bị (có phân trang)
  async getDevices(): Promise<PaginatedResponse<Device>> {
    // const res = await apiClient.get<PaginatedResponse<Device>>(
    //   `/api/v1/device?page=1&size=1000`
    // );
    // return res.data;
    const fakeDevices: Device[] = [
      {
        _id: "dev001",
        name: "Oculus Quest 2 #001",
        is_active: true,
        streaming_event: "event001",
        activity: "Đang xem video A",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "dev002",
        name: "HTC Vive Pro #002",
        is_active: true,
        streaming_event: "event001",
        activity: "Đang ở menu",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "dev003",
        name: "Pico 4 #003",
        is_active: false,
        streaming_event: "",
        activity: "Ngắt kết nối",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return Promise.resolve({
      success: true,
      message: "Fake data",
      data: fakeDevices,
      pagination: {
        total: fakeDevices.length,
        size: "10",
        page: "1",
      },
    });
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
