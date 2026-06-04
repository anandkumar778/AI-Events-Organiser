import { useBookingStore } from "./bookingStore";

export const useBookings = () => {
  const {
    bookings,
    setBookings,
  } = useBookingStore();

  return {
    bookings,
    setBookings,
  };
};