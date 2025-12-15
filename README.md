# InterpreLab

InterpreLab is a cutting-edge, AI-driven training and real-time assistance platform for medical interpreters.

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
- **Backend / BaaS**: **Supabase** (Auth, Database, Realtime)
- **AI Services**: Python, FastAPI, Gemini, Claude, Whisper

## Architecture

The project follows a **microservices architecture**.
See `GEMINI.md` for the comprehensive Knowledge Base and Project Status.
See `docs/` for detailed architectural diagrams and deployment guides.

## Getting Started

1.  **Prerequisites**: Node.js (v18+), npm, Python 3.11+ (for backends).
2.  **Installation**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Copy `.env.example` to `.env` and configure your Supabase credentials.
4.  **Development**:
    ```bash
    npm run dev
    ```

## Deployment

Use the provided PowerShell script for automated deployment to Google Cloud Run:

```powershell
./deploy-all.ps1
```

See `docs/PRE-DEPLOYMENT-CHECKLIST.md` before deploying.