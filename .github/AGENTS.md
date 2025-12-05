# GitHub Copilot Coding Agent Instructions

This file provides context and guidelines for GitHub Copilot coding agents working on this repository.

## Project Overview

This is **InterpreLab Eco Landing Page** - a React-based web application built with modern technologies for language interpretation services. The application includes various features such as landing pages, coaching tools, dashboards, and browser extension integration.

## Technology Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **UI Framework**: shadcn-ui (built on Radix UI primitives)
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: React Query (@tanstack/react-query 5.83.0)
- **Routing**: React Router DOM 6.30.1
- **Backend Integration**: Supabase (@supabase/supabase-js 2.58.0)
- **Form Handling**: React Hook Form 7.61.1 + Zod 3.25.76
- **Charts**: Recharts 2.15.4
- **Icons**: Lucide React 0.462.0

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development (with development mode settings)
npm run build:dev

# Run linter (ESLint)
npm run lint

# Preview production build locally
npm run preview
```

### Testing
The project has test files in various directories:
- Component tests in `src/components/*/__tests__/`
- Hook tests in `src/hooks/__tests__/`

Currently, there is no test runner script in package.json. If adding tests, ensure they follow the existing pattern of placing test files in `__tests__` directories alongside the code they test.

## Project Structure

```
/src
  /assets           # Static assets (images, icons)
  /components       # React components
    /discovery      # Search and discovery features
    /error          # Error handling components
    /lazy           # Lazy loading components
    /navigation     # Navigation components (breadcrumbs, mobile nav, mega menu)
    /ui             # shadcn-ui components
  /contexts         # React context providers
  /data             # Static data and constants
  /hooks            # Custom React hooks
  /integrations     # Third-party integrations
  /lib              # Utility libraries
  /optimized-features # Performance-optimized features
  /pages            # Page components
  /services         # API services and business logic
  /tests            # Test utilities and fixtures
  /types            # TypeScript type definitions
  /utils            # Helper functions and utilities
```

### Key Files
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `components.json` - shadcn-ui component configuration

## Code Style and Best Practices

### TypeScript
- TypeScript is configured with `noImplicitAny: false` and `strictNullChecks: false` for flexibility
- Use path aliases: `@/*` maps to `./src/*`
- Avoid `any` types when possible (ESLint will flag them)
- Type definitions should be placed in `/src/types` directory

### React
- Use functional components with hooks
- Follow React 18 best practices
- Use React Hook Form + Zod for form validation
- Prefer composition over prop drilling; use contexts when needed
- Export components as default exports in most cases
- Keep component files focused - extract complex logic into custom hooks

### Styling
- Use Tailwind CSS utility classes for styling
- Follow the existing design system with shadcn-ui components
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Respect the theming system (supports light/dark mode via next-themes)
- Glass effects and animations are used throughout; maintain consistency

### Component Organization
- Place test files in `__tests__` directories alongside the components
- Group related components in subdirectories (e.g., `/navigation`, `/discovery`)
- UI primitives go in `/components/ui`
- Feature-specific components go in appropriate feature directories

### Imports
- Use path aliases: `@/` for imports from `src/`
- Group imports logically: React, third-party, local components, types, styles
- Use named exports for utilities and hooks
- Use default exports for components (page components, UI components)

### Accessibility
- Include proper ARIA labels and roles
- Ensure keyboard navigation works
- Support reduced motion preferences
- Use semantic HTML elements
- Add focus-visible states for interactive elements

## Git Workflow

### Branch Naming
Follow conventional patterns:
- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation
- `refactor/` for code refactoring
- `test/` for test additions/changes

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, Refactor)
- Keep the subject line under 72 characters
- Reference issue numbers when applicable

## Boundaries and Constraints

### DO
- Make surgical, minimal changes to accomplish the task
- Use existing UI components from `/components/ui` (shadcn-ui)
- Follow the established patterns in similar components
- Maintain consistency with the existing code style
- Add TypeScript types for new code
- Update relevant documentation if changing public APIs
- Test changes locally with `npm run dev` before finalizing
- Run `npm run lint` to check for linting issues
- Use existing utilities and hooks before creating new ones

### DO NOT
- Remove or modify working code unless absolutely necessary
- Change the core architecture or build configuration without discussion
- Add new major dependencies without justification
- Modify files in `node_modules/`
- Change TypeScript strict settings without discussion
- Break existing functionality or remove features
- Ignore existing linting errors you introduce
- Modify `.env` or `.env.production` files (use `.env.example` as reference)
- Touch deployment configuration unless specifically asked
- Modify database schemas or Supabase configuration directly

### Security
- Never commit secrets, API keys, or credentials to the repository
- Use environment variables for sensitive configuration
- Reference `.env.example` for required environment variables
- Validate all user inputs
- Sanitize data before rendering or storing
- Follow OWASP security best practices for web applications

### Performance
- Use lazy loading for heavy components when appropriate
- Optimize images and assets
- Leverage React Query for data fetching and caching
- Avoid unnecessary re-renders
- Use React.memo() judiciously for expensive components
- Keep bundle size in mind when adding dependencies

## Special Considerations

### Supabase Integration
- The project uses Supabase for backend services
- Configuration is in `supabase-client.ts` and `/supabase` directory
- Use existing Supabase client patterns for database operations

### A/B Testing
- The project implements A/B testing for some features (noted in README.md)
- Be mindful of multiple versions of features when making changes
- Maintain consistency across test variants

### Browser Extension
- There is a `/extension` directory for browser extension code
- Changes to extension code may require special consideration for extension APIs

### Documentation
- Many `.md` files in root contain project documentation and status
- Update relevant documentation when making significant changes
- Keep README.md current with project state

## Common Tasks

### Adding a New Component
1. Create the component in the appropriate directory under `/src/components`
2. Use TypeScript for type safety
3. Follow the existing component patterns (shadcn-ui style)
4. Add tests in a `__tests__` directory if the component has complex logic
5. Export the component appropriately
6. Update any necessary index files for easier imports

### Fixing a Bug
1. Understand the root cause before making changes
2. Check if there are related issues or PRs
3. Make minimal changes to fix the specific issue
4. Test the fix locally
5. Ensure no linting errors are introduced
6. Consider if documentation needs updates

### Updating Dependencies
1. Check for breaking changes in changelogs
2. Update package.json version
3. Run `npm install`
4. Test thoroughly - run dev server and build
5. Fix any breaking changes or deprecation warnings
6. Update code to use new APIs if beneficial

### Adding New Pages
1. Create page component in `/src/pages`
2. Add route in the router configuration
3. Follow existing page patterns for layout and structure
4. Ensure responsive design works on mobile
5. Add to navigation if it should be publicly accessible
6. Test navigation flow

## Getting Help

- Review the README.md for project setup and overview
- Check existing similar components for patterns
- Look at related test files for expected behavior
- Review shadcn-ui documentation for UI components: https://ui.shadcn.com/
- Check React Query documentation for data fetching patterns: https://tanstack.com/query/latest
- Review Tailwind CSS documentation: https://tailwindcss.com/docs

## Agent-Specific Guidelines

When working on this repository as a GitHub Copilot coding agent:

1. **Always start by exploring** the relevant files and understanding the context
2. **Make minimal changes** - only modify what's necessary to complete the task
3. **Test your changes** with `npm run dev` and verify they work as expected
4. **Run linting** with `npm run lint` before finalizing your work
5. **Follow established patterns** - look at similar existing code for reference
6. **Commit your changes frequently** with clear, descriptive commit messages
7. **Ask for clarification** if the task is ambiguous or seems to require breaking changes
8. **Document your changes** in commit messages and update relevant documentation

Remember: The goal is to make targeted, high-quality improvements while maintaining the integrity and consistency of the codebase.
