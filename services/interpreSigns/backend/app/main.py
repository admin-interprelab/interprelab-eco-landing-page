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
    logger.info("Starting interpreSigns backend...")
    
    # =========================================================================
    # TODO: AGENT IMPLEMENTATION GUIDE - ASL PROGRESS TRACKING
    # =========================================================================
    # 1. Progress Tracking Endpoint (in `app/api/progress.py`):
    #    - Route: POST /api/v1/progress
    #    - Input: JSON 
    #      { 
    #        "user_id": "uuid", 
    #        "module_id": "alphabet_a", 
    #        "accuracy": 0.95,
    #        "attempt_duration": 15 
    #      }
    #    - Logic:
    #      a. Validate input.
    #      b. Update Supabase `user_progress` table (upsert).
    #      c. Calculate "Streak" or "Level Up" logic.
    #
    # 2. Gamification Config (Optional):
    #    - Return daily challenge config from an endpoint.
    # =========================================================================

    yield
    # Shutdown
    logger.info("Shutting down interpreSigns backend...")

# Create FastAPI app
app = FastAPI(
    title="InterpreSigns Backend API",
    description="ASL Learning Progress Service",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"service": "interpresigns-backend", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
