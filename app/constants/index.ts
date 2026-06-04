/**
 * Application-wide constants
 */

// ========== API Configuration ==========
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = 10000; // 10 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// ========== Authentication Constants ==========
export const AUTH_TOKEN_KEY = 'authToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
export const AUTH_USER_KEY = 'currentUser';
export const AUTH_SESSION_KEY = 'userSession';
export const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
export const REFRESH_TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

// ========== Password Requirements ==========
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PASSWORD_REQUIREMENTS = [
  'At least 8 characters',
  'One uppercase letter',
  'One lowercase letter',
  'One number',
  'One special character (@, $, !, %, *, ?, &)',
];

// ========== Phone Number ==========
export const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
export const PHONE_MIN_LENGTH = 10;
export const PHONE_MAX_LENGTH = 15;

// ========== Email ==========
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ========== Event Categories ==========
export const EVENT_CATEGORIES = [
  'conference',
  'workshop',
  'seminar',
  'concert',
  'festival',
  'sports',
  'networking',
  'webinar',
  'charity',
  'entertainment',
  'education',
  'business',
  'social',
  'health',
  'other',
] as const;

export const EVENT_CATEGORY_LABELS: Record<string, string> = {
  conference: 'Conference',
  workshop: 'Workshop',
  seminar: 'Seminar',
  concert: 'Concert',
  festival: 'Festival',
  sports: 'Sports',
  networking: 'Networking',
  webinar: 'Webinar',
  charity: 'Charity Event',
  entertainment: 'Entertainment',
  education: 'Education',
  business: 'Business',
  social: 'Social Event',
  health: 'Health & Wellness',
  other: 'Other',
};

export const EVENT_CATEGORY_COLORS: Record<string, string> = {
  conference: 'bg-blue-100 text-blue-800',
  workshop: 'bg-green-100 text-green-800',
  seminar: 'bg-purple-100 text-purple-800',
  concert: 'bg-pink-100 text-pink-800',
  festival: 'bg-yellow-100 text-yellow-800',
  sports: 'bg-red-100 text-red-800',
  networking: 'bg-indigo-100 text-indigo-800',
  webinar: 'bg-cyan-100 text-cyan-800',
  charity: 'bg-orange-100 text-orange-800',
  entertainment: 'bg-fuchsia-100 text-fuchsia-800',
  education: 'bg-lime-100 text-lime-800',
  business: 'bg-slate-100 text-slate-800',
  social: 'bg-rose-100 text-rose-800',
  health: 'bg-teal-100 text-teal-800',
  other: 'bg-gray-100 text-gray-800',
};

// ========== Event Status ==========
export const EVENT_STATUSES = ['draft', 'published', 'upcoming', 'ongoing', 'completed', 'cancelled'] as const;

export const EVENT_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const EVENT_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  published: 'bg-blue-100 text-blue-800',
  upcoming: 'bg-yellow-100 text-yellow-800',
  ongoing: 'bg-green-100 text-green-800',
  completed: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800',
};

// ========== Booking Status ==========
export const BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'] as const;

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
  'no-show': 'No Show',
};

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  'no-show': 'bg-gray-100 text-gray-800',
};

// ========== Payment Status ==========
export const PAYMENT_STATUSES = ['pending', 'completed', 'failed', 'refunded', 'partially-refunded'] as const;

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
  'partially-refunded': 'Partially Refunded',
};

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-blue-100 text-blue-800',
  'partially-refunded': 'bg-orange-100 text-orange-800',
};

// ========== Payment Methods ==========
export const PAYMENT_METHODS = ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wallet', 'upi'] as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  credit_card: 'Credit Card',
  debit_card: 'Debit Card',
  paypal: 'PayPal',
  bank_transfer: 'Bank Transfer',
  wallet: 'Digital Wallet',
  upi: 'UPI',
};

export const PAYMENT_METHOD_ICONS: Record<string, string> = {
  credit_card: '💳',
  debit_card: '💳',
  paypal: '🅿️',
  bank_transfer: '🏦',
  wallet: '👛',
  upi: '📱',
};

// ========== User Roles ==========
export const USER_ROLES = ['user', 'organizer', 'admin'] as const;

export const USER_ROLE_LABELS: Record<string, string> = {
  user: 'User',
  organizer: 'Organizer',
  admin: 'Administrator',
};

// ========== Organization Types ==========
export const ORGANIZATION_TYPES = ['individual', 'startup', 'company', 'ngo', 'other'] as const;

export const ORGANIZATION_TYPE_LABELS: Record<string, string> = {
  individual: 'Individual',
  startup: 'Startup',
  company: 'Company',
  ngo: 'Non-Profit Organization',
  other: 'Other',
};

