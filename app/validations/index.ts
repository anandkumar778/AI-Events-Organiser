/**
 * Central export file for all validation schemas
 */

// Login schemas
export {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
  type LoginFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
  type ChangePasswordFormData,
  type UpdateProfileFormData,
} from './loginSchema';

// Register schemas
export {
  registerSchema,
  emailVerificationSchema,
  phoneVerificationSchema,
  organizerRegistrationSchema,
  socialLoginSchema,
  accountRecoverySchema,
  twoFactorSetupSchema,
  twoFactorVerificationSchema,
  resendVerificationSchema,
  type RegisterFormData,
  type EmailVerificationFormData,
  type PhoneVerificationFormData,
  type OrganizerRegistrationFormData,
  type SocialLoginFormData,
  type AccountRecoveryFormData,
  type TwoFactorSetupFormData,
  type TwoFactorVerificationFormData,
  type ResendVerificationFormData,
} from './registerSchema';

// Event schemas
export {
  createEventSchema,
  updateEventSchema,
  eventFilterSchema,
  eventSearchSchema,
  createEventTicketSchema,
  createPromoCodeSchema,
  eventReviewSchema,
  type CreateEventFormData,
  type UpdateEventFormData,
  type EventFilterFormData,
  type EventSearchFormData,
  type CreateEventTicketFormData,
  type CreatePromoCodeFormData,
  type EventReviewFormData,
} from './eventSchema';

// Booking schemas
export {
  createBookingSchema,
  paymentInfoSchema,
  bookingCancellationSchema,
  modifyBookingSchema,
  bookingRefundSchema,
  bookingTransferSchema,
  bookingFeedbackSchema,
  groupBookingSchema,
  bookingFilterSchema,
  bookingCheckInSchema,
  bookingReportSchema,
  type CreateBookingFormData,
  type PaymentInfoFormData,
  type BookingCancellationFormData,
  type ModifyBookingFormData,
  type BookingRefundFormData,
  type BookingTransferFormData,
  type BookingFeedbackFormData,
  type GroupBookingFormData,
  type BookingFilterFormData,
  type BookingCheckInFormData,
  type BookingReportFormData,
} from './bookingSchema';
