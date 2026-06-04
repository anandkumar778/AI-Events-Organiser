import { z } from 'zod';

/**
 * Booking creation validation schema
 */
export const createBookingSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  numberOfTickets: z
    .number()
    .min(1, 'Number of tickets must be at least 1')
    .max(10, 'Maximum 10 tickets per booking'),
  ticketType: z.string().min(1, 'Ticket type is required'),
  attendeeDetails: z
    .array(
      z.object({
        fullName: z
          .string()
          .min(1, 'Attendee name is required')
          .min(2, 'Name must be at least 2 characters')
          .max(100, 'Name must be less than 100 characters'),
        email: z
          .string()
          .min(1, 'Attendee email is required')
          .email('Please enter a valid email address')
          .toLowerCase(),
        phone: z
          .string()
          .min(1, 'Attendee phone is required')
          .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number'),
        specialRequests: z
          .string()
          .max(500, 'Special requests must be less than 500 characters')
          .optional(),
      })
    )
    .min(1, 'At least one attendee is required'),
  promoCode: z.string().max(20, 'Promo code must be less than 20 characters').optional(),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wallet', 'upi'], {
    errorMap: () => ({ message: 'Please select a valid payment method' }),
  }),
});

export type CreateBookingFormData = z.infer<typeof createBookingSchema>;

/**
 * Payment information validation schema
 */
export const paymentInfoSchema = z.object({
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wallet', 'upi'], {
    errorMap: () => ({ message: 'Please select a valid payment method' }),
  }),
  cardholderName: z
    .string()
    .min(1, 'Cardholder name is required')
    .min(3, 'Cardholder name must be at least 3 characters')
    .optional(),
  cardNumber: z
    .string()
    .min(13, 'Card number must be at least 13 digits')
    .max(19, 'Card number must be at most 19 digits')
    .regex(/^\d+$/, 'Card number must contain only digits')
    .optional(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .optional(),
  cvv: z
    .string()
    .length(3, 'CVV must be 3 digits')
    .regex(/^\d{3}$/, 'CVV must contain only digits')
    .optional(),
  billingAddress: z
    .string()
    .min(1, 'Billing address is required')
    .min(5, 'Billing address must be at least 5 characters')
    .optional(),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
    .optional(),
});

export type PaymentInfoFormData = z.infer<typeof paymentInfoSchema>;

/**
 * Booking cancellation validation schema
 */
export const bookingCancellationSchema = z.object({
  reason: z
    .string()
    .min(1, 'Cancellation reason is required')
    .min(10, 'Reason must be at least 10 characters')
    .max(500, 'Reason must be less than 500 characters'),
});

export type BookingCancellationFormData = z.infer<typeof bookingCancellationSchema>;

/**
 * Booking modification validation schema
 */
export const modifyBookingSchema = z.object({
  numberOfTickets: z
    .number()
    .min(1, 'Number of tickets must be at least 1')
    .max(10, 'Maximum 10 tickets per booking')
    .optional(),
  attendeeDetails: z
    .array(
      z.object({
        fullName: z
          .string()
          .min(1, 'Attendee name is required')
          .min(2, 'Name must be at least 2 characters'),
        email: z
          .string()
          .min(1, 'Email is required')
          .email('Please enter a valid email address'),
        phone: z
          .string()
          .min(1, 'Phone is required')
          .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number'),
        specialRequests: z.string().max(500, 'Special requests must be less than 500 characters').optional(),
      })
    )
    .optional(),
});

export type ModifyBookingFormData = z.infer<typeof modifyBookingSchema>;

/**
 * Booking refund validation schema
 */
export const bookingRefundSchema = z.object({
  reason: z
    .string()
    .min(1, 'Refund reason is required')
    .min(5, 'Reason must be at least 5 characters')
    .max(500, 'Reason must be less than 500 characters'),
  refundMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wallet', 'upi'], {
    errorMap: () => ({ message: 'Please select a valid refund method' }),
  }),
});

export type BookingRefundFormData = z.infer<typeof bookingRefundSchema>;

/**
 * Booking transfer validation schema
 */
export const bookingTransferSchema = z.object({
  toUserEmail: z
    .string()
    .min(1, 'Recipient email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  message: z
    .string()
    .max(500, 'Message must be less than 500 characters')
    .optional(),
});

export type BookingTransferFormData = z.infer<typeof bookingTransferSchema>;

/**
 * Booking feedback validation schema
 */
export const bookingFeedbackSchema = z.object({
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  comment: z
    .string()
    .min(1, 'Comment is required')
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must be less than 1000 characters'),
  isAnonymous: z.boolean().optional().default(false),
});

export type BookingFeedbackFormData = z.infer<typeof bookingFeedbackSchema>;

/**
 * Group booking validation schema
 */
export const groupBookingSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  name: z
    .string()
    .min(1, 'Group name is required')
    .min(3, 'Group name must be at least 3 characters')
    .max(100, 'Group name must be less than 100 characters'),
  numberOfPeople: z
    .number()
    .min(10, 'Minimum 10 people for group booking')
    .max(500, 'Maximum 500 people per group booking'),
  ticketType: z.string().min(1, 'Ticket type is required'),
  specialRequests: z
    .string()
    .max(1000, 'Special requests must be less than 1000 characters')
    .optional(),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wallet', 'upi'], {
    errorMap: () => ({ message: 'Please select a valid payment method' }),
  }),
});

export type GroupBookingFormData = z.infer<typeof groupBookingSchema>;

/**
 * Booking filter validation schema
 */
export const bookingFilterSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'no-show'], {
    errorMap: () => ({ message: 'Please select a valid booking status' }),
  }).optional(),
  paymentStatus: z.enum(['pending', 'completed', 'failed', 'refunded', 'partially-refunded'], {
    errorMap: () => ({ message: 'Please select a valid payment status' }),
  }).optional(),
  eventId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(['date', 'price', 'status'], {
    errorMap: () => ({ message: 'Please select a valid sort option' }),
  }).optional(),
  sortOrder: z.enum(['asc', 'desc'], {
    errorMap: () => ({ message: 'Please select ascending or descending' }),
  }).optional(),
  page: z.number().min(1, 'Page must be at least 1').optional(),
  limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').optional(),
});

export type BookingFilterFormData = z.infer<typeof bookingFilterSchema>;

/**
 * Booking check-in validation schema
 */
export const bookingCheckInSchema = z.object({
  ticketNumber: z
    .string()
    .min(1, 'Ticket number is required'),
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
});

export type BookingCheckInFormData = z.infer<typeof bookingCheckInSchema>;

/**
 * Booking report issue validation schema
 */
export const bookingReportSchema = z.object({
  issue: z
    .string()
    .min(1, 'Issue description is required')
    .min(10, 'Issue must be at least 10 characters')
    .max(1000, 'Issue must be less than 1000 characters'),
  severity: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select an issue severity level' }),
  }),
  attachments: z.array(z.string().url('Please provide valid image URLs')).optional(),
});

export type BookingReportFormData = z.infer<typeof bookingReportSchema>;
