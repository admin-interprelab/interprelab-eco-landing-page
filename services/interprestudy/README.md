# InterpreStudy (Training Platform) Microservice

InterpreStudy is a comprehensive Learning Management System (LMS) designed for interpreter training. It features AI-generated curriculum, interactive modules, and progress tracking.

## Architecture

This service follows a 3-layer architecture:

```mermaid
graph TD
    subgraph "Frontend Layer (Vite/React)"
        UI[User Interface]
        LMS[Course Player]
    end

    subgraph "Backend Layer (FastAPI)"
        API[FastAPI Service<br/>Port: 800X]
        GenAI[Curriculum Generator<br/>(Gemini 1.5 Pro)]
    end

    subgraph "Data Layer (Supabase)"
        DB[(PostgreSQL)]
        Auth[Authentication]
    end

    UI --> LMS
    LMS --> API
    API --> GenAI
    GenAI --> DB
    UI --> Auth
```

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
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
