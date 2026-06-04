/**
 * Event type definitions
 */

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  latitude?: number;
  longitude?: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  category: EventCategory;
  organizer: EventOrganizer;
  price: number;
  discountedPrice?: number;
  currency: string;
  capacity: number;
  availableSeats: number;
  status: EventStatus;
  isPublished: boolean;
  tags: string[];
  attendees: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventDetail extends Event {
  fullDescription: string;
  agenda?: EventAgendaItem[];
  speakers?: EventSpeaker[];
  sponsors?: EventSponsor[];
  highlights?: string[];
  faqs?: EventFAQ[];
  rules?: string[];
  refundPolicy?: string;
  cancellationPolicy?: string;
}

export type EventCategory =
  | 'conference'
  | 'workshop'
  | 'seminar'
  | 'concert'
  | 'festival'
  | 'sports'
  | 'networking'
  | 'webinar'
  | 'charity'
  | 'entertainment'
  | 'education'
  | 'business'
  | 'social'
  | 'health'
  | 'other';

export type EventStatus = 'draft' | 'published' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface EventOrganizer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: string;
  verified: boolean;
  rating: number;
  totalEvents: number;
}

export interface EventAgendaItem {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  speaker?: string;
  location?: string;
}

export interface EventSpeaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface EventSponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  type: 'gold' | 'silver' | 'bronze' | 'media';
}

export interface EventFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  image: string;
  location: string;
  latitude?: number;
  longitude?: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  category: EventCategory;
  price: number;
  discountedPrice?: number;
  currency: string;
  capacity: number;
  tags: string[];
  fullDescription?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  status?: EventStatus;
  isPublished?: boolean;
}

export interface EventFilter {
  category?: EventCategory;
  location?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  status?: EventStatus;
  sortBy?: 'date' | 'price' | 'popularity' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface EventSearch {
  query: string;
  category?: EventCategory;
  location?: string;
  radius?: number;
  upcomingOnly?: boolean;
}

export interface EventPagination {
  events: Event[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EventStats {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  averageRating: number;
  upcomingEvents: number;
  completedEvents: number;
  cancelledEvents: number;
}

export interface EventAnalytics {
  eventId: string;
  totalViews: number;
  totalBookings: number;
  totalRevenue: number;
  conversionRate: number;
  avgTimeOnPage: number;
  topReferrals: string[];
  dailyStats: DailyEventStat[];
}

export interface DailyEventStat {
  date: string;
  views: number;
  bookings: number;
  revenue: number;
}

export interface EventTicket {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  perks: string[];
  saleStartDate: string;
  saleEndDate: string;
}

export interface EventPromoCode {
  id: string;
  eventId: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface EventCheckIn {
  id: string;
  eventId: string;
  bookingId: string;
  userId: string;
  checkInTime: string;
  checkOutTime?: string;
}

export interface EventImage {
  id: string;
  eventId: string;
  url: string;
  title: string;
  isMain: boolean;
  uploadedAt: string;
}

export interface EventIntegration {
  id: string;
  eventId: string;
  type: 'zoom' | 'google_meet' | 'calendar' | 'email';
  data: Record<string, any>;
  isEnabled: boolean;
}

export interface SavedEvent {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
}

export interface EventShare {
  eventId: string;
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'email' | 'link';
  count: number;
}
