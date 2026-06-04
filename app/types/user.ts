/**
 * User type definitions
 */

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: string;
  role: 'user' | 'organizer' | 'admin';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  dateOfBirth?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  preferences?: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  language: string;
  timezone: string;
  theme: 'light' | 'dark';
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  fullName: string;
  phone: string;
  confirmPassword: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  profileImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  dateOfBirth?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserSession {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  expiresAt?: string;
}

export interface UserStats {
  totalEvents: number;
  totalBookings: number;
  totalSpent: number;
  attendedEvents: number;
  upcomingEvents: number;
  savedEvents: number;
}

export interface UserNotification {
  id: string;
  userId: string;
  type: 'event' | 'booking' | 'payment' | 'reminder' | 'message';
  title: string;
  message: string;
  icon?: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface VerificationCode {
  email: string;
  code: string;
  type: 'email' | 'phone' | 'password-reset';
  expiresAt: string;
}

export interface UserRole {
  id: string;
  name: 'user' | 'organizer' | 'admin';
  permissions: string[];
}

export interface UserReview {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPaymentMethod {
  id: string;
  userId: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
  isDefault: boolean;
  lastDigits?: string;
  expiryDate?: string;
  createdAt: string;
}

export interface UserRefund {
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
}
