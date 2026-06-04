# 🚀 Quick Reference - Services & Hooks

## Import Services

```typescript
import {
  authService,
  eventService,
  bookingService,
  aiService,
  api,
} from "@/app/services";

// Or import individual
import authService from "@/app/services/authService";
```

## Import Hooks

```typescript
import {
  useAuth,
  useEvents,
  useBookings,
  useAI,
} from "@/app/hooks";

// Or import individual
import { useAuth } from "@/app/hooks/useAuth";
```

---

## 🔐 Authentication Examples

### Login
```typescript
const { login, isLoading, error } = useAuth();

await login({
  email: "user@example.com",
  password: "password123",
});
```

### Register
```typescript
const { register } = useAuth();

await register({
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+91-9876543210",
  password: "SecurePass123",
});
```

### Update Profile
```typescript
const { updateProfile } = useAuth();

await updateProfile({
  fullName: "Jane Doe",
  location: "Lucknow",
});
```

### Logout
```typescript
const { logout } = useAuth();

logout(); // Clears token and user data
```

---

## 📅 Events Examples

### Fetch Events
```typescript
const { getEvents, events } = useEvents();

// Get all events
await getEvents();

// With filters
await getEvents({
  page: 1,
  limit: 10,
  search: "conference",
  location: "Delhi",
  sortBy: "date",
});
```

### Create Event
```typescript
const { createEvent } = useEvents();

await createEvent({
  title: "Tech Conference 2026",
  description: "Annual tech conference",
  date: "2026-06-10",
  location: "Lucknow",
  capacity: 500,
  price: 1500,
});
```

### Update Event
```typescript
const { updateEvent } = useEvents();

await updateEvent("event-id", {
  title: "Updated Title",
  price: 2000,
});
```

### Delete Event
```typescript
const { deleteEvent } = useEvents();

await deleteEvent("event-id");
```

### Search Events
```typescript
const { searchEvents } = useEvents();

await searchEvents("tech");
```

---

## 🎫 Bookings Examples

### Fetch Bookings
```typescript
const { getBookings, bookings } = useBookings();

await getBookings({
  page: 1,
  status: "Confirmed",
});
```

### Create Booking
```typescript
const { createBooking } = useBookings();

const booking = await createBooking({
  eventId: "event-123",
  ticketCount: 2,
  attendeeInfo: [
    {
      name: "John",
      email: "john@example.com",
      phone: "+91-9876543210",
    },
  ],
});
```

### Cancel Booking
```typescript
const { cancelBooking } = useBookings();

await cancelBooking("booking-id", "Personal reason");
```

### Process Payment
```typescript
const { processPayment } = useBookings();

await processPayment("booking-id", {
  method: "card",
  amount: 3000,
});
```

### Download Ticket
```typescript
const { downloadTicket } = useBookings();

await downloadTicket("booking-id");
```

---

## 🤖 AI Examples

### Generate Title
```typescript
const { generateTitle } = useAI();

const title = await generateTitle({
  category: "conference",
  theme: "technology",
  style: "professional",
});
```

### Generate Description
```typescript
const { generateDescription } = useAI();

const description = await generateDescription({
  title: "Tech Summit",
  category: "conference",
  attendees: 500,
  tone: "exciting",
});
```

### Plan Budget
```typescript
const { planBudget } = useAI();

const budget = await planBudget({
  eventType: "conference",
  attendees: 500,
  location: "Delhi",
  duration: 2,
  premium: true,
});

// Returns: { totalBudget, breakdown, recommendations }
```

### Plan Schedule
```typescript
const { planSchedule } = useAI();

const schedule = await planSchedule({
  eventTitle: "Tech Conference",
  eventDate: "2026-06-10",
  eventDuration: 8,
  activities: ["Registration", "Keynote", "Sessions", "Networking"],
});

// Returns: { schedule: [{ time, activity, duration }], tips }
```

---

## 🎯 Common Patterns

