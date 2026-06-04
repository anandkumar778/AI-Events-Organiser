import { create } from "zustand";

interface BookingState {
  bookings: any[];

  setBookings: (
    bookings: any[]
  ) => void;
}

export const useBookingStore =
  create<BookingState>((set) => ({
    bookings: [],

    setBookings: (
      bookings
    ) =>
      set({
        bookings,
      }),
  }));