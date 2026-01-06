# InterpreSigns (ASL Teacher) Microservice

InterpreSigns is an AI-powered American Sign Language (ASL) training platform that uses computer vision to track hand movements and provide real-time feedback.

## Architecture

This service follows a 3-layer architecture:

```mermaid
graph TD
    subgraph "Frontend Layer (Vite/React)"
        UI[User Interface]
        CV[Computer Vision Lib<br/>(TensorFlow.js / MediaPipe)]
    end

    subgraph "Backend Layer (FastAPI)"
        API[FastAPI Service<br/>Port: 800X]
        Logic[Progress & Verification Logic]
    end

    subgraph "Data Layer (Supabase)"
        DB[(PostgreSQL)]
        Auth[Authentication]
    end

    UI --> CV
    CV --> Logic
    Logic --> DB
    UI --> Auth
```

## Tech Stack

- **Frontend**: React, TensorFlow.js/Handpose, Tailwind CSS
- **Backend**: Python (FastAPI)
- **Database**: Supabase (PostgreSQL)

## Getting Started

1. **Frontend**:

    ```bash
    npm install
    npm run dev
    ```

2. **Backend**:

    ```bash
    cd backend
    python -m venv venv
    ./venv/Scripts/activate
    pip install -r requirements.txt
    fastapi dev app/main.py
    ```
