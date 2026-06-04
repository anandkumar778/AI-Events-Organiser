# AI Events Organiser - Project Structure

## Overview
This is a Next.js-based event management platform with AI-powered features. The project is built with TypeScript, Tailwind CSS, and Zustand for state management.

## 📁 Directory Structure

```
client/
├── app/                           # Next.js app directory
│   ├── ai-tools/                 # AI-powered tools
│   │   ├── budget-planner/       # AI budget planning tool
│   │   ├── description-generator/# AI description generation
│   │   ├── schedule-planner/     # AI schedule planning
│   │   └── title-generator/      # AI title generation
│   │
│   ├── components/               # Reusable React components
│   │   ├── event/               # Event-related components
│   │   │   ├── EventCard.tsx    # Single event card display
│   │   │   ├── EventForm.tsx    # Event creation/edit form
│   │   │   └── EventList.tsx    # List of events grid
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx       # Top navigation bar (responsive mobile menu)
│   │   │   ├── Sidebar.tsx      # Side navigation menu (mobile-friendly)
│   │   │   └── Footer.tsx       # Footer with links and info
│   │   │
│   │   └── ui/                  # UI utility components
│   │       ├── Button.tsx       # Customizable button (variants, sizes, loading)
│   │       ├── Input.tsx        # Form input with labels and error handling
│   │       ├── Modal.tsx        # Modal dialog component (responsive)
│   │       └── Loader.tsx       # Loading spinner component
│   │
│   ├── dashboard/               # Dashboard page
│   │   └── page.tsx            # Dashboard layout with stats
│   │
│   ├── features/                # Feature stores and API hooks
│   │   ├── ai/                 # AI features
│   │   │   ├── aiApi.ts        # AI API calls
│   │   │   ├── aiHooks.ts      # Custom hooks for AI
│   │   │   ├── aiStore.tsx     # Zustand store for AI state
│   │   │   └── aiTypes.ts      # TypeScript types for AI
│   │   │
│   │   ├── auth/               # Authentication features
│   │   │   ├── authApi.ts      # Auth API calls
│   │   │   ├── authHooks.ts    # Custom auth hooks
│   │   │   ├── authStore.ts    # Zustand auth store
│   │   │   └── authTypes.ts    # Auth types
│   │   │
│   │   ├── bookings/           # Booking management
│   │   │   ├── bookingApi.ts   # Booking API calls
│   │   │   ├── bookingHook.ts  # Booking hooks
│   │   │   ├── bookingStore.ts # Booking state
│   │   │   └── bookingTypes.ts # Booking types
│   │   │
│   │   └── events/             # Event management
│   │       ├── eventApi.ts     # Event API calls
│   │       ├── eventHooks.ts   # Event hooks
│   │       ├── eventStore.ts   # Event state
│   │       └── eventTypes.ts   # Event types
│   │
│   ├── profile/                # User profile page
│   │   └── page.tsx           # Profile management
│   │
│   ├── globals.css            # Global Tailwind CSS
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
│
├── public/                    # Static assets
├── node_modules/             # Dependencies
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.mjs        # Tailwind CSS configuration
├── postcss.config.mjs         # PostCSS configuration
└── eslint.config.mjs          # ESLint configuration

server/
├── package.json              # Server dependencies
└── (Backend structure)

```

## 🎨 Component Structure

### UI Components (`components/ui/`)
- **Button.tsx** - Flexible button component with variants (primary, secondary, danger, success), sizes (sm, md, lg), and loading state
- **Input.tsx** - Form input with label, error message, and validation support
- **Modal.tsx** - Responsive modal dialog with customizable size
- **Loader.tsx** - Spinner loader with size and full-screen options

### Layout Components (`components/layout/`)
- **Navbar.tsx** - Responsive navigation with mobile hamburger menu
- **Sidebar.tsx** - Desktop sidebar and mobile floating menu
- **Footer.tsx** - Comprehensive footer with links and company info

### Event Components (`components/event/`)
- **EventCard.tsx** - Individual event card with image, details, and action button
- **EventList.tsx** - Grid layout of event cards with loading state
- **EventForm.tsx** - Complete event creation form with validation

## 🎯 Key Features

### Responsive Design
- ✅ Mobile-first approach
- ✅ Mobile menu hamburger in Navbar
- ✅ Floating menu button for Sidebar on mobile
- ✅ Tailwind CSS responsive classes (sm:, md:, lg:)
- ✅ Touch-friendly buttons and interactions

### State Management
- Zustand stores in `features/` for:
  - Authentication (authStore.ts)
  - Events (eventStore.ts)
  - Bookings (bookingStore.ts)
  - AI features (aiStore.tsx)

### API Integration
- Axios for HTTP requests
- Organized API calls in `features/*/Api.ts` files
- Custom hooks for API interactions

### Form Handling
- EventForm with complete validation
- Error handling and display
- Loading states on submit

## 🔧 Tech Stack

- **Framework**: Next.js 16.2.6
- **UI**: React 19.2.4 with TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5.0.14
- **HTTP Client**: Axios 1.16.1
- **Linting**: ESLint 9

## 📱 Responsive Breakpoints

```
sm: 640px   - Small devices
md: 768px   - Tablets
lg: 1024px  - Desktops
xl: 1280px  - Large desktops
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## 📝 Component Usage Examples

### Button Component
```tsx
<Button 
  text="Click Me" 
  variant="primary" 
  size="lg"
  fullWidth={true}
  loading={isLoading}
/>
```

### Input Component
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error={errors.email}
  value={formData.email}
  onChange={handleChange}
/>
```

### Modal Component
```tsx
<Modal
  title="Confirm Action"
  size="md"
  onClose={() => setOpen(false)}
>
  <p>Are you sure?</p>
</Modal>
```

## 🎓 Code Organization Best Practices

1. **Components** are organized by feature/domain
2. **Features** contain API calls, hooks, types, and store
3. **UI Components** are generic and reusable
4. **Layout Components** wrap pages with consistent styling
5. **Pages** use layout components for consistent structure
6. **Responsive classes** are used for all screen sizes

## 📊 Improvements Made

✅ Enhanced mobile responsiveness across all components
✅ Added mobile hamburger menu to Navbar
✅ Created floating menu button for Sidebar
✅ Improved Button component with variants and sizes
✅ Enhanced Input component with validation support
✅ Updated Modal with responsive sizing
✅ Improved Loader with size options
✅ Created comprehensive Footer with links
✅ Enhanced EventCard with better styling
✅ Updated EventForm with full validation
✅ Redesigned Dashboard with stats and tables
✅ Improved Profile page with edit functionality
✅ Enhanced Homepage with features section
✅ Consistent layout structure across all pages

