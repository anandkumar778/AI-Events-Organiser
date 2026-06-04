# AI Events Organiser - Architecture & Component Hierarchy

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Root Layout (RootLayout)                   │
│                    ├─ HTML + Metadata                           │
│                    └─ Global CSS (Tailwind)                     │
└──────────────────────────────┬──────────────────────────────────┘
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
    ┌─────▼──────┐                          ┌──────▼──────┐
    │   Pages    │                          │  Components │
    └────────────┘                          └─────────────┘
          │                                         │
    ┌─────┴──────────────────────────────┐        │
    │                                     │        │
    ├─ Home (page.tsx)                   │   ┌────┴─────────────────────┐
    ├─ Dashboard (page.tsx)              │   │                          │
    ├─ Profile (page.tsx)                │   ├─ Layout Components       │
    ├─ AI Tools (/ai-tools/)             │   │  ├─ Navbar             │
    │  ├─ Title Generator                │   │  ├─ Sidebar            │
    │  ├─ Description Generator          │   │  └─ Footer             │
    │  ├─ Budget Planner                 │   │                        │
    │  └─ Schedule Planner               │   ├─ Event Components      │
    └──────────────────────────────────────  │  ├─ EventCard          │
                                            │  ├─ EventForm          │
                                            │  └─ EventList          │
                                            │                        │
                                            ├─ UI Components         │
                                            │  ├─ Button             │
                                            │  ├─ Input              │
                                            │  ├─ Modal              │
                                            │  └─ Loader             │
                                            └────────────────────────┘
```

## 🎯 Page Structure with Layout

```
Every Dashboard-like Page Structure:

┌─────────────────────────────────────────┐
│           Navbar (Responsive)            │
│  ┌─────────────────────────────────────┐ │
│  │ Logo │ Desktop Menu │ Mobile Hamburger│
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
         │
         ├─────────────────────┬──────────────────────┐
         │                     │                      │
    ┌────▼────┐          ┌─────▼─────┐         ┌────▼─────┐
    │ Sidebar │          │   Main    │         │  Footer  │
    │ Desktop │          │ Content   │         │ (Hidden) │
    │ lg:show │          │ Area      │         │ at bottom│
    │         │          │           │         │          │
    │ ├─ Home │          ├─ Heading  │         ├─ About   │
    │ ├─ Events          ├─ Cards    │         ├─ Links   │
    │ ├─ Bookings        └─ Tables   │         ├─ Contact │
    │ └─ Profile             │       │         └─ Copy    │
    │                        │       │                    │
    │ Mobile:               │       │
    │ Float Btn             │       │
    │ ├─ Menu Icon          │       │
    │ ├─ Sidebar Overlay    │       │
    │ └─ Menu Items         │       │
    └─────────────────────────────────────┘
```

## 📊 Component Composition Map

### Layout Components Composition
```
Navbar
├── Logo/Brand Link
├── Desktop Menu (hidden < md)
│   ├── Link 1
│   ├── Link 2
│   ├── Link 3
│   └── Link 4
└── Mobile Hamburger (hidden > md)
    ├── Icon Button
    └── Mobile Menu (if open)
        ├── Link 1
        ├── Link 2
        ├── Link 3
        └── Link 4

Sidebar
├── Desktop Sidebar (hidden < lg)
│   ├── Menu Title
│   └── Menu Items (9 items)
│       ├── Icon + Label
│       └── Hover Effect
└── Mobile Floating Button (hidden > lg)
    └── Toggle Mobile Menu
        ├── Backdrop Overlay
        └── Side Menu (if open)
            ├── Menu Items
            └── Hover Effects

Footer
├── Main Sections (4 columns)
│   ├── About
│   ├── Quick Links
│   ├── AI Tools
│   └── Contact
└── Bottom Footer
    ├── Copyright
    └── Policy Links
```

### Event Components Composition
```
EventList
├── Loading State (skeleton grid)
├── Empty State (no events message)
└── Grid Layout (responsive)
    └── EventCard (multiple)
        ├── Image/Gradient
        ├── Title (line-clamped)
        ├── Description (optional)
        ├── Meta Info
        │   ├── Date with icon
        │   └── Location with icon
        └── View Details Button

EventForm
├── Title/Heading
├── Form Inputs (responsive grid)
│   ├── Title Input
│   ├── Description Textarea
│   ├── Date/Time Input
│   ├── Location Input
│   ├── Capacity Input
│   └── Price Input
├── Error Messages (per field)
└── Actions
    ├── Create Button (loading state)
    └── Cancel Button
