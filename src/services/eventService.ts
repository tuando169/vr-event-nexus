import { apiClient } from "@/lib/api";
import {
  ApiResponse,
  Event,
  EventRequest,
  PaginatedResponse,
} from "@/types/api";

export const eventService = {
  // Get all events
  async getEvent(page = 1, size = 10): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<PaginatedResponse<Event>>(
      `/api/v1/event?page=${page}&size=${size}`
    );
    return response.data;
  },

  // Create event
  async createEvent(data: EventRequest): Promise<ApiResponse<Event>> {
    const response = await apiClient.post<ApiResponse<Event>>(
      "/api/v1/event/create",
      data
    );
    return response.data;
  },

  // Get event detail
  async getEventDetail(id: string): Promise<ApiResponse<Event>> {
    const response = await apiClient.get<ApiResponse<Event>>(
      `/api/v1/event/detail/${id}`
    );
    return response.data;
  },

  // Update event
  async updateEvent(
    id: string,
    data: Partial<Event>
  ): Promise<ApiResponse<Event>> {
    const response = await apiClient.patch<ApiResponse<Event>>(
      `/api/v1/event/edit/${id}`,
      data
    );
    return response.data;
  },

  // Delete event
  async deleteEvent(id: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/api/v1/event/delete/${id}`
    );
    return response.data;
  },
};
