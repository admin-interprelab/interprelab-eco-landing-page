from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting interpreCoach backend...")
    
    # =========================================================================
    # TODO: AGENT IMPLEMENTATION GUIDE - REAL-TIME ASSISTANT
    # =========================================================================
    # 1. WebSocket Endpoint (in `app/api/stream.py`):
    #    - Route: WebSocket /ws/audio/{client_id}
    #    - Protocol:
    #      a. Accept WebSocket connection.
    #      b. Receive binary audio chunks (or base64 encoded JSON) from Browser Extension.
    #      c. Buffer chunks if necessary (e.g. 500ms window).
    #      d. Send to Google Speech-to-Text (Streaming) OR Whisper (Local/API).
    #      e. On Transcript:
    #         - Extract keywords (using spaCy or simple Regex/Lookup).
    #         - Query Supabase `terminology` table for matches.
    #      f. Send JSON back to Client:
    #         {
    #           "transcript": "Partial sentence...",
    #           "suggestions": [
    #             { "term": "Myocarditis", "translation": "Inflammación del corazón", "context": "..." }
    #           ]
    #         }
    #
    # 2. Terminology Lookup (in `app/api/lookup.py`):
    #    - Implement fast semantic search using pgvector (if setup) or ILIKE queries on Supabase.
    # =========================================================================

    yield
    # Shutdown
    logger.info("Shutting down interpreCoach backend...")

# Create FastAPI app
app = FastAPI(
    title="InterpreCoach Backend API",
    description="Real-time AI assistance service for medical interpreters",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3004",  # Local frontend
        "http://localhost:5173",  # Landing service
        "https://interprecoach.run.app",  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "interprecoach-backend",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for Cloud Run"""
    return {
        "status": "healthy",
        "service": "interprecoach-backend"
    }

# TODO: Import and include API routers
# from app.api import streaming, lookup
# app.include_router(streaming.router, prefix="/api")
# app.include_router(lookup.router, prefix="/api")
