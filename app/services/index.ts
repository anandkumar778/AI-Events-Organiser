// Export all services
export { default as authService } from "./authService";
export { default as eventService } from "./eventService";
export { default as bookingService } from "./bookingService";
export { default as aiService } from "./aiService";
export { default as api } from "./api";

// Export types
export type { LoginData, RegisterData, AuthResponse, User } from "./authService";
export type {
  CreateEventData,
  UpdateEventData,
  Event,
  EventsResponse,
  EventResponse,
} from "./eventService";
export type {
  CreateBookingData,
  UpdateBookingData,
  Booking,
  BookingsResponse,
  BookingResponse,
  PaymentResponse,
} from "./bookingService";
export { default as paymentService } from "./paymentService";
export type {
  AIGenerateRequest,
  AIGenerateResponse,
  TitleGeneratorRequest,
  DescriptionGeneratorRequest,
  BudgetPlannerRequest,
  BudgetPlannerResponse,
  SchedulePlannerRequest,
  SchedulePlannerResponse,
} from "./aiService";
