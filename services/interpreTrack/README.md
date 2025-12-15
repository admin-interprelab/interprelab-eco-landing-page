# InterpreTrack Service

## Overview

InterpreTrack is a dedicated microservice for interpreter earnings tracking and call logging.

## Development

### Prerequisites

- Node.js 18+
- npm

### Commands

- `npm run dev`: Start development server (port 3005)
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run test`: Run Vitest unit tests

## Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Microservice Type**: Client-side application (serves as a feature module)
- **State Management**: React Query (planned)
- **Routing**: React Router (basename `/interpretrack`)

## Directory Structure

- `src/components`: Reusable UI components
- `src/pages`: Page views (Dashboard, Logs, Calculator)
- `src/lib`: Shared utilities and UI library code
- `src/test`: Test setup and configuration
