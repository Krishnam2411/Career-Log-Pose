import os
from datetime import datetime
from typing import List

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

# Environment configuration
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app = FastAPI(
    title="Career Log Pose API",
    description="API for Career Log Pose application",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", status_code=status.HTTP_200_OK, tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify API status.
    
    Returns:
        dict: A dictionary containing status information and timestamp.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Career Log Pose API",
    }