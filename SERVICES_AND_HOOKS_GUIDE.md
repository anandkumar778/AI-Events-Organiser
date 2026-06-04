# 🏗️ Services & Hooks Architecture

## Overview
Complete service layer and custom hooks for managing API calls, authentication, events, bookings, and AI features.

---

## 📁 Folder Structure

```
app/
├── services/
│   ├── api.ts              ← Axios instance with interceptors
│   ├── authService.ts      ← Auth API endpoints
│   ├── eventService.ts     ← Event API endpoints
│   ├── bookingService.ts   ← Booking API endpoints
│   ├── aiService.ts        ← AI API endpoints
│   └── index.ts            ← Export all services
│
└── hooks/
    ├── useAuth.ts          ← Authentication hook
    ├── useEvents.ts        ← Events management hook
    ├── useBookings.ts      ← Bookings management hook
    ├── useAI.ts            ← AI features hook
    └── index.ts            ← Export all hooks
```

---

## 🔧 Services

### 1. **api.ts** - Base API Configuration
```typescript
import { api } from '@/app/services';

// Automatic token handling
// 401 error handling
// Centralized error processing
```

**Features:**
- ✅ Axios instance creation
- ✅ Request interceptor (adds auth token)
- ✅ Response interceptor (handles 401)
- ✅ Automatic redirect to login
- ✅ Timeout configuration
- ✅ Base URL from environment

---

### 2. **authService.ts** - Authentication Service

**Methods:**
```typescript
// Login
await authService.login({ email: string, password: string })

// Register
await authService.register({ fullName, email, phone, password })

// Logout
authService.logout()

// Get current user
await authService.getCurrentUser()

// Update profile
await authService.updateProfile(data)

// Change password
await authService.changePassword({ currentPassword, newPassword })

// Forgot password
await authService.forgotPassword(email)

// Reset password
await authService.resetPassword({ token, password })
```

**Types:**
```typescript
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  location?: string;
  bio?: string;
}
```

---

### 3. **eventService.ts** - Events Service

**Methods:**
```typescript
// Get all events
await eventService.getEvents(query?)

// Get single event
await eventService.getEvent(id)

// Create event
await eventService.createEvent(data)

// Update event
await eventService.updateEvent(id, data)

// Delete event
await eventService.deleteEvent(id)

// Get user's events
await eventService.getMyEvents()

// Search events
await eventService.searchEvents(query)

// Get events by location
await eventService.getEventsByLocation(location)
```

**Types:**
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  registered?: number;
  organizer?: { id, name, email };
}

interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  imageUrl?: string;
}
```

---

### 4. **bookingService.ts** - Bookings Service

**Methods:**
```typescript
// Get bookings
await bookingService.getBookings(query?)

// Get single booking
await bookingService.getBooking(id)

// Create booking
await bookingService.createBooking(data)

// Update booking
await bookingService.updateBooking(id, data)

// Cancel booking
await bookingService.cancelBooking(id, reason?)

// Get user's bookings
await bookingService.getMyBookings()

// Get bookings by status
await bookingService.getBookingsByStatus(status)

// Process payment
await bookingService.processPayment(bookingId, paymentData)

// Download ticket
await bookingService.downloadTicket(bookingId)

// Get booking stats
await bookingService.getBookingStats()
```

**Types:**
```typescript
interface Booking {
  id: string;
  eventId: string;
  userId: string;
  eventTitle: string;
  eventDate: string;
  bookingDate: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  ticketCount: number;
  totalPrice: number;
  bookingReference: string;
  paymentStatus?: "Pending" | "Paid" | "Failed";
}
```

---

### 5. **aiService.ts** - AI Service

**Methods:**
```typescript
// Generate title
await aiService.generateTitle(data)

// Generate description
await aiService.generateDescription(data)

// Plan budget
await aiService.planBudget(data)

// Plan schedule
await aiService.planSchedule(data)

// Generic generate
await aiService.generate(data)

// Get history
await aiService.getHistory()

// Clear history
await aiService.clearHistory()
```

**Types:**
```typescript
interface TitleGeneratorRequest {
  category: string;
  theme?: string;
  style?: "formal" | "casual" | "fun" | "professional";
}

interface BudgetPlannerRequest {
  eventType: string;
  attendees: number;
  location: string;
  duration?: number;
}

interface SchedulePlannerRequest {
  eventTitle: string;
  eventDate: string;
  eventDuration: number;
  activities: string[];
}
```

---

## 🎣 Custom Hooks

### 1. **useAuth** - Authentication Hook

```typescript
const {
  user,              // Current user object
  isLoading,         // Loading state
  error,             // Error message
  isAuthenticated,   // Boolean flag
  login,             // Login function
  register,          // Register function
  logout,            // Logout function
  updateProfile,     // Update profile function
  changePassword,    // Change password function
  forgotPassword,    // Forgot password function
  resetPassword,     // Reset password function
  clearError,        // Clear error
} = useAuth();
```

**Usage Example:**
```typescript
"use client";
import { useAuth } from "@/app/hooks";

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email: "user@example.com", password: "password" });
      // Redirect on success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {/* form inputs */}
      <button disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
    </form>
  );
}
```

---

### 2. **useEvents** - Events Hook

```typescript
const {
  events,            // Array of events
  currentEvent,      // Currently selected event
  isLoading,         // Loading state
  error,             // Error message
  total,             // Total count
  page,              // Current page
  getEvents,         // Fetch events
  getEvent,          // Fetch single event
  createEvent,       // Create event
  updateEvent,       // Update event
  deleteEvent,       // Delete event
  getMyEvents,       // Fetch user's events
  searchEvents,      // Search events
  getEventsByLocation, // Filter by location
  clearError,        // Clear error
  setCurrentEvent,   // Set current event
} = useEvents();
```

**Usage Example:**
```typescript
"use client";
import { useEvents } from "@/app/hooks";

