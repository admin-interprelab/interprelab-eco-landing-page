# Project Structure and File Relationships

This document provides an overview of the folder structure and how the key files in the `interprelab-eco-landing-page` project are related to each other.

## Folder Scaffolding

The project follows a standard structure for a React/Vite application with some additional configuration and documentation files at the root level.

```
interprelab-eco-landing-page/
├── GCP_CLOUDRUN_DEPLOY.md
├── GCP_FORM_SETUP.md
├── GCP_SETUP.md
├── node_modules/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── toast.ts
│   ├── contexts/
│   │   └── AuthContext.ts
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── useCallTracker.ts
│   └── integrations/
│       └── supabase/
│           └── client.ts
├── integrations/
│   └── firebase/
│       └── types.ts
├── tailwind.config.ts
└── vite.config.ts
```

## File Descriptions and Relationships

### Root Directory

-   **`vite.config.ts`**: The configuration file for Vite, the build tool. It defines the project setup, plugins (like `@vitejs/plugin-react-swc`), and notably sets up a path alias `@{...}` to point to the `./src` directory.

-   **`tailwind.config.ts`**: The configuration file for Tailwind CSS. It defines the theme (colors, fonts, etc.), plugins, and paths to files that contain Tailwind classes.

-   **`GCP_*.md`**: These are markdown files containing documentation for deploying the application and setting up backend services on Google Cloud Platform.
    -   `GCP_CLOUDRUN_DEPLOY.md`: Instructions for containerizing the app with Docker and deploying to Google Cloud Run.
    -   `GCP_FORM_SETUP.md` & `GCP_SETUP.md`: Guides for creating a serverless Cloud Function to handle form submissions and send email notifications via SendGrid.

### `src` Directory

This is the main application source code directory.

-   **`src/hooks/useCallTracker.ts`**: A custom React hook responsible for tracking the duration and earnings of a call.
    -   It uses `useState`, `useEffect`, and `useRef` for state management and side effects.
    -   **Dependencies**:
        -   `@/integrations/supabase/client`: To interact with the Supabase database for loading user settings and saving call logs.
        -   `@/contexts/AuthContext`: To get the current authenticated user's data.
        -   `@/hooks/use-toast`: To display toast notifications when a call starts, ends, or an error occurs.

-   **`src/hooks/use-toast.ts`**: A custom hook for managing and displaying toast notifications. It implements a reducer pattern to handle toast state (add, update, dismiss, remove). This is a common pattern for global state management of UI elements like toasts.
    -   **Dependencies**:
        -   `@/components/ui/toast`: Relies on the UI component for rendering the actual toast.

### `integrations` Directory

This directory seems intended for third-party service integrations.

> **Note:** There appears to be a structural inconsistency. An `integrations` directory exists both at the root level and inside `src`. Furthermore, the Supabase types are located in a `firebase` subdirectory.

-   **`integrations/firebase/types.ts`**: This file contains the auto-generated TypeScript types for your **Supabase** database schema. It defines the structure for tables (`call_logs`, `user_settings`, etc.), enums, and functions.
    -   **Relationship**: These types provide type safety when querying the Supabase database from anywhere in the application, such as in `useCallTracker.ts`.
    -   **Observation**: The file path `integrations/firebase/types.ts` is misleading as the content is for Supabase. It might be clearer if it were moved to `src/integrations/supabase/types.ts` to align with the import paths and colocate it with other Supabase-related code.

-   **`src/integrations/supabase/client.ts`** (Inferred): This file (not provided in context but imported by `useCallTracker.ts`) is responsible for initializing and exporting the Supabase client, which is the central point for all database interactions.