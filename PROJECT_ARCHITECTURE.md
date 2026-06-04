# 📊 Project Architecture Summary

## Complete Structure Overview

```
ai-events-organiser/client/
│
├── app/
│   ├── services/                 ← API Layer
│   │   ├── api.ts               ← Axios config + interceptors
│   │   ├── authService.ts       ← Auth endpoints
│   │   ├── eventService.ts      ← Event endpoints
│   │   ├── bookingService.ts    ← Booking endpoints
│   │   ├── aiService.ts         ← AI endpoints
│   │   └── index.ts             ← Export all
│   │
│   ├── hooks/                    ← Custom React Hooks
│   │   ├── useAuth.ts           ← Auth hook
│   │   ├── useEvents.ts         ← Events hook
│   │   ├── useBookings.ts       ← Bookings hook
│   │   ├── useAI.ts             ← AI hook
│   │   └── index.ts             ← Export all
│   │
│   ├── features/                 ← Zustand Stores (existing)
│   │   ├── auth/
│   │   │   ├── authStore.ts
│   │   │   ├── authTypes.ts
│   │   │   └── ...
│   │   ├── events/
│   │   │   ├── eventStore.ts
│   │   │   ├── eventTypes.ts
│   │   │   └── ...
│   │   ├── bookings/
│   │   │   ├── bookingStore.ts
│   │   │   ├── bookingTypes.ts
│   │   │   └── ...
│   │   └── ai/
│   │       ├── aiStore.tsx
│   │       ├── aiTypes.ts
│   │       └── ...
│   │
│   ├── components/               ← UI Components
│   │   ├── event/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── examples/
│   │       └── ExampleComponent.tsx
│   │
│   ├── auth/                     ← Auth Pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── events/                   ← Event Pages
│   │   ├── page.tsx
│   │   └── create/page.tsx
│   │
│   ├── bookings/                 ← Booking Pages
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   ├── profile/
│   ├── ai-tools/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── SERVICES_AND_HOOKS_GUIDE.md   ← Complete guide
├── QUICK_REFERENCE.md            ← Quick reference
├── PAGES_CREATED.md              ← Pages documentation
└── package.json
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Component                                │
│              (Login Form, Events List, etc)                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ calls
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Custom Hook                                │
│    (useAuth, useEvents, useBookings, useAI)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Manages:                                                 │  │
│  │ - Local state (isLoading, error)                        │  │
│  │ - Zustand store integration                             │  │
│  │ - API call orchestration                                │  │
│  │ - Error handling                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ calls
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Service Class                                │
│    (authService, eventService, bookingService, aiService)      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Handles:                                                 │  │
│  │ - API endpoint calls                                    │  │
│  │ - Response parsing                                      │  │
│  │ - Error mapping                                         │  │
│  │ - Token management                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ uses
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Axios Instance                               │
│                      (api.ts)                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Request Interceptor:                                     │  │
│  │ - Adds auth token to headers                            │  │
│  │                                                          │  │
│  │ Response Interceptor:                                    │  │
│  │ - Handles 401 errors (redirect to login)               │  │
│  │ - Processes responses                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ makes HTTP call
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Backend API Server                           │
│              (http://localhost:8000/api)                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ returns response
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Zustand Store (optional)                       │
│         (useAuthStore, useEventStore, etc)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Persists state globally:                                │  │
│  │ - User data                                              │  │
│  │ - Events list                                            │  │
│  │ - Global UI state                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ updates
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Hook State Updates                             │
│            (isLoading, error, etc updated)                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ triggers re-render
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                 Component Re-renders                            │
│              (displays new data/error)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 API Endpoints Structure

### Authentication Service
```
POST   /auth/login              → Login user
POST   /auth/register           → Register user
GET    /auth/me                 → Get current user
PUT    /auth/profile            → Update profile
POST   /auth/change-password    → Change password
POST   /auth/forgot-password    → Request password reset
POST   /auth/reset-password     → Reset password with token
```

### Events Service
```
GET    /events                  → Get all events (with filters)
GET    /events/{id}             → Get single event
POST   /events                  → Create event
PUT    /events/{id}             → Update event
DELETE /events/{id}             → Delete event
GET    /events/my-events        → Get user's events
GET    /events/search           → Search events
GET    /events/location/{loc}   → Get events by location
```

### Bookings Service
```
GET    /bookings                → Get all bookings
GET    /bookings/{id}           → Get single booking
POST   /bookings                → Create booking
PUT    /bookings/{id}           → Update booking
POST   /bookings/{id}/cancel    → Cancel booking
GET    /bookings/my-bookings    → Get user's bookings
GET    /bookings?status={s}     → Filter by status
POST   /bookings/{id}/payment   → Process payment
GET    /bookings/{id}/ticket    → Download ticket
GET    /bookings/stats          → Get booking stats
```

### AI Service
```
POST   /ai/generate-title       → Generate event title
POST   /ai/generate-description → Generate description
POST   /ai/plan-budget          → Plan event budget
POST   /ai/plan-schedule        → Plan event schedule
POST   /ai/generate             → Generic generate endpoint
GET    /ai/history              → Get generation history
POST   /ai/history/clear        → Clear history
```

---

## 🎯 Usage Patterns

### Pattern 1: Fetch Data on Mount
```typescript
"use client";
import { useEffect } from "react";
import { useEvents } from "@/app/hooks";

