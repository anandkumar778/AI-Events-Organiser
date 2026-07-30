import api from "./api";

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

export interface Event extends CreateEventData {
  [x: string]: string;
  id: string;
  organizer?: {
    id: string;
    name: string;
    email: string;
  };
  registered?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventsResponse {
  success: boolean;
  data: Event[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface EventResponse {
  success: boolean;
  data: Event;
  message?: string;
}

class EventService {
  // Get all events
  async getEvents(query?: {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    sortBy?: string;
  }): Promise<EventsResponse> {
    try {
      const response = await api.get<EventsResponse>("/events", { params: query });
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to fetch events");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Get single event
  async getEvent(id: string): Promise<EventResponse> {
    try {
      const response = await api.get<EventResponse>(`/events/${id}`);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to fetch event");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Create event
  async createEvent(data: CreateEventData): Promise<EventResponse> {
    try {
      const response = await api.post<EventResponse>("/events", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to create event");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Update event
  async updateEvent(id: string, data: Partial<CreateEventData>): Promise<EventResponse> {
    try {
      const response = await api.put<EventResponse>(`/events/${id}`, data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to update event");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Delete event
  async deleteEvent(id: string): Promise<EventResponse> {
    try {
      const response = await api.delete<EventResponse>(`/events/${id}`);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to delete event");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Get user's events
  async getMyEvents(): Promise<EventsResponse> {
    try {
      const response = await api.get<EventsResponse>("/events/my-events");
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to fetch your events");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Search events
  async searchEvents(query: string): Promise<EventsResponse> {
    try {
      const response = await api.get<EventsResponse>("/events/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to search events");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Get events by location
  async getEventsByLocation(location: string): Promise<EventsResponse> {
    try {
      const response = await api.get<EventsResponse>("/events/location/" + location);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to fetch events");
      (err as any).status = error.response?.status;
      throw err;
    }
  }
}

export default new EventService();