// ========== Notification Types ==========
export const NOTIFICATION_TYPES = [
  'confirmation',
  'reminder',
  'cancellation',
  'refund',
  'check-in',
  'feedback',
  'receipt',
] as const;

export const NOTIFICATION_TYPE_LABELS: Record<string, string> = {
  confirmation: 'Booking Confirmation',
  reminder: 'Event Reminder',
  cancellation: 'Booking Cancelled',
  refund: 'Refund Processed',
  'check-in': 'Check-in Available',
  feedback: 'Feedback Request',
  receipt: 'Invoice/Receipt',
};

// ========== Discount Types ==========
export const DISCOUNT_TYPES = ['percentage', 'fixed'] as const;

export const DISCOUNT_TYPE_LABELS: Record<string, string> = {
  percentage: 'Percentage (%)',
  fixed: 'Fixed Amount',
};

// ========== Ticket Types ==========
export const TICKET_PERKS_EXAMPLES = [
  'VIP Seating',
  'Free Parking',
  'Complimentary Meal',
  'T-shirt',
  'Merchandise',
  'Early Access',
  'Networking Session',
  'Certificate',
  'Video Access',
  'Digital Materials',
];

// ========== Severity Levels ==========
export const SEVERITY_LEVELS = ['low', 'medium', 'high'] as const;

export const SEVERITY_LEVEL_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const SEVERITY_LEVEL_COLORS: Record<string, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

// ========== Report Statuses ==========
export const REPORT_STATUSES = ['open', 'in-progress', 'resolved'] as const;

export const REPORT_STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
};

export const REPORT_STATUS_COLORS: Record<string, string> = {
  open: 'bg-red-100 text-red-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
};

// ========== Refund Status ==========
export const REFUND_STATUSES = ['pending', 'approved', 'rejected', 'completed'] as const;

export const REFUND_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  completed: 'Completed',
};

export const REFUND_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

// ========== Transfer Statuses ==========
export const TRANSFER_STATUSES = ['pending', 'accepted', 'rejected'] as const;

export const TRANSFER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

// ========== Check-in Statuses ==========
export const CHECKIN_STATUSES = ['pending', 'checked-in', 'no-show'] as const;

export const CHECKIN_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  'checked-in': 'Checked In',
  'no-show': 'No Show',
};

export const CHECKIN_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-800',
  'checked-in': 'bg-green-100 text-green-800',
  'no-show': 'bg-red-100 text-red-800',
};

// ========== Sort Options ==========
export const SORT_OPTIONS = {
  events: {
    date: 'Event Date',
    price: 'Price',
    popularity: 'Popularity',
    rating: 'Rating',
  },
  bookings: {
    date: 'Booking Date',
    price: 'Price',
    status: 'Status',
  },
};

export const SORT_ORDERS = ['asc', 'desc'] as const;

// ========== Pagination ==========
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
export const MAX_PAGE_SIZE = 100;

// ========== File Upload ==========
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'text/plain'];

// ========== Time Format ==========
export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DISPLAY_DATE_FORMAT = 'MMM DD, YYYY';
export const DISPLAY_DATETIME_FORMAT = 'MMM DD, YYYY HH:mm';

// ========== Currency ==========
export const DEFAULT_CURRENCY = 'USD';
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY'] as const;

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  JPY: '¥',
};

// ========== Locale ==========
export const DEFAULT_LOCALE = 'en-US';
export const SUPPORTED_LOCALES = ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'ja-JP', 'zh-CN'] as const;

// ========== Theme ==========
export const THEME_OPTIONS = ['light', 'dark', 'auto'] as const;
export const DEFAULT_THEME = 'light';

// ========== Rating ==========
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

// ========== Event Limits ==========
export const MIN_EVENT_CAPACITY = 1;
export const MAX_EVENT_CAPACITY = 1000000;
export const MIN_EVENT_PRICE = 0;
export const MAX_EVENT_PRICE = 999999.99;

// ========== Booking Limits ==========
export const MIN_TICKETS_PER_BOOKING = 1;
export const MAX_TICKETS_PER_BOOKING = 10;
export const MIN_GROUP_BOOKING_SIZE = 10;
export const MAX_GROUP_BOOKING_SIZE = 500;

// ========== Promo Code ==========
export const MIN_PROMO_CODE_LENGTH = 3;
export const MAX_PROMO_CODE_LENGTH = 20;
export const MIN_PROMO_USES = 1;
export const MAX_PROMO_USES = 1000;

// ========== Search ==========
export const SEARCH_DEBOUNCE_DELAY = 500; // milliseconds
export const MIN_SEARCH_LENGTH = 2;
export const MAX_SEARCH_LENGTH = 100;
export const DEFAULT_SEARCH_LIMIT = 20;

