# InterpreLab Landing Service

The main landing page and entry point for the InterpreLab ecosystem.

## Overview

This service hosts the public-facing marketing site, product showcases, and entry points for the various InterpreLab applications (InterpreBot, InterpreCoach, etc.).

- **Status**: Production Ready (Dec 2025)
- **Integration**: Merged features from `interprelab-fluent-flow` and verified styling from `the-interpreter-dilemma`.
- **Navigation**: Verified routing to `/interprestudy`, `/dashboard`, and other microservices.

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Production Server**: Nginx (serving static assets)
- **Deployment**: Google Cloud Run

## Architecture

This is a standalone React SPA (Single Page Application) that is containerized with Docker and served via Nginx. It is designed to be the "Front Door" of the microservices architecture.

## Commands

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Deployment
To deploy this service individually to Google Cloud Run:

```powershell
./deploy-cloud-run.ps1
```

*Note: For full system deployment, refer to the root `deploy-all.ps1` script.*
