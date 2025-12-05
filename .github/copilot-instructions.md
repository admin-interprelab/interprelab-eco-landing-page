# GitHub Copilot Instructions for InterpreLab Eco Landing Page

## Project Overview

This is the InterpreLab Eco landing page - a React-based web application showcasing language learning and interpretation tools. The project includes multiple product showcases (InterpreBot, InterpreStudy, InterpreCoach, InterpreWellness) and various features for language learners and interpreters.

**Project URL**: https://lovable.dev/projects/61694cb5-bbd8-44b1-aa9e-2b4cead1a91a

## Technology Stack

- **Framework**: React 18.3.1 with TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **UI Library**: shadcn-ui with Radix UI components
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: React Context API, TanStack Query
- **Router**: React Router DOM 6.30.1
- **Backend**: Supabase
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts

## File Structure

```
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ui/           # shadcn-ui components
│   │   ├── [feature]/    # Feature-specific components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React Context providers
│   ├── services/         # API and service layers
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── integrations/     # Third-party integrations (Supabase)
│   ├── assets/           # Static assets (images)
│   └── main.tsx          # Application entry point
├── .github/              # GitHub configuration
├── public/               # Public static files
└── supabase/             # Supabase configuration
```

## Development Workflow

### Setup Commands
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173 by default)
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Code Quality
- **Always run linting** before committing: `npm run lint`
- Fix ESLint errors and warnings
- TypeScript strict mode is partially enabled (see tsconfig.json)

## Code Style and Conventions

### TypeScript
- Use TypeScript for all new files (`.tsx` for components, `.ts` for utilities)
- Define types in `src/types/` for shared type definitions
- Use interfaces for object shapes, types for unions/intersections
- Avoid `any` when possible (though `noImplicitAny: false` is set)

### React Components
- Use functional components with hooks
- Follow component structure:
  ```tsx
  // imports
  import { useState } from "react";
  import { ComponentProps } from "@/types/[feature]";
  
  // types/interfaces
  interface MyComponentProps {
    // ...
  }
  
  // component
  export const MyComponent = ({ prop }: MyComponentProps) => {
    // hooks
    const [state, setState] = useState();
    
    // handlers
    const handleClick = () => {
      // ...
    };
    
    // render
    return (
      // JSX
    );
  };
  ```

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use shadcn-ui components from `@/components/ui`
- Component variants with `class-variance-authority`
- Utility function `cn()` from `@/lib/utils` for class merging

### File Naming
- Components: PascalCase (e.g., `FeatureCard.tsx`)
- Utilities/services: camelCase (e.g., `therapeuticAnalytics.ts`)
- Pages: PascalCase (e.g., `InterpreBot.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useScrollAnimation.ts`)

### Import Paths
- Use `@/` alias for imports from `src/`
- Example: `import { Button } from "@/components/ui/button"`

### State Management
- Use React Context for global state (see `src/contexts/`)
- Use TanStack Query for server state
- Local component state with `useState` and `useReducer`

### Forms
- Use React Hook Form for form management
- Use Zod for schema validation
- Form validation schemas in `src/lib/validations.ts`

## Accessibility

- Include proper ARIA labels
- Ensure keyboard navigation works
- Use semantic HTML elements
- Support reduced motion preferences
- Add focus-visible states for interactive elements
- Test with screen readers when adding new features

## Performance

- Use lazy loading for routes and heavy components
- Optimize images (see `src/lib/imageOptimization.ts`)
- Implement loading states for async operations
- Use passive event listeners for scroll events
- Avoid unnecessary re-renders

## Security Guidelines

**NEVER:**
- Commit API keys, secrets, or credentials to the repository
- Expose sensitive user data in client-side code
- Store authentication tokens in localStorage (use secure, httpOnly cookies when possible)
- Include `.env` files with real credentials in commits

**ALWAYS:**
- Use environment variables for configuration (`.env.example` as template)
- Validate and sanitize user inputs
- Follow security best practices for authentication with Supabase
- Check for XSS vulnerabilities in user-generated content

## Testing

- Test files located in `src/tests/` and `src/hooks/__tests__/`
- Manual testing workflow:
  1. Run `npm run dev`
  2. Navigate to http://localhost:5173
  3. Test the specific feature/component
  4. Check browser console for errors
  5. Test responsive design at different breakpoints

## A/B Testing Note

This project implements two versions of InterpreCoach for A/B testing:
1. Current version in `/interprecoach` route
2. Agentic version (multi-agent system) - currently removed for performance comparison

When working on InterpreCoach features, be aware of this testing context.

## Boundaries and Restrictions

**DO NOT:**
- Delete or modify working code without explicit reason
- Remove existing tests
- Change the build configuration without necessity
- Modify `.github/workflows/` without understanding CI/CD impact
- Edit Supabase schema without coordination
- Change package versions arbitrarily
- Create unnecessary abstraction layers
- Add new dependencies without justification

**DO:**
- Make minimal, focused changes
- Preserve existing functionality
- Follow established patterns in the codebase
- Update documentation when making significant changes
- Ask for clarification if requirements are unclear

## Common Patterns

### Creating a New Page
1. Create component in `src/pages/[PageName].tsx`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`
4. Add page-specific types in `src/types/`

### Adding a New Feature Component
1. Create component directory in `src/components/[feature-name]/`
2. Create component file(s)
3. Export from index file if needed
4. Add to parent component/page

### Custom Hooks
1. Create hook file in `src/hooks/use[HookName].ts`
2. Follow React hooks rules
3. Add tests in `src/hooks/__tests__/`

### API Integration
1. Add service functions in `src/services/`
2. Use Supabase client from `src/integrations/supabase/`
3. Handle errors gracefully
4. Show loading states

## Environment Variables

Required environment variables (see `.env.example`):
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- Additional API keys as needed

## Resources

- [Lovable Project](https://lovable.dev/projects/61694cb5-bbd8-44b1-aa9e-2b4cead1a91a)
- [shadcn-ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)

## Support

This project is built with Lovable. Changes can be made via:
1. Lovable web interface
2. Local development with git push
3. GitHub Codespaces
4. Direct GitHub file editing

All methods sync automatically with the Lovable project.