// ========== URLs and Routes ==========
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  events: '/events',
  eventDetail: (id: string) => `/events/${id}`,
  createEvent: '/events/create',
  bookings: '/bookings',
  bookingDetail: (id: string) => `/bookings/${id}`,
  profile: '/profile',
  profileEdit: '/profile/edit',
  settings: '/settings',
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  notFound: '/404',
  unauthorized: '/401',
  error: '/error',
};

// ========== API Endpoints ==========
export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    getCurrentUser: '/auth/me',
    updateProfile: '/auth/profile',
    changePassword: '/auth/change-password',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  // Events
  events: {
    list: '/events',
    detail: (id: string) => `/events/${id}`,
    create: '/events',
    update: (id: string) => `/events/${id}`,
    delete: (id: string) => `/events/${id}`,
    myEvents: '/events/my-events',
    search: '/events/search',
    byLocation: (location: string) => `/events/location/${location}`,
  },
  // Bookings
  bookings: {
    list: '/bookings',
    detail: (id: string) => `/bookings/${id}`,
    create: '/bookings',
    update: (id: string) => `/bookings/${id}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    myBookings: '/bookings/my-bookings',
    byStatus: '/bookings/status',
    payment: (id: string) => `/bookings/${id}/payment`,
    ticket: (id: string) => `/bookings/${id}/ticket`,
    stats: '/bookings/stats',
  },
  // AI
  ai: {
    generateTitle: '/ai/generate-title',
    generateDescription: '/ai/generate-description',
    planBudget: '/ai/plan-budget',
    planSchedule: '/ai/plan-schedule',
    generate: '/ai/generate',
    history: '/ai/history',
    clearHistory: '/ai/history/clear',
  },
};

// ========== Error Messages ==========
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'An error occurred on the server',
  NETWORK_ERROR: 'Network connection error',
  VALIDATION_ERROR: 'Please check your input',
  UNKNOWN_ERROR: 'An unexpected error occurred',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  WEAK_PASSWORD: 'Password does not meet requirements',
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  EMAIL_NOT_VERIFIED: 'Please verify your email first',
  PHONE_NOT_VERIFIED: 'Please verify your phone number first',
  BOOKING_NOT_AVAILABLE: 'Sorry, this booking is not available',
  EVENT_FULL: 'This event is full. No more tickets available.',
  INVALID_PROMO_CODE: 'Invalid or expired promo code',
  REFUND_NOT_ALLOWED: 'Refund is not allowed for this booking',
};

// ========== Success Messages ==========
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  REGISTER_SUCCESS: 'Account created successfully. Please verify your email.',
  PASSWORD_CHANGED: 'Password changed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  EVENT_CREATED: 'Event created successfully',
  EVENT_UPDATED: 'Event updated successfully',
  EVENT_DELETED: 'Event deleted successfully',
  BOOKING_CREATED: 'Booking confirmed successfully',
  BOOKING_UPDATED: 'Booking updated successfully',
  BOOKING_CANCELLED: 'Booking cancelled successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully',
  REFUND_INITIATED: 'Refund initiated successfully',
};

// ========== Validation Messages ==========
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  MIN_LENGTH: (length: number) => `Must be at least ${length} characters`,
  MAX_LENGTH: (length: number) => `Must be less than ${length} characters`,
  PASSWORD_STRENGTH: 'Password must contain uppercase, lowercase, number and special character',
  PASSWORDS_MATCH: 'Passwords must match',
  FUTURE_DATE: 'Date must be in the future',
  VALID_DATE: 'Please enter a valid date',
  POSITIVE_NUMBER: 'Must be a positive number',
  VALID_URL: 'Please enter a valid URL',
};

// ========== Toast Duration ==========
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
};

// ========== Debounce Delays ==========
export const DEBOUNCE_DELAY = {
  SEARCH: 500,
  FORM: 300,
  RESIZE: 200,
};

// ========== Cache Duration ==========
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
};

// ========== Social Media Links ==========
export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/aieventsorganiser',
  twitter: 'https://twitter.com/aieventsorganiser',
  instagram: 'https://instagram.com/aieventsorganiser',
  linkedin: 'https://linkedin.com/company/aieventsorganiser',
  youtube: 'https://youtube.com/@aieventsorganiser',
};

// ========== Support ==========
export const SUPPORT_EMAIL = 'support@aieventsorganiser.com';
export const SUPPORT_PHONE = '+1-800-EVENTS-1';
export const SUPPORT_WEBSITE = 'https://support.aieventsorganiser.com';

// ========== Legal ==========
export const PRIVACY_POLICY_URL = '/privacy';
export const TERMS_URL = '/terms';
export const CONTACT_US_URL = '/contact';
