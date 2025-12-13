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
    # TODO: Load NLP models here
    # TODO: Initialize vector database connection
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