```

### UI Components Composition
```
Button
├── 4 Variants
│   ├── Primary (blue)
│   ├── Secondary (gray)
│   ├── Danger (red)
│   └── Success (green)
├── 3 Sizes
│   ├── Small (sm)
│   ├── Medium (md)
│   └── Large (lg)
├── States
│   ├── Normal
│   ├── Hover
│   ├── Loading (with spinner)
│   └── Disabled
└── Options
    └── Full Width

Input
├── Label (optional)
├── Input Field
├── Error Message (optional)
└── States
    ├── Normal
    ├── Focused
    ├── Error
    └── Disabled

Modal
├── Header
│   ├── Title
│   └── Close Button
├── Content
│   └── Children
├── Footer
│   └── Buttons
└── States
    ├── Sizes (sm, md, lg)
    ├── Responsive
    └── Scrollable

Loader
├── Spinner (animated)
├── Message (optional)
└── States
    ├── Inline
    ├── Full Screen
    └── Sizes (sm, md, lg)
```

## 📱 Responsive Behavior

### Navbar
```
Mobile (< 768px)          │   Tablet (768-1024px)    │   Desktop (> 1024px)
─────────────────────────┼──────────────────────────┼──────────────────────
Logo                      │   Logo    Menu Items     │   Logo    Menu Items
[Hamburger Menu]          │                          │
                          │   [Hamburger Hidden]     │   [Hamburger Hidden]
```

### Dashboard Layout
```
Mobile                │   Tablet               │   Desktop
──────────────────────┼────────────────────────┼─────────────────────
[Menu Btn]            │   [Sidebar] [Main]     │   [Sidebar] [Main]
[Main Content]        │   [Footer Bottom]      │   [Footer Bottom]
[Footer Bottom]       │                        │
```

### Grid Layouts
```
EventList Grid:
Mobile:  1 column    │   Tablet: 2 columns   │   Desktop: 3 columns
────────────────────┼──────────────────────┼─────────────────────
[Card]              │   [Card] [Card]      │   [Card] [Card] [Card]
[Card]              │   [Card] [Card]      │   [Card] [Card] [Card]
[Card]              │                      │

Dashboard Stats:
Mobile:  1 column    │   Tablet: 2 columns   │   Desktop: 4 columns
────────────────────┼──────────────────────┼─────────────────────
[Stat]              │   [Stat] [Stat]      │   [Stat][Stat][Stat][Stat]
[Stat]              │   [Stat] [Stat]      │
[Stat]              │                      │
[Stat]              │                      │
```

## 🔄 Data Flow

```
User Action (Click, Submit, etc.)
│
├─► Component State Update (useState)
│
├─► API Call (via Feature Hooks)
│   ├─ eventApi.ts
│   ├─ authApi.ts
│   ├─ bookingApi.ts
│   └─ aiApi.ts
│
├─► Response Processing
│
├─► Store Update (Zustand)
│   ├─ eventStore.ts
│   ├─ authStore.ts
│   ├─ bookingStore.ts
│   └─ aiStore.tsx
│
└─► Component Re-render
    └─ UI Update
```

## 🎨 Color Scheme

```
Primary Colors:
├─ Blue-600: #2563eb (Primary actions, links)
├─ Blue-700: #1d4ed8 (Hover states)
└─ Blue-50: #eff6ff (Backgrounds)

Status Colors:
├─ Green-600: #16a34a (Success)
├─ Red-600: #dc2626 (Danger)
├─ Orange-500: #f97316 (Warning)
└─ Purple-500: #a855f7 (Info)

Neutral Colors:
├─ Gray-900: #111827 (Text)
├─ Gray-600: #4b5563 (Muted text)
├─ Gray-50: #f9fafb (Light backgrounds)
└─ White: #ffffff (Cards, modals)
```

## 📐 Spacing System

```
Padding/Margin Scale (Tailwind):
├─ p-2, p-3, p-4: Small (8px, 12px, 16px)
├─ p-6, p-8: Medium (24px, 32px)
└─ p-12: Large (48px)

Gap Scale:
├─ gap-2, gap-3, gap-4: Small spacing
├─ gap-6, gap-8: Medium spacing
└─ gap-12: Large spacing
```

## 🚀 Performance Optimizations

- **Code Splitting**: Each page is a separate chunk
- **Image Optimization**: Next.js Image component ready
- **Tree Shaking**: Unused code removed in production
- **Responsive Images**: Mobile-optimized layouts
- **CSS Optimization**: Tailwind purges unused styles
- **Lazy Loading**: Components ready for React.lazy

## 🔐 Security Features

- **CSRF Protection**: Form tokens ready
- **Input Validation**: Client-side validation in forms
- **Error Boundaries**: React error handling ready
- **Environment Variables**: Secret management via .env
- **XSS Prevention**: React's built-in protection
