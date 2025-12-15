# InterpreLab ASL Teacher Service

This service provides an AI-powered platform for learning and practicing American Sign Language (ASL), specifically designed for medical interpreters. It leverages real-time hand pose detection and gesture recognition to provide instant feedback.

## Overview

The ASL Teacher microservice offers:
-   **Interactive Learning**: Practice ASL signs for individual letters.
-   **Real-time Feedback**: Utilizes TensorFlow.js for hand pose estimation and Fingerpose for gesture recognition to provide immediate visual feedback on sign accuracy.
-   **Progress Tracking**: (Future: Integration with user profiles via Supabase to track learning progress).

## Tech Stack

-   **Frontend**: React + Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS + shadcn/ui
-   **AI/ML**: TensorFlow.js, Handpose Model, Fingerpose Library
-   **Production Server**: Nginx (serving static assets)
-   **Deployment**: Google Cloud Run

## Architecture

This is a standalone React SPA (Single Page Application) that is containerized with Docker and served via Nginx. It operates as an independent microservice within the InterpreLab ecosystem.

## Commands

### Development
```bash
npm install
npm run dev
```
(Access via `http://localhost:3008/asl-teacher`)

### Build
```bash
npm run build
```

### Deployment
To deploy this service individually to Google Cloud Run:

```powershell
./deploy-cloud-run.ps1 # (Requires project-specific Cloud Run config)
```
*Note: For full system deployment, refer to the root `deploy-all.ps1` script.*