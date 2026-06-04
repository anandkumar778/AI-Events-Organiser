"use client";

import { useState, useCallback } from "react";
import bookingService, {
  Booking,
  CreateBookingData,
  UpdateBookingData,
  BookingsResponse,
} from "@/app/services/bookingService";

interface UseBookingsReturn {
  // State
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;

  // Methods
  getBookings: (query?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => Promise<void>;
  getBooking: (id: string) => Promise<void>;
  createBooking: (data: CreateBookingData) => Promise<Booking>;
  updateBooking: (id: string, data: UpdateBookingData) => Promise<void>;
  cancelBooking: (id: string, reason?: string) => Promise<void>;
  getMyBookings: () => Promise<void>;
  getBookingsByStatus: (status: string) => Promise<void>;
  processPayment: (bookingId: string, paymentData: {
    method: "card" | "upi" | "bank" | "wallet";
    amount: number;
  }) => Promise<void>;
  downloadTicket: (bookingId: string) => Promise<void>;
  getBookingStats: () => Promise<any>;
  clearError: () => void;
  setCurrentBooking: (booking: Booking | null) => void;
}

export const useBookings = (): UseBookingsReturn => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const clearError = useCallback(() => setError(null), []);

  const getBookings = useCallback(
    async (query?: {
      page?: number;
      limit?: number;
      status?: string;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response: BookingsResponse = await bookingService.getBookings(query);
        setBookings(response.data || []);
        setTotal(response.total || 0);
        setPage(response.page || 1);
      } catch (err: any) {
        setError(err.message || "Failed to fetch bookings");
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getBooking = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingService.getBooking(id);
      setCurrentBooking(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch booking");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = useCallback(
    async (data: CreateBookingData): Promise<Booking> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await bookingService.createBooking(data);
        setBookings([response.data, ...bookings]);
        setCurrentBooking(response.data);
        return response.data;
      } catch (err: any) {
        setError(err.message || "Failed to create booking");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [bookings]
  );

  const updateBooking = useCallback(
    async (id: string, data: UpdateBookingData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await bookingService.updateBooking(id, data);
        const updatedBookings = bookings.map((b) =>
          b.id === id ? response.data : b
        );
        setBookings(updatedBookings);
        setCurrentBooking(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to update booking");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [bookings]
  );

  const cancelBooking = useCallback(
    async (id: string, reason?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await bookingService.cancelBooking(id, reason);
        const updatedBookings = bookings.map((b) =>
          b.id === id ? response.data : b
        );
        setBookings(updatedBookings);
        if (currentBooking?.id === id) {
          setCurrentBooking(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to cancel booking");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [bookings, currentBooking]
  );

  const getMyBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: BookingsResponse = await bookingService.getMyBookings();
      setBookings(response.data || []);
      setTotal(response.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch your bookings");
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBookingsByStatus = useCallback(async (status: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: BookingsResponse = await bookingService.getBookingsByStatus(
        status
      );
      setBookings(response.data || []);
      setTotal(response.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processPayment = useCallback(
    async (bookingId: string, paymentData: {
      method: "card" | "upi" | "bank" | "wallet";
      amount: number;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        await bookingService.processPayment(bookingId, paymentData);
        // Refresh the booking after payment
        await getBooking(bookingId);
      } catch (err: any) {
        setError(err.message || "Payment processing failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [getBooking]
  );

  const downloadTicket = useCallback(async (bookingId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const blob = await bookingService.downloadTicket(bookingId);
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ticket-${bookingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Failed to download ticket");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBookingStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingService.getBookingStats();
      return response.data;
    } catch (err: any) {
      setError(err.message || "Failed to fetch stats");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    bookings,
    currentBooking,
    isLoading,
    error,
    total,
    page,
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    cancelBooking,
    getMyBookings,
    getBookingsByStatus,
    processPayment,
    downloadTicket,
    getBookingStats,
    clearError,
    setCurrentBooking,
  };
};