export default function EventsList() {
  const { events, isLoading, getEvents } = useEvents();

  useEffect(() => {
    getEvents({ page: 1, limit: 10 });
  }, [getEvents]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

---

### 3. **useBookings** - Bookings Hook

```typescript
const {
  bookings,          // Array of bookings
  currentBooking,    // Currently selected booking
  isLoading,         // Loading state
  error,             // Error message
  total,             // Total count
  page,              // Current page
  getBookings,       // Fetch bookings
  getBooking,        // Fetch single booking
  createBooking,     // Create booking
  updateBooking,     // Update booking
  cancelBooking,     // Cancel booking
  getMyBookings,     // Fetch user's bookings
  getBookingsByStatus, // Filter by status
  processPayment,    // Process payment
  downloadTicket,    // Download ticket
  getBookingStats,   // Get stats
  clearError,        // Clear error
  setCurrentBooking, // Set current booking
} = useBookings();
```

**Usage Example:**
```typescript
"use client";
import { useBookings } from "@/app/hooks";

export default function BookingForm() {
  const { createBooking, isLoading, error } = useBookings();

  const handleBooking = async () => {
    try {
      await createBooking({
        eventId: "123",
        ticketCount: 2,
      });
      alert("Booking created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleBooking} disabled={isLoading}>
        {isLoading ? "Processing..." : "Book Now"}
      </button>
    </div>
  );
}
```

---

### 4. **useAI** - AI Features Hook

```typescript
const {
  isLoading,         // Loading state
  error,             // Error message
  generationHistory, // History of generations
  generateTitle,     // Generate title
  generateDescription, // Generate description
  planBudget,        // Plan budget
  planSchedule,      // Plan schedule
  getHistory,        // Fetch history
  clearHistory,      // Clear history
  clearError,        // Clear error
} = useAI();
```

**Usage Example:**
```typescript
"use client";
import { useAI } from "@/app/hooks";

export default function TitleGenerator() {
  const { generateTitle, isLoading, error } = useAI();

  const handleGenerate = async () => {
    try {
      const title = await generateTitle({
        category: "conference",
        style: "professional",
      });
      console.log("Generated title:", title);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Title"}
      </button>
    </div>
  );
}
```

---

## 📊 Architecture Diagram

```
Component
    │
    ├─→ useAuth()
    │    ├─→ authService
    │    │   └─→ api.ts
    │    │       └─→ localStorage (token)
    │    └─→ useAuthStore (Zustand)
    │
    ├─→ useEvents()
    │    ├─→ eventService
    │    │   └─→ api.ts
    │    └─→ useEventStore (Zustand)
    │
    ├─→ useBookings()
    │    ├─→ bookingService
    │    │   └─→ api.ts
    │    └─→ useState (local)
    │
    └─→ useAI()
         ├─→ aiService
         │   └─→ api.ts
         └─→ useState (local)
```

---

## 🔑 Key Features

✅ **Error Handling** - Consistent error handling across all services
✅ **Loading States** - Built-in loading state management
✅ **Token Management** - Automatic token handling in requests
✅ **Type Safety** - Full TypeScript support with interfaces
✅ **Reusable** - Custom hooks can be used in any component
✅ **Scalable** - Easy to add new services and hooks
✅ **Separation of Concerns** - API logic separated from components
✅ **Centralized** - Single source of truth for API calls

---

## 🚀 Usage Pattern

### 1. In Components
```typescript
"use client";
import { useAuth, useEvents } from "@/app/hooks";

export default function MyComponent() {
  const { user, login } = useAuth();
  const { events, getEvents } = useEvents();

  // Use the data and methods
}
```

### 2. Direct Service Calls
```typescript
import { authService, eventService } from "@/app/services";

// Without hook
const response = await eventService.getEvents();
```

---

## 📝 Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## ✨ Best Practices

1. **Always use hooks in components**
   ```typescript
   // ✅ Good
   const { getEvents } = useEvents();
   ```

2. **Handle errors in components**
   ```typescript
   // ✅ Good
   const { error, clearError } = useEvents();
   {error && <div>{error}</div>}
   ```

3. **Show loading states**
   ```typescript
   // ✅ Good
   const { isLoading } = useEvents();
   <button disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
   ```

4. **Clear errors when appropriate**
   ```typescript
   // ✅ Good
   useEffect(() => {
     clearError();
   }, [clearError]);
   ```

---

## 🔄 Data Flow

```
Component
  ↓ (calls hook method)
Hook (useAuth, useEvents, etc)
  ↓ (calls service method)
Service (authService, eventService, etc)
  ↓ (makes API call)
API Instance (with interceptors)
  ↓ (sends HTTP request)
Backend Server
  ↓ (receives response)
API Instance (handles response)
  ↓ (processes response/error)
Service (returns data or throws error)
  ↓ (updates state)
Hook (updates local state and store)
  ↓ (component re-renders)
Component (displays data)
```

---

## 📞 Support

For questions about:
- **Services** → Check individual service files
- **Hooks** → Check hook implementations
- **Types** → Check service type exports
- **API** → Check api.ts configuration