export default function EventsList() {
  const { events, isLoading, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return <div>{/* Render events */}</div>;
}
```

### Pattern 2: Form Submission
```typescript
"use client";
import { useAuth } from "@/app/hooks";

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Success - redirect
    } catch (err) {
      // Error displayed in hook
    }
  };

  return <form>{/* Form inputs */}</form>;
}
```

### Pattern 3: Search & Filter
```typescript
"use client";
import { useEffect, useState } from "react";
import { useEvents } from "@/app/hooks";

export default function EventsFilter() {
  const [search, setSearch] = useState("");
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents({ search });
  }, [search, getEvents]);

  return <div>{/* Render events */}</div>;
}
```

---

## 🔐 Security Features

✅ **Token Management**
- Automatically stored in localStorage
- Sent in all API requests
- Refreshed on 401 errors

✅ **Error Handling**
- Consistent error format
- User-friendly messages
- Automatic redirect on unauthorized

✅ **Request/Response Interceptors**
- Add headers automatically
- Process errors globally
- Handle authentication

✅ **Type Safety**
- Full TypeScript support
- Type-safe API calls
- Runtime safety

---

## 🚀 Performance Optimization

✅ **Service Singletons**
- Services instantiated once
- Shared across app

✅ **Local State Management**
- Hooks manage component-level state
- Zustand for global state
- Minimal re-renders

✅ **Lazy Loading**
- Services loaded on demand
- API calls optimized
- Efficient data fetching

✅ **Caching**
- Store data in state
- Prevent unnecessary API calls
- Pagination support

---

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### API Configuration (api.ts)
```typescript
baseURL: process.env.NEXT_PUBLIC_API_URL
timeout: 10000
headers: { "Content-Type": "application/json" }
```

---

## 📈 Scalability

### Adding New Service
```typescript
// 1. Create service
export class NewService {
  async method() {
    return api.get("/endpoint");
  }
}

// 2. Create hook
export const useNew = () => {
  const [state, setState] = useState();
  return { state, method };
};

// 3. Export from index
// 4. Use in components
```

---

## 🧪 Testing

### Test Service Calls
```typescript
import authService from "@/app/services/authService";

await authService.login({ email, password });
```

### Test Hooks
```typescript
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "@/app/hooks";

const { result } = renderHook(() => useAuth());
await act(async () => {
  await result.current.login(data);
});
```

---

## 🔍 Debugging

### Check Network Requests
- Open DevTools → Network tab
- Look for API calls to `/api/*`
- Check request/response headers

### Check State
- Use React DevTools
- Inspect hook state
- Check Zustand store

### Check Errors
- Look at error messages in UI
- Check console for stack traces
- Enable request/response logging

---

## 📚 Documentation Files

1. **SERVICES_AND_HOOKS_GUIDE.md**
   - Complete architecture guide
   - Service descriptions
   - Hook API documentation
   - Usage examples

2. **QUICK_REFERENCE.md**
   - Quick lookup guide
   - Common patterns
   - Example code snippets
   - Troubleshooting

3. **PAGES_CREATED.md**
   - All page documentation
   - Feature lists
   - Mock data info

4. **ExampleComponent.tsx**
   - Working example
   - Shows real usage
   - Best practices

---

## ✅ Checklist

- ✅ Services layer created
- ✅ Custom hooks created
- ✅ API interceptors configured
- ✅ Error handling implemented
- ✅ Type safety added
- ✅ Documentation complete
- ✅ Example component created
- ✅ Quick reference guide
- ✅ Zustand integration
- ✅ Token management

---

## 🎓 Next Steps

1. **Connect Backend**
   - Update API_URL to your backend
   - Test API endpoints
   - Handle responses

2. **Add More Features**
   - Payment integration
   - File uploads
   - Real-time updates

3. **Enhance Security**
   - Token refresh mechanism
   - CSRF protection
   - Rate limiting

4. **Testing**
   - Unit tests for services
   - Integration tests for hooks
   - E2E tests for flows

5. **Monitoring**
   - Error tracking (Sentry)
   - Analytics logging
   - Performance monitoring

---

## 📞 Support

Refer to:
- **Architecture** → SERVICES_AND_HOOKS_GUIDE.md
- **Quick Help** → QUICK_REFERENCE.md
- **Pages** → PAGES_CREATED.md
- **Example** → ExampleComponent.tsx
