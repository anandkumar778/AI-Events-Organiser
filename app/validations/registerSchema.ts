import { z } from 'zod';

/**
 * Register form validation schema
 */
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be less than 100 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address')
      .toLowerCase(),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
    agreeToPrivacy: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must agree to the privacy policy',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Email verification validation schema
 */
export const emailVerificationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  code: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 characters'),
});

export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;

/**
 * Phone verification validation schema
 */
export const phoneVerificationSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number'),
  code: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 characters'),
});

export type PhoneVerificationFormData = z.infer<typeof phoneVerificationSchema>;

/**
 * Organizer registration validation schema
 */
export const organizerRegistrationSchema = registerSchema.extend({
  organizationName: z
    .string()
    .min(1, 'Organization name is required')
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters'),
  organizationType: z.enum(['individual', 'startup', 'company', 'ngo', 'other'], {
    errorMap: () => ({ message: 'Please select a valid organization type' }),
  }),
  taxId: z
    .string()
    .min(1, 'Tax ID is required')
    .min(5, 'Tax ID must be at least 5 characters'),
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .min(1, 'Bio is required')
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be less than 500 characters'),
});

export type OrganizerRegistrationFormData = z.infer<typeof organizerRegistrationSchema>;

/**
 * Social login validation schema
 */
export const socialLoginSchema = z.object({
  provider: z.enum(['google', 'facebook', 'github', 'twitter'], {
    errorMap: () => ({ message: 'Invalid social provider' }),
  }),
  accessToken: z.string().min(1, 'Access token is required'),
  idToken: z.string().optional(),
});

export type SocialLoginFormData = z.infer<typeof socialLoginSchema>;

/**
 * Account recovery validation schema
 */
export const accountRecoverySchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  recoveryMethod: z.enum(['email', 'phone'], {
    errorMap: () => ({ message: 'Please select a valid recovery method' }),
  }),
});

export type AccountRecoveryFormData = z.infer<typeof accountRecoverySchema>;

/**
 * Two-factor authentication setup validation schema
 */
export const twoFactorSetupSchema = z.object({
  method: z.enum(['sms', 'email', 'authenticator'], {
    errorMap: () => ({ message: 'Please select a valid 2FA method' }),
  }),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number')
    .optional(),
  authenticatorSecret: z.string().optional(),
});

export type TwoFactorSetupFormData = z.infer<typeof twoFactorSetupSchema>;

/**
 * Two-factor authentication verification validation schema
 */
export const twoFactorVerificationSchema = z.object({
  code: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 characters'),
});

export type TwoFactorVerificationFormData = z.infer<typeof twoFactorVerificationSchema>;

/**
 * Resend verification code validation schema
 */
export const resendVerificationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  type: z.enum(['email', 'phone'], {
    errorMap: () => ({ message: 'Please select a valid verification type' }),
  }),
});

export type ResendVerificationFormData = z.infer<typeof resendVerificationSchema>;
