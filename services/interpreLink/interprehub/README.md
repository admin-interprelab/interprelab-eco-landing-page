# InterpreLink (App Hub) Microservice

InterpreLink is the central community and resource hub for InterpreLab, offering forums, job boards, and professional networking features.

## Architecture

This service follows a 3-layer architecture:

```mermaid
graph TD
    subgraph "Frontend Layer (Vite/React)"
        UI[User Interface]
        Forum[Social Feed]
    end

    subgraph "Backend Layer (FastAPI)"
        API[FastAPI Service<br/>Port: 800X]
        Mod[AI Content Moderation]
        Recs[Recommendation Engine]
    end

    subgraph "Data Layer (Supabase)"
        DB[(PostgreSQL)]
        Social[Social Graph]
    end

    UI --> Forum
    Forum --> API
    API --> Mod
    API --> Recs
    Mod --> DB
    Recs --> Social
```

## Tech Stack

- **Frontend**: React, TanStack Query
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
