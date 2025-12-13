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
    # TODO: Load NLP models here
    # TODO: Initialize database connections
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

# TODO: Import and include API routers
# from app.api import analysis
# app.include_router(analysis.router, prefix="/api")
