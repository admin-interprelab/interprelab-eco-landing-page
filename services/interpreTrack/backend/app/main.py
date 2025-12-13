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
