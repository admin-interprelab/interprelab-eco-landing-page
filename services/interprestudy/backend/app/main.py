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
    logger.info("Starting interpreStudy backend...")
    
    # =========================================================================
    # TODO: AGENT IMPLEMENTATION GUIDE - COURSE GENERATION
    # =========================================================================
    # 1. Initialize Gemini Client:
    #    - Model: `gemini-1.5-pro` (Good for long context/complex JSON)
    #
    # 2. Implement Course Generator Endpoint (in `app/api/study.py`):
    #    - Route: POST /api/generate/course
    #    - Input: `topic: str` (e.g. "Cardiology Basics") or `file: UploadFile` (PDF)
    #    - Logic:
    #      a. Generate Outline:
    #         - Prompt: "Create a 5-module curriculum for {topic}. Return JSON list of module titles."
    #      b. Generate Content (Loop through modules):
    #         - Prompt: "For module '{module_title}', generate 3 lessons. Each lesson should have:
    #           - Title
    #           - Content (Markdown)
    #           - Key Terminology List
    #           - 3-Question Quiz (JSON)"
    #      c. Construct Full Course JSON.
    #
    # 3. Database Persistence:
    #    - Insert into Supabase tables: `courses` -> `modules` -> `lessons`.
    #    - Return `course_id` to frontend.
    # =========================================================================

    yield
    # Shutdown
    logger.info("Shutting down interpreStudy backend...")

# Create FastAPI app
app = FastAPI(
    title="InterpreStudy Backend API",
    description="AI-powered learning content generation service",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3002",  # Local frontend
        "http://localhost:5173",  # Landing service
        "https://interprestudy.run.app",  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "interprestudy-backend",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for Cloud Run"""
    return {
        "status": "healthy",
        "service": "interprestudy-backend"
    }

# API Routers
from app.api import study
app.include_router(study.router, prefix="/api")
