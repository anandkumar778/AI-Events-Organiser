import { z } from 'zod';

/**
 * Event creation validation schema
 */
export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, 'Event title is required')
    .min(3, 'Event title must be at least 3 characters')
    .max(100, 'Event title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Event description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  fullDescription: z
    .string()
    .min(20, 'Full description must be at least 20 characters')
    .max(5000, 'Full description must be less than 5000 characters')
    .optional(),
  image: z.string().url('Please provide a valid image URL'),
  location: z
    .string()
    .min(1, 'Location is required')
    .min(3, 'Location must be at least 3 characters'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  startDate: z
    .string()
    .min(1, 'Start date is required')
    .refine((date) => new Date(date) > new Date(), 'Start date must be in the future'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z
    .string()
    .min(1, 'Start time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)'),
  endTime: z
    .string()
    .min(1, 'End time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)'),
  category: z.enum(
    [
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
    ] as const,
    { message: 'Please select a valid category' }
  ),
  price: z.number().min(0, 'Price must be a positive number'),
  discountedPrice: z.number().min(0, 'Discounted price must be a positive number').optional(),
  currency: z.string().length(3, 'Currency code must be 3 characters (e.g., USD)'),
  capacity: z
    .number()
    .min(1, 'Capacity must be at least 1')
    .max(1000000, 'Capacity exceeds limit'),
  tags: z.array(z.string()).min(1, 'Please add at least one tag').max(10, 'Maximum 10 tags allowed'),
})
  .refine(
    (data) => {
      if (data.discountedPrice) {
        return data.discountedPrice < data.price;
      }
      return true;
    },
    {
      message: 'Discounted price must be less than original price',
      path: ['discountedPrice'],
    }
  )
  .refine(
    (data) => new Date(`${data.endDate}T${data.endTime}`) > new Date(`${data.startDate}T${data.startTime}`),
    {
      message: 'End date and time must be after start date and time',
      path: ['endDate'],
    }
  );

export type CreateEventFormData = z.infer<typeof createEventSchema>;

/**
 * Event update validation schema
 */
export const updateEventSchema = createEventSchema.partial();

export type UpdateEventFormData = z.infer<typeof updateEventSchema>;

/**
 * Event filter validation schema
 */
export const eventFilterSchema = z.object({
  category: z.enum(
    [
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
    ] as const,
    { message: 'Please select a valid category' }
  ).optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  minPrice: z.number().min(0, 'Minimum price must be a positive number').optional(),
  maxPrice: z.number().min(0, 'Maximum price must be a positive number').optional(),
  search: z.string().max(100, 'Search term must be less than 100 characters').optional(),
  sortBy: z.enum(['date', 'price', 'popularity', 'rating'] as const, {
    message: 'Please select a valid sort option',
  }).optional(),
  sortOrder: z.enum(['asc', 'desc'] as const, {
    message: 'Please select ascending or descending',
  }).optional(),
  page: z.number().min(1, 'Page must be at least 1').optional(),
  limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').optional(),
});

export type EventFilterFormData = z.infer<typeof eventFilterSchema>;

/**
 * Event search validation schema
 */
export const eventSearchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must be less than 100 characters'),
  category: z.enum(
    [
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
    ] as const,
    { message: 'Please select a valid category' }
  ).optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  radius: z.number().min(1, 'Radius must be at least 1 km').optional(),
  upcomingOnly: z.boolean().optional(),
});

export type EventSearchFormData = z.infer<typeof eventSearchSchema>;

/**
 * Event ticket creation validation schema
 */
export const createEventTicketSchema = z.object({
  name: z
    .string()
    .min(1, 'Ticket name is required')
    .min(3, 'Ticket name must be at least 3 characters')
    .max(50, 'Ticket name must be less than 50 characters'),
  description: z
    .string()
    .min(0)
    .max(200, 'Description must be less than 200 characters')
    .optional(),
  price: z.number().min(0, 'Price must be a positive number'),
  quantity: z.number().min(1, 'Quantity must be at least 1').max(100000, 'Quantity exceeds limit'),
  perks: z.array(z.string()).max(10, 'Maximum 10 perks allowed').optional(),
  saleStartDate: z.string().min(1, 'Sale start date is required'),
  saleEndDate: z.string().min(1, 'Sale end date is required'),
}).refine(
  (data) => new Date(data.saleEndDate) > new Date(data.saleStartDate),
  {
    message: 'Sale end date must be after sale start date',
    path: ['saleEndDate'],
  }
);

export type CreateEventTicketFormData = z.infer<typeof createEventTicketSchema>;

/**
 * Event promo code validation schema
 */
export const createPromoCodeSchema = z.object({
  code: z
    .string()
    .min(1, 'Promo code is required')
    .min(3, 'Promo code must be at least 3 characters')
    .max(20, 'Promo code must be less than 20 characters')
    .toUpperCase(),
  discountType: z.enum(['percentage', 'fixed'] as const, {
    message: 'Please select percentage or fixed discount',
  }),
  discountValue: z.number().min(0, 'Discount value must be positive'),
  maxUses: z.number().min(1, 'Max uses must be at least 1'),
  validFrom: z.string().min(1, 'Valid from date is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
}).refine(
  (data) => new Date(data.validUntil) > new Date(data.validFrom),
  {
    message: 'Valid until date must be after valid from date',
    path: ['validUntil'],
  }
);

export type CreatePromoCodeFormData = z.infer<typeof createPromoCodeSchema>;

/**
 * Event review validation schema
 */
export const eventReviewSchema = z.object({
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  comment: z
    .string()
    .min(1, 'Comment is required')
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must be less than 1000 characters'),
});

export type EventReviewFormData = z.infer<typeof eventReviewSchema>;