### Fetch and Display
```typescript
"use client";
import { useEffect } from "react";
import { useEvents } from "@/app/hooks";

export default function EventsList() {
  const { events, isLoading, error, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### Form Submission
```typescript
"use client";
import { useState } from "react";
import { useAuth } from "@/app/hooks";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login({ email, password });
      // Redirect on success
    } catch (err) {
      // Error is set in hook
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
```

### Search and Filter
```typescript
"use client";
import { useEffect, useState } from "react";
import { useEvents } from "@/app/hooks";

export default function EventsFilter() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents({
      search,
      location: location || undefined,
    });
  }, [search, location, getEvents]);

  return (
    <div>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">All Locations</option>
        <option value="Lucknow">Lucknow</option>
        <option value="Delhi">Delhi</option>
      </select>
      {/* Display events */}
    </div>
  );
}
```

---

## ⚠️ Error Handling

```typescript
try {
  await createEvent(eventData);
} catch (err) {
  // Handle specific errors
  if (err.status === 400) {
    // Bad request
  } else if (err.status === 401) {
    // Unauthorized - already redirected
  } else if (err.status === 500) {
    // Server error
  }
  console.error(err.message);
}
```

---

## 🔄 State Management

### Hook Internal State
```typescript
const {
  events,        // Component-level state
  isLoading,     // Loading flag
  error,         // Error message
  total,         // Pagination info
  page,          // Current page
} = useEvents();
```

### Zustand Store State
```typescript
// For Auth
const user = useAuthStore((state) => state.user);

// For Events
const events = useEventStore((state) => state.events);
```

---

## 📝 TypeScript Types

```typescript
import type {
  User,
  Event,
  Booking,
  LoginData,
  RegisterData,
} from "@/app/services";

const user: User = {
  id: "123",
  email: "user@example.com",
  fullName: "John Doe",
  phone: "+91-9876543210",
};

const event: Event = {
  id: "456",
  title: "Conference",
  description: "Description",
  date: "2026-06-10",
  location: "Lucknow",
  capacity: 500,
  price: 1500,
};
```

---

## 🛠️ Utility Functions

### Check Authentication
```typescript
const { isAuthenticated } = useAuth();

if (isAuthenticated) {
  // User is logged in
}
```

### Get Current User
```typescript
const { user } = useAuth();

if (user) {
  console.log("User:", user.fullName);
}
```

### Clear Errors
```typescript
const { error, clearError } = useEvents();

// Clear error manually
clearError();

// Or automatically
useEffect(() => {
  clearError();
}, []);
```

---

## 🚦 Loading States in UI

```typescript
<button disabled={isLoading}>
  {isLoading ? "Processing..." : "Submit"}
</button>

{isLoading && <Loader />}

{!isLoading && events.length === 0 && <EmptyState />}

{isLoading ? <Skeleton /> : <EventList events={events} />}
```

---

## 📊 Pagination Example

```typescript
const { getEvents, page, total } = useEvents();

const handleNextPage = () => {
  getEvents({ page: page + 1 });
};

const handlePrevPage = () => {
  getEvents({ page: page - 1 });
};
```

---

## 🔑 Key Points

✅ Always use hooks in `"use client"` components
✅ Handle errors with try-catch or error state
✅ Show loading states to users
✅ Clear errors when needed
✅ Use TypeScript types for safety
✅ Services are singletons (instantiated once)
✅ Hooks manage local component state
✅ Zustand stores persist across components

---

## 🆘 Troubleshooting

**Issue**: "Cannot use hook in non-client component"
- **Solution**: Add `"use client"` directive at top

**Issue**: "Service not working"
- **Solution**: Check environment variable `NEXT_PUBLIC_API_URL`

**Issue**: "401 Unauthorized"
- **Solution**: Token might be expired, user auto-redirected to login

**Issue**: "Types not found"
- **Solution**: Import types from services: `import type { User } from "@/app/services"`
