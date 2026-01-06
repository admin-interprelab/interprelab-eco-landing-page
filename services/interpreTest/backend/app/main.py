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
    logger.info("Starting interpreTest backend...")
    
    # =========================================================================
    # TODO: AGENT IMPLEMENTATION GUIDE - CORE ASSESSMENT LOGIC
    # =========================================================================
    # 1. Initialize Gemini Client:
    #    - Import `google.generativeai`
    #    - Load API key from env `GEMINI_API_KEY`
    #    - Configure model: `gemini-1.5-pro`
    #
    # 2. Implement Audio Analyis Endpoint (in `app/api/analysis.py`):
    #    - Route: POST /api/v1/assess/audio
    #    - Input: `file: UploadFile` (audio/wav, audio/mp3)
    #    - Logic:
    #      a. Save temp file or stream bytes.
    #      b. Transcribe Audio (using Gemini Audio capability or Whisper).
    #      c. Analyze Transcription & Audio:
    #         - Prompt: "You are a medical interpreter examiner. Analyze this audio for:
    #           1. Grammatical accuracy (Verb tenses, syntax)
    #           2. Medical terminology precision
    #           3. Tone/Professionalism"
    #      d. Return JSON Structure:
    #         {
    #           "score": 0-100,
    #           "transcription": "...",
    #           "feedback": { "grammar": ["..."], "vocab": ["..."] },
    #           "strengths": ["..."],
    #           "improvements": ["..."]
    #         }
    #
    # 3. Database Integration:
    #    - Save the result to Supabase table `assessments`.
    # =========================================================================

    yield
    # Shutdown
    logger.info("Shutting down interpreTest backend...")

# Create FastAPI app
app = FastAPI(
    title="InterpreTest Backend API",
    description="AI-powered interpreter assessment service",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3008",  # Local frontend
        "http://localhost:5173",  # Landing service
        "https://interpretest.run.app",  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "interpretest-backend",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for Cloud Run"""
    return {
        "status": "healthy",
        "service": "interpretest-backend"
    }

from app.api import analysis
app.include_router(analysis.router, prefix="/api/v1")
