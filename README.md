# InterpreLab

InterpreLab is a cutting-edge, AI-driven training and real-time assistance platform for medical interpreters, focused on human skill optimization and bridging critical communication gaps in healthcare.

## Features

- **InterpreBot 🤖**: AI Training & Assessment with deep linguistic analysis.
- **InterpreCoach 🎧**: Real-Time AI Assistance with terminology management and voice training.
- **InterpreTrack 📊**: Comprehensive dashboard for tracking calls, earnings, and performance metrics.
- **InterpreLinks 🤝**: Professional network and resource library for interpreters.

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router
- **Backend / BaaS**: Firebase (Auth, Firestore)
- **Testing**: Vitest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd interprelab-eco-landing-page
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Firebase configuration keys (see `.env.example` or project settings).

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Testing

Run the test suite with:

```bash
npm test
```

For UI mode:

```bash
npm run test:ui
```

## Architecture

The project follows a modular architecture. Key modules are located in `src/modules/`.
See [ARCHITECTURE_FLOWMAP.md](./ARCHITECTURE_FLOWMAP.md) for a detailed overview of the system architecture and data flow.

### Directory Structure

- `src/components`: Shared UI components.
- `src/modules`: Feature-specific modules (e.g., `interpretrack`).
- `src/pages`: Page components.
- `src/services`: External services (Firebase, etc.).
- `src/utils`: Utility functions.

## Build & Deployment

To build the project for production:

```bash
npm run build
```

The output will be in the `dist` directory.
