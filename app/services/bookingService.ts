import api from "./api";

export interface CreateBookingData {
  eventId: string;
  ticketCount: number;
  attendeeInfo?: {
    name: string;
    email: string;
    phone: string;
  }[];
}

export interface UpdateBookingData {
  ticketCount?: number;
  status?: "Confirmed" | "Pending" | "Cancelled";
}

export interface Booking extends CreateBookingData {
  id: string;
  userId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  bookingDate: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  totalPrice: number;
  bookingReference: string;
  paymentStatus?: "Pending" | "Paid" | "Failed";
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingsResponse {
  success: boolean;
  data: Booking[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface BookingResponse {
  success: boolean;
  data: Booking;
  message?: string;
}

export interface PaymentResponse {
  success: boolean;
  data: {
    paymentId: string;
    status: string;
    amount: number;
    timestamp: string;
  };
  message?: string;
}

class BookingService {
  // Get all bookings
  async getBookings(query?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<BookingsResponse> {
    try {
      const response = await api.get<BookingsResponse>("/bookings", { params: query });
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch bookings",
        status: error.response?.status,
      };
    }
  }

  // Get single booking
  async getBooking(id: string): Promise<BookingResponse> {
    try {
      const response = await api.get<BookingResponse>(`/bookings/${id}`);
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch booking",
        status: error.response?.status,
      };
    }
  }

  // Create booking
  async createBooking(data: CreateBookingData): Promise<BookingResponse> {
    try {
      const response = await api.post<BookingResponse>("/bookings", data);
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to create booking",
        status: error.response?.status,
      };
    }
  }

  // Update booking
  async updateBooking(id: string, data: UpdateBookingData): Promise<BookingResponse> {
    try {
      const response = await api.put<BookingResponse>(`/bookings/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to update booking",
        status: error.response?.status,
      };
    }
  }

  // Cancel booking
  async cancelBooking(id: string, reason?: string): Promise<BookingResponse> {
    try {
      const response = await api.post<BookingResponse>(`/bookings/${id}/cancel`, {
        reason,
      });
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to cancel booking",
        status: error.response?.status,
      };
    }
  }

  // Get user's bookings
  async getMyBookings(): Promise<BookingsResponse> {
    try {
      const response = await api.get<BookingsResponse>("/bookings/my-bookings");
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch your bookings",
        status: error.response?.status,
      };
    }
  }

  // Get bookings by status
  async getBookingsByStatus(status: string): Promise<BookingsResponse> {
    try {
      const response = await api.get<BookingsResponse>("/bookings", {
        params: { status },
      });
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch bookings",
        status: error.response?.status,
      };
    }
  }

  // Process payment
  async processPayment(bookingId: string, paymentData: {
    method: "card" | "upi" | "bank" | "wallet";
    amount: number;
  }): Promise<PaymentResponse> {
    try {
      const response = await api.post<PaymentResponse>(
        `/bookings/${bookingId}/payment`,
        paymentData
      );
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Payment processing failed",
        status: error.response?.status,
      };
    }
  }

  // Download ticket
  async downloadTicket(bookingId: string): Promise<Blob> {
    try {
      const response = await api.get(`/bookings/${bookingId}/ticket`, {
        responseType: "blob",
      });
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to download ticket",
        status: error.response?.status,
      };
    }
  }

  // Get booking stats
  async getBookingStats(): Promise<any> {
    try {
      const response = await api.get("/bookings/stats");
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || "Failed to fetch stats",
        status: error.response?.status,
      };
    }
  }
}

export default new BookingService();
