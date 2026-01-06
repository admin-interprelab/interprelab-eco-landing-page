# InterpreCoach (Real-time Assistant) Microservice

InterpreCoach is a browser-extension-based assistant that provides real-time terminology support, acoustic analysis, and predictive insights during interpretation sessions.

## Architecture

This service follows a 3-layer architecture:

```mermaid
graph TD
    subgraph "Frontend Layer (Chrome Extension)"
        Ext[Browser Extension<br/>(Content Script & Sidepanel)]
        Audio[Audio Capture]
    end

    subgraph "Backend Layer (FastAPI)"
        API[FastAPI Service<br/>Port: 800X]
        Stream[WebSocket Manager]
        NLP[Term Injection &<br/>Live Transcription]
    end

    subgraph "Data Layer (Supabase)"
        DB[(PostgreSQL)]
        Settings[User Preferences]
    end

    Ext --> Audio
    Audio --"WebSocket Stream"--> Stream
    Stream --> NLP
    NLP --> DB
    Ext --> Settings
```

## Tech Stack

- **Frontend**: React (Vite), Chrome Extension API
- **Backend**: Python (FastAPI), WebSocket
- **Database**: Supabase (PostgreSQL)

## Getting Started

1. **Frontend**:

    ```bash
    npm install
    npm run build
    # Load 'dist' folder as unpacked extension in Chrome
    ```

2. **Backend**:

    ```bash
    cd backend
    python -m venv venv
    ./venv/Scripts/activate
    pip install -r requirements.txt
    fastapi dev app/main.py
    ```
