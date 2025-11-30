# Project Folder Hierarchy

This document provides a comprehensive overview of the project's folder structure based on the actual file system access.

## Root Level Structure

```
├── .env.example
├── .env.local
├── .env.production
├── .gitignore
├── bun.lockb
├── components.json
├── Dockerfile
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .git/                          # Git repository files
├── .kiro/                         # Kiro configuration and specs
├── .vscode/                       # VS Code settings
├── build-utils/                   # Build utilities (empty)
├── dist/                          # Build output
├── docs/                          # Documentation files
├── integrations/                  # External integrations
├── node_modules/                  # NPM dependencies
├── public/                        # Static assets
├── src/                           # Source code
├── supabase/                      # Supabase configuration
└── utils/                         # Utility scripts (empty)
```

## Detailed Directory Structure

### .kiro/

```
.kiro/
└── specs/
    └── website-ux-improvements/
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

### integrations/

```
integrations/
└── supabase/
    └── types.ts
```

### public/

```
public/
├── favicon.ico
├── placeholder.svg
└── robots.txt
```

### src/

```
src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
├── assets/
│   ├── extension-preview.jpg
│   ├── hero-interprelab.jpg
│   ├── interpre-hub-mockup.png
│   ├── logo.png
│   └── tech-background.jpg
├── components/
│   ├── ExtensionUI.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Layout.tsx
│   ├── MedicalGlossary.tsx
│   ├── Navigation.tsx
│   ├── ProductShowcase.tsx
│   ├── ProtectedRoute.tsx
│   ├── Resources.tsx
│   ├── SolutionHero.tsx
│   ├── StatsSection.tsx
│   ├── Testimonials.tsx
│   ├── ThemeToggle.tsx
│   ├── VideoSection.tsx
│   ├── dashboard/
│   │   ├── ai-insights.tsx
│   │   ├── call-type-chart.tsx
│   │   ├── manual-log.tsx
│   │   ├── recent-calls.tsx
│   │   ├── stats-cards.tsx
│   │   ├── weekly-chart.tsx
│   │   └── optimized-features/
│   │       ├── ai-insights.tsx
│   │       ├── call-type-chart.tsx
│   │       ├── earnings-projection.tsx
│   │       ├── goals-tracker.tsx
│   │       ├── integration-status.tsx
│   │       ├── learning-progress.tsx
│   │       ├── manual-log.tsx
│   │       ├── performance-heatmap.tsx
│   │       ├── platform-comparison.tsx
│   │       ├── premium-stats-overview.tsx
│   │       ├── premium-upgrade-card.tsx
│   │       ├── recent-calls.tsx
│   │       ├── stats-cards.tsx
│   │       └── weekly-chart.tsx
│   ├── error/
│   │   ├── ErrorBoundary.tsx
│   │   └── __tests__/
│   │       └── ErrorBoundary.test.ts
│   ├── lazy/
│   │   ├── LazyCallTypeChart.tsx
│   │   ├── LazyComponent.tsx
│   │   ├── LazyImage.tsx
│   │   ├── LazyVideoSection.tsx
│   │   ├── LazyWeeklyChart.tsx
│   │   ├── ResponsiveImage.tsx
│   │   └── __tests__/
│   │       ├── LazyComponent.test.ts
│   │       └── LazyImage.test.ts
│   ├── loading/
│   │   ├── ProgressIndicator.tsx
│   │   └── SkeletonLoader.tsx
│   ├── navigation/
│   │   ├── BreadcrumbNavigation.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── MobileNavigation.tsx
│   │   └── __tests__/
│   │       ├── BreadcrumbNavigation.test.tsx
│   │       ├── index.test.tsx
│   │       ├── MegaMenu.test.tsx
│   │       └── MobileNavigation.test.tsx
│   ├── study/
│   │   ├── FlashcardComponent.tsx
│   │   ├── ProgressTracker.tsx
│   │   └── QuizComponent.tsx
│   ├── track/
│   │   ├── GoalSetting.tsx
│   │   └── PerformanceInsights.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       └── use-toast.ts
├── contexts/
│   ├── AuthContext.tsx
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
├── data/
│   └── navigationData.ts
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   ├── useBreadcrumbs.ts
│   ├── useCallStats.ts
│   ├── useCallTracker.ts
│   ├── useImageOptimization.ts
│   └── __tests__/
│       └── useBreadcrumbs.test.ts
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── lib/
│   ├── data.ts
│   ├── imageOptimization.ts
│   ├── types.ts
│   ├── utils.ts
│   └── validations.ts
├── pages/
│   ├── About.tsx
│   ├── CallTracker.tsx
│   ├── Careers.tsx
│   ├── Contact.tsx
│   ├── Dashboard.tsx
│   ├── GetInTouch.tsx
│   ├── Index.tsx
│   ├── InterpreBot.tsx
│   ├── InterpreCoach.tsx
│   ├── InterpreHub.tsx
│   ├── InterpreLink.tsx
│   ├── InterpreStudy.tsx
│   ├── InterpreTrack.tsx
│   ├── NotFound.tsx
│   ├── Resources.tsx
│   ├── Settings.tsx
│   ├── SignIn.tsx
│   └── Waitlist.tsx
├── tests/
│   └── performanceTests.ts
├── types/
│   └── navigation.ts
└── utils/
    └── testRunner.ts
```

### supabase/

```
supabase/
├── config.toml
└── migrations/
    ├── 20241205000000_complete_interprelab_schema.sql
    ├── 20251002162447_3df7a49c-da01-4f29-9417-36cff580e6ef.sql
    ├── 20251002162539_49b8b89a-900b-437a-8fad-5008d192c86d.sql
    ├── 20251003152906_6458ce7b-99be-4741-951d-428ca431a522.sql
    ├── 20251101001710_add_call_records_and_user_preferences.sql
    └── README.md
```

### dist/ (Build Output)

```
dist/
├── favicon.ico
├── index.html
├── placeholder.svg
├── robots.txt
└── assets/
    ├── index-B15mhuTh.js
    ├── index-B15mhuTh.js.map
    ├── index-Cll9mF2M.css
    ├── vendor-BrC5XCCU.js
    └── vendor-BrC5XCCU.js.map
```

## Key Observations

### Missing Directories from File Tree

The following directories appear in the file tree but are empty:

- `build-utils/` - Empty directory
- `utils/` - Empty directory

### Previously Missing but Now Found

The following directories were initially missed but have been added to the hierarchy:

- `src/components/ui/` - Complete shadcn/ui component library (47 components)
- `src/components/dashboard/` - Dashboard components with optimized-features subdirectory
- `src/integrations/supabase/` - Supabase client and types

### Test Structure

The project has a distributed test structure with `__tests__` directories in:

- `src/components/lazy/__tests__/`
- `src/components/navigation/__tests__/`
- `src/hooks/__tests__/`
- `src/components/error/__tests__/` (referenced in open files)

### Configuration Files

The project includes comprehensive configuration for:

- **TypeScript**: Multiple tsconfig files for different environments
- **Build Tools**: Vite, PostCSS, Tailwind CSS
- **Linting**: ESLint configuration
- **Package Management**: Both npm (package-lock.json) and Bun (bun.lockb)
- **Deployment**: Docker, GCP Cloud Run setup
- **Database**: Supabase with migration files

### Kiro Specs

The `.kiro/specs/website-ux-improvements/` directory contains:

- `requirements.md` - Feature requirements
- `design.md` - Design specifications
- `tasks.md` - Implementation tasks

This structure suggests an active development workflow using Kiro's spec-driven development approach.
