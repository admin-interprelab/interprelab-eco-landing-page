# InterpreLab Project - Organization Overview

This document provides a detailed overview of the existing file structure and organization of the InterpreLab repository.

## Root Directory

- `package.json`: Project dependencies and scripts (Vite, React, TypeScript, Tailwind).
- `vite.config.ts`: Vite build configuration.
- `vitest.config.ts`: Test configuration.
- `tailwind.config.js`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.
- `README.md`: General project information.

## Source Directory (`src/`)

### Core Application

- `App.tsx`: Main application component, handles routing and global providers.
- `main.tsx`: Entry point, mounts the React application.
- `index.css`: Global styles, Tailwind directives, and CSS variables (Theming).
- `vite-env.d.ts`: Vite environment type definitions.

### Pages (`src/pages/`)

Contains top-level page components mapped to routes.

- `Index.tsx`: Refactored Landing Page (Hero, Features, Certs, etc.).
- `InterpreBot.tsx`: AI Skills Assessment page.
- `InterpreCoach.tsx`: Real-time AI assistant page.
- `InterpreStudy.tsx`: Interactive Training Hub (newly integrated).
- `InterpreLink.tsx`: Community network page.
- `Dashboard.tsx`: User dashboard (protected).
- `Settings.tsx`: User settings.
- `SignIn.tsx`: Authentication page.
- `Waitlist.tsx`: Waitlist signup.
- `About.tsx`, `Contact.tsx`, `Resources.tsx`: Static informational pages.
- `Dilemma.tsx`: Ethical dilemma specific page.
- `NotFound.tsx`: 404 Error page.
- `InterpreTrack.tsx`: Lazy-loaded tracking feature.

### Components (`src/components/`)

Reusable UI components and feature-specific blocks.

- `ui/`: shadcn/ui generic components (Button, Card, Badge, etc.).
- `landing/`: Landing page specific sections.
  - `Hero.tsx`: Main hero banner.
  - `StoryDrivenVideoHero.tsx`: Interactive video storytelling components.
  - `ProductShowcase.tsx`: Feature comparison and links.
  - `CertificatesPremium.tsx`: Certification accreditation and pricing.
  - `Testimonials.tsx`: User social proof.
  - `StatsSection.tsx`: Statistical impact data.
- `features/`: Feature-specific logic.
  - `InterpreTrack/`: Components for the tracking feature.
  - `InterpreStudy/`: Components for the study hub.
- `sections/`: Generic page sections.
  - `FAQ/`: FAQ components.
  - `WellnessSection.tsx`: Wellness specific content.
  - `QAFeedbackSection.tsx`: QA feedback content.
- `Navigation.tsx`: Main site navigation bar.
- `Footer.tsx`: Site footer.
- `ProtectedRoute.tsx`: Auth wrapper for protected routes.

### Modules (`src/modules/`)

Business logic and standalone feature modules.

- (Contains 20+ children, likely core business logic providers or helpers for specific features like the AI tools).

### Contexts (`src/contexts/`)

React Context providers for global state.

- `AuthContext.tsx`: Authentication state.
- `LanguageContext.tsx`: Global language settings.

### Hooks (`src/hooks/`)

Custom React hooks.

- (Contains shared logic like `use-toast` etc.).

### Lib & Utils (`src/lib/`, `src/utils/`)

- `lib/utils.ts`: Utility functions (e.g., `cn` for Tailwind class merging).
- `integrations/`: Third-party integration clients (Supabase, Firebase, Gemini).

### Assets (`src/assets/`)

Static assets like images and global fonts.

## Key Features Integration

- **InterpreStudy**: Integrated into `src/pages/InterpreStudy.tsx` and linked via `App.tsx` and `ProductShowcase.tsx`.
- **InterpreBot/Coach/Link**: Existing core features in `src/pages/`.
- **InterpreTrack**: Lazy loaded for performance.
