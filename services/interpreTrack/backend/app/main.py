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
    logger.info("Starting interpreTrack backend...")
    
    # =========================================================================
    # TODO: AGENT IMPLEMENTATION GUIDE - ANALYTICS & AGGREGATION
    # =========================================================================
    # 1. Data Ingestion Endpoint (in `app/api/report.py`):
    #    - Route: POST /api/v1/log-session
    #    - Input: JSON
    #      {
    #        "user_id": "uuid",
    #        "session_type": "practice" | "live",
    #        "duration_seconds": 120,
    #        "terms_used": 15,
    #        "accuracy_score": 85
    #      }
    #    - Logic:
    #      a. Validate input.
    #      b. Async write to Supabase `session_logs` table.
    #      c. Trigger recalculation of User Stats (or let a Supabase Trigger do it).
    #
    # 2. Aggregation Logic:
    #    - Endpoint: GET /api/v1/stats/{user_id}
    #    - Logic:
    #      - Query `session_logs` for last 30 days.
    #      - Calculate: Total Hours, Average Accuracy, Most Used Terms.
    #      - Return JSON for Recharts visualization.
    # =========================================================================

    yield
    # Shutdown
    logger.info("Shutting down interpreTrack backend...")

# Create FastAPI app
app = FastAPI(
    title="InterpreTrack Backend API",
    description="AI-powered call tracking and analytics service",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3003",  # Local frontend
        "http://localhost:5173",  # Landing service
        "https://interpretrack.run.app",  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "interpretrack-backend",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for Cloud Run"""
    return {
        "status": "healthy",
        "service": "interpretrack-backend"
    }

# TODO: Import and include API routers
# from app.api import categorize, reports
# app.include_router(categorize.router, prefix="/api")
