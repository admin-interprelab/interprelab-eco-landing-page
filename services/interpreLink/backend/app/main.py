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
    logger.info("Starting interpreLink backend...")
    
    # =========================================================================
    # TODO: AGENT IMPLEMENTATION GUIDE - COMMUNITY & RESOURCES
    # =========================================================================
    # 1. Community Posts Endpoint (in `app/api/forum.py`):
    #    - Route: POST /api/v1/posts
    #    - Input: JSON { "author_id", "content", "tags" }
    #    - Logic:
    #      a. AI Moderation Check (Gemini):
    #         - Prompt: "Analyze this text for toxic/unprofessional content. Return BOOL."
    #         - If Toxic -> Reject.
    #      b. Insert into Supabase `posts` table.
    #
    # 2. Resource Library (in `app/api/resources.py`):
    #    - Route: GET /api/v1/resources/search?q={query}
    #    - Logic:
    #      - Perform full-text search on Supabase `resources` table.
    #      - Optional: Use Gemini to summarize the search results.
    # =========================================================================

    yield
    # Shutdown
    logger.info("Shutting down interpreLink backend...")

# Create FastAPI app
app = FastAPI(
    title="InterpreLink Backend API",
    description="AI-powered community moderation and matching service",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",  # Local frontend
        "http://localhost:5173",  # Landing service
        "https://interprelink.run.app",  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "interprelink-backend",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for Cloud Run"""
    return {
        "status": "healthy",
        "service": "interprelink-backend"
    }

# TODO: Import and include API routers
# from app.api import moderation, matching
# app.include_router(moderation.router, prefix="/api")
