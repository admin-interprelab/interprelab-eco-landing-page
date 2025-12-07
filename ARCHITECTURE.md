# InterpreLab - Architectural Overview

> **Last Updated:** December 2025  
> **Target Audience:** New developers joining the project

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [Directory Structure](#directory-structure)
5. [Design System](#design-system)
6. [Key Features](#key-features)
7. [Development Workflow](#development-workflow)
8. [Environment Setup](#environment-setup)
9. [Common Patterns](#common-patterns)
10. [Deployment](#deployment)

---

## Project Overview

**InterpreLab** is an AI-driven training and real-time assistance platform for medical interpreters. The platform consists of multiple integrated products:

- **InterpreBot** 🤖: AI-powered skills assessment and training
- **InterpreCoach** 🎧: Real-time browser extension for live interpretation assistance
- **InterpreStudy** 🎓: Interactive training hub with AI-powered simulations
- **InterpreLink** 🤝: Community network and resource hub
- **InterpreTrack** 📊: Session tracking and earnings management

### Business Context

- **Primary Users:** Medical interpreters (certified professionals, students, certification candidates)
- **Secondary Users:** Language Service Companies (LSCs)
- **Certifications:** NBCMI and CCHI approved training courses

---

## Tech Stack

### Core Framework

- **React 19.2.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Strict type safety
- **Vite 6.0.0** - Fast build tool and dev server
- **React Router DOM 6.30.1** - Client-side routing (SPA)

### UI & Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Radix UI-based component library
- **Framer Motion 12.23.25** - Animation library
- **Lucide React 0.462.0** - Icon library
- **Three.js + React Three Fiber** - 3D graphics (for interactive elements)

### State Management & Data Fetching

- **TanStack Query (React Query) 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form state management
- **Zod 3.25.76** - Schema validation

### Backend & Services

- **Supabase 2.58.0** - Backend-as-a-Service (Auth, Database, Realtime)
- **Firebase 12.6.0** - Additional backend services
- **Google Gemini API** - AI/ML features (via REST API)

### Testing

- **Vitest 4.0.15** - Unit testing framework
- **Testing Library** - Component testing
- **Happy DOM** - Lightweight DOM for tests

### Developer Tools

- **ESLint 9.32.0** - Linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Autoprefixer** - CSS vendor prefixing

---

## Architecture Patterns

### 1. **Component-Based Architecture**

- Modular, reusable components
- Separation of concerns (UI, logic, data)
- Composition over inheritance

### 2. **Feature-Driven Structure**

```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific modules
├── pages/          # Route-level components
├── modules/        # Business logic modules
└── integrations/   # Third-party service clients
```

### 3. **Design Patterns Used**

- **Provider Pattern**: Context API for global state (Auth, Language)
- **Compound Components**: Complex UI components (e.g., Accordion, Tabs)
- **Render Props**: Flexible component composition
- **Custom Hooks**: Reusable logic extraction
- **Protected Routes**: Authentication wrapper pattern
- **Lazy Loading**: Code splitting for performance

### 4. **State Management Strategy**

- **Server State**: TanStack Query (API data, caching, invalidation)
- **Global State**: React Context (Auth, Language, Theme)
- **Local State**: useState/useReducer (Component-specific)
- **Form State**: React Hook Form (Complex forms with validation)

---

## Directory Structure

### `/src` - Source Code Root

#### `/pages` - Route Components (16 files)

Top-level page components mapped to routes in `App.tsx`:

- `Index.tsx` - Landing page (Hero, Features, Certs, Testimonials, FAQ)
- `InterpreBot.tsx` - AI Skills Assessment
- `InterpreCoach.tsx` - Real-time Assistant
- `InterpreStudy.tsx` - Interactive Training Hub (1100+ lines, AI-powered)
- `InterpreLink.tsx` - Community Network
- `InterpreTrack.tsx` - Session Tracking (lazy-loaded)
- `Dashboard.tsx` - User Dashboard (protected)
- `Settings.tsx` - User Settings (protected)
- `SignIn.tsx` - Authentication
- `Waitlist.tsx` - Waitlist Signup
- `About.tsx`, `Contact.tsx`, `Resources.tsx` - Static pages
- `Dilemma.tsx` - Ethical Dilemma Training
- `NotFound.tsx` - 404 Error Page

#### `/components` - Reusable Components (78 children)

**`/ui` (49 components)** - shadcn/ui Base Components

- Button, Card, Badge, Dialog, Dropdown, etc.
- Radix UI primitives with custom styling
- Fully typed, accessible, composable

**`/landing` (8 components)** - Landing Page Sections

- `Hero.tsx` - Main hero banner
- `StoryDrivenVideoHero.tsx` - Interactive video storytelling
- `ProductShowcase.tsx` - Feature comparison cards
- `CertificatesPremium.tsx` - Pricing and certification info
- `Testimonials.tsx` - Social proof
- `StatsSection.tsx` - Impact metrics

**`/features` (5 subdirectories)** - Feature-Specific Components

- `InterpreTrack/` - Tracking feature components
- `InterpreStudy/` - Study hub components

**`/sections` (3 subdirectories)** - Generic Page Sections

- `FAQ/` - FAQ components
- `WellnessSection.tsx` - Wellness content
- `QAFeedbackSection.tsx` - QA feedback content

**Root Components:**

- `Navigation.tsx` - Main site navigation
- `Footer.tsx` - Site footer
- `ProtectedRoute.tsx` - Auth wrapper for protected routes
- `ExtensionUI.tsx` - Browser extension UI (22KB)

#### `/contexts` - React Context Providers (2 files)

- `AuthContext.tsx` - Authentication state and methods
- `LanguageContext.tsx` - Global language settings

#### `/hooks` - Custom React Hooks (3 files)

- Shared logic like `use-toast`, `use-mobile`, etc.

#### `/lib` - Utility Libraries (5 files)

- `utils.ts` - Helper functions (e.g., `cn` for Tailwind class merging)

#### `/integrations` - Third-Party Clients

- `/supabase` - Supabase client configuration

#### `/modules` - Business Logic (20 children)

- Core business logic providers
- Feature-specific helpers
- AI integration modules

#### `/services` - API Services (1 file)

- API client wrappers

#### `/utils` - Utility Functions (7 files)

- General-purpose helpers

#### `/test` - Test Utilities (2 files)

- Test setup and helpers

---

## Design System

### Color Palette (HSL-based)

The design system uses **HSL color values** for consistency and theming support.

#### Primary Colors

- **Primary**: `209 46% 31%` - Navy blue (logo-harmonized)
- **Secondary**: `237 26% 41%` - Deep purple
- **Success**: `142 71% 45%` - Green (real-time active states)
- **Warning**: `38 92% 50%` - Amber (attention states)
- **Destructive**: `0 62.8% 50%` - Red (error states)

#### Neutral Colors

- **Background**: `0 0% 10%` - Dark (default theme)
- **Foreground**: `48 15% 97%` - Off-white text
- **Muted**: `240 10% 12%` - Muted surfaces
- **Border**: `240 10% 18%` - Border color

#### Special Effects

- **Glass Effect**: `--glass-bg`, `--glass-border`, `--glass-blur`
- **Gradients**: `--gradient-primary`, `--gradient-success`
- **Shadows**: `--shadow-glow`, `--shadow-card`, `--shadow-extension`

### Typography

- **Font Family**: `'Inter', system-ui, sans-serif`
- **Headings**: Bold, tight tracking
- **Body**: Regular, relaxed leading

### Spacing & Layout

- **Border Radius**: `0.75rem` (default)
- **Container**: `max-w-6xl mx-auto` (standard)
- **Grid**: Responsive grid with Tailwind utilities

### Animations

- **Transitions**: `--transition-smooth`, `--transition-bounce`
- **Keyframes**: `fadeIn`, `slideUp`, `pulseGlow`, `float`
- **Classes**: `.animate-fade-in`, `.hover-lift`, `.pulse-glow-urgent`

### Accessibility

- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Full support
- **Focus Indicators**: Visible ring on focus
- **Color Contrast**: WCAG AA compliant

---

## Key Features

### 1. InterpreStudy (AI Training Hub)

**File:** `src/pages/InterpreStudy.tsx` (1108 lines)

**Architecture:**

- Multi-view state machine (home, academy, modules, summary)
- AI-powered features via Google Gemini API
- Modular training components

**Modules:**

- **Academy View**: Educational content tabs (DCS, Intervention, Phraseology, Trauma)
- **DCS Module**: Demand-Control Schema training with AI scenario generation
- **Roles Module**: Escalation protocol simulation with AI consultant
- **Trauma Module**: Vicarious trauma awareness with AI reflection analysis
- **Immersive Simulation**: Live role-play with AI evaluation

**AI Integration:**

- `generateGeminiContent(prompt)` - Text generation
- API Key: `VITE_GEMINI_API_KEY` (optional, features disabled if missing)
- Error handling: Graceful degradation

### 2. Landing Page Flow

**File:** `src/pages/Index.tsx`

**Structure:**

1. Hero Section
2. Pain Point Stories (Video-driven storytelling)
3. Product Showcase (4 features with bullet points)
4. Certificates & Premium Pricing
5. Testimonials
6. FAQ
7. Footer

**Key Components:**

- `StoryDrivenVideoHero` - Emotional storytelling with data overlays
- `ProductShowcase` - Feature cards with icons and CTAs
- `CertificatesPremium` - Pricing cards with glass effect

### 3. Authentication & Protected Routes

**Files:** `src/contexts/AuthContext.tsx`, `src/components/ProtectedRoute.tsx`

**Flow:**

1. User signs in via `SignIn.tsx`
2. Auth state stored in `AuthContext`
3. Protected routes check auth status
4. Redirect to `/signin` if unauthenticated

**Protected Pages:**

- `/dashboard`
- `/settings`
- `/interpre-hub`

### 4. Browser Extension (InterpreCoach)

**File:** `src/components/ExtensionUI.tsx` (22KB)

**Features:**

- Real-time terminology lookup
- Voice regulation assistance
- Automatic note-taking
- Predictive vocabulary suggestions

---

## Development Workflow

### Getting Started

#### 1. Clone & Install

```bash
git clone <repo-url>
cd interprelab-eco-landing-page
npm install
```

#### 2. Environment Variables

Create `.env` file:

```env
# Supabase (Required for Auth/DB)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API (Optional - for AI features)
VITE_GEMINI_API_KEY=your_gemini_api_key

# Firebase (Optional - if using Firebase features)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

#### 3. Run Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5173`

### Available Scripts

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run build:dev     # Development build
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run test          # Run tests
npm run test:ui       # Run tests with UI
npm run test:coverage # Generate coverage report
```

### Code Quality

#### Linting

- ESLint with TypeScript support
- React Hooks rules enforced
- Automatic on save (if configured in IDE)

#### Type Safety

- Strict TypeScript mode enabled
- No implicit `any`
- Proper prop types for all components

#### Testing Strategy

- Unit tests for utilities and hooks
- Component tests for UI components
- Integration tests for features
- E2E tests (future)

---

## Common Patterns

### 1. Creating a New Page

```typescript
// src/pages/NewPage.tsx
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
};

export default NewPage;
```

**Add route in `App.tsx`:**

```typescript
import NewPage from "./pages/NewPage";

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

### 2. Using TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';

const MyComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      const response = await fetch('/api/data');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.content}</div>;
};
```

### 3. Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 4. Using Design System Colors

```typescript
// Use CSS variables for theming
<div className="bg-primary text-primary-foreground">
  Primary Button
</div>

// Glass effect
<div className="glass border-border/30">
  Glass Card
</div>

// Gradients
<div className="bg-gradient-primary">
  Gradient Background
</div>
```

### 5. Protected Route Pattern

```typescript
// Wrap component in ProtectedRoute
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## Deployment

### Build Process

```bash
npm run build
```

Output: `dist/` folder (static files)

### Deployment Targets

- **Vercel** (recommended for Vite apps)
- **Netlify**
- **Google Cloud Run** (via `npm run gcloud:deploy`)
- **Static hosting** (serve `dist/` folder)

### Environment Variables

Ensure all `VITE_*` environment variables are set in your deployment platform.

### Build Optimization

- Code splitting (lazy loading)
- Tree shaking (Vite default)
- Minification (production build)
- Asset optimization (images, fonts)

---

## Troubleshooting

### Common Issues

#### 1. Module Not Found Errors

- Check import paths use `@/` alias
- Verify file extensions (`.tsx` for React components)
- Clear `node_modules` and reinstall

#### 2. Type Errors

- Run `npm run build` to see all TypeScript errors
- Check `tsconfig.json` for strict mode settings
- Ensure all dependencies have type definitions

#### 3. Styling Issues

- Verify Tailwind classes are correct
- Check `index.css` for custom CSS variables
- Use browser DevTools to inspect computed styles

#### 4. API Key Errors

- Ensure `.env` file exists in project root
- Prefix all variables with `VITE_`
- Restart dev server after changing `.env`

---

## Next Steps for New Developers

1. **Read the codebase:**
   - Start with `src/App.tsx` (routing)
   - Review `src/pages/Index.tsx` (landing page)
   - Explore `src/components/ui/` (component library)

2. **Run the project:**
   - Set up environment variables
   - Start dev server
   - Navigate through all pages

3. **Make a small change:**
   - Add a new component in `src/components/`
   - Update a page in `src/pages/`
   - Test your changes

4. **Review key files:**
   - `src/index.css` - Design system
   - `src/contexts/AuthContext.tsx` - Authentication
   - `src/pages/InterpreStudy.tsx` - Complex feature example

5. **Ask questions:**
   - Check existing code for patterns
   - Review this document for architecture decisions
   - Reach out to team for clarification

---

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)
- [Supabase Documentation](https://supabase.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Maintained By:** InterpreLab Development Team
