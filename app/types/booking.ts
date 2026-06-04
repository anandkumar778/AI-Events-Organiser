/**
 * Booking type definitions
 */

export interface Booking {
  id: string;
  bookingRef: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  ticketType: string;
  numberOfTickets: number;
  price: number;
  totalPrice: number;
  discountAmount?: number;
  finalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  bookedAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface BookingDetail extends Booking {
  user: BookingUser;
  event: BookingEvent;
  tickets: TicketInfo[];
  payment: PaymentInfo;
  attendees: AttendeeInfo[];
  checkInStatus?: BookingCheckInStatus;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'partially-refunded';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'wallet' | 'upi';

export interface BookingUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface BookingEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
}

export interface TicketInfo {
  ticketId: string;
  number: string;
  qrCode: string;
  status: 'active' | 'used' | 'cancelled';
  usedAt?: string;
}

export interface PaymentInfo {
  transactionId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  currency: string;
  receipt?: string;
}

export interface AttendeeInfo {
  attendeeId: string;
  fullName: string;
  email: string;
  phone: string;
  ticketNumber: string;
  checkInStatus: 'pending' | 'checked-in' | 'no-show';
}

export type BookingCheckInStatus = 'pending' | 'checked-in' | 'no-show';

export interface CreateBookingData {
  eventId: string;
  numberOfTickets: number;
  ticketType: string;
  attendeeDetails: AttendeeDetail[];
  promoCode?: string;
  paymentMethod: PaymentMethod;
}

export interface AttendeeDetail {
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingPaymentData {
  bookingId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  transactionId?: string;
  cardDetails?: CardDetails;
}

export interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface BookingFilter {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  eventId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'date' | 'price' | 'status';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface BookingPagination {
  bookings: Booking[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BookingStats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
}

export interface BookingHistory {
  bookingId: string;
  action: BookingAction;
  status: BookingStatus;
  changedAt: string;
  changedBy?: string;
  reason?: string;
}

export type BookingAction = 'created' | 'confirmed' | 'cancelled' | 'refunded' | 'completed' | 'modified';

export interface BookingCancellation {
  bookingId: string;
  reason: string;
  refundAmount: number;
  refundMethod: PaymentMethod;
  cancellationFee?: number;
  processedAt: string;
}

export interface BookingModification {
  bookingId: string;
  fieldModified: string;
  oldValue: any;
  newValue: any;
  modifiedAt: string;
  modifiedBy: string;
}

export interface BookingNotification {
  id: string;
  bookingId: string;
  userId: string;
  type: BookingNotificationType;
  title: string;
  message: string;
  sent: boolean;
  sentAt?: string;
}

export type BookingNotificationType =
  | 'confirmation'
  | 'reminder'
  | 'cancellation'
  | 'refund'
  | 'check-in'
  | 'feedback'
  | 'receipt';

export interface BookingRefund {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  reason: string;
  requestedAt: string;
  processedAt?: string;
  approvedBy?: string;
}

export interface BookingTransfer {
  id: string;
  fromBookingId: string;
  toUserId: string;
  toUserEmail: string;
  status: 'pending' | 'accepted' | 'rejected';
  transferredAt?: string;
  createdAt: string;
}

export interface BookingOccupancy {
  eventId: string;
  totalCapacity: number;
  bookedSeats: number;
  availableSeats: number;
  occupancyPercentage: number;
}

export interface BookingPromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  applicableEventIds?: string[];
}

export interface BookingInvoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paid: boolean;
  paidDate?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BookingFeedback {
  id: string;
  bookingId: string;
  userId: string;
  eventId: string;
  rating: number;
  comment: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface BookingReport {
  reportId: string;
  bookingId: string;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface GroupBooking {
  id: string;
  eventId: string;
  organizerId: string;
  name: string;
  numberOfPeople: number;
  totalPrice: number;
  discountApplied?: number;
  bookings: string[];
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
}
