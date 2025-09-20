import os
import uuid
import time
from datetime import datetime, timezone
from collections import defaultdict
from typing import Optional, Dict, Any

from pydantic import BaseModel, Field
from fastapi import FastAPI, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .root.agent import RootAgent

class CareerLogPoseException(Exception):
    """Base exception class for Career Log Pose API."""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class InvalidInputError(CareerLogPoseException):
    """Raised when the input is invalid."""
    def __init__(self, message: str):
        super().__init__(message, status_code=400)

class AgentInvocationError(CareerLogPoseException):
    """Raised when there's an error invoking the agent."""
    def __init__(self, message: str, original_error: Exception | None = None):
        self.original_error = original_error
        error_details = str(original_error) if original_error else "No additional details"
        super().__init__(f"{message} - Details: {error_details}", status_code=500)

class AgentTimeoutError(CareerLogPoseException):
    """Raised when the agent takes too long to respond."""
    def __init__(self, message: str):
        super().__init__(message, status_code=504)

class AgentValidationError(CareerLogPoseException):
    """Raised when the agent input/output validation fails."""
    def __init__(self, message: str):
        super().__init__(message, status_code=422)

# Environment configuration
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))

class RateLimiter:
    def __init__(self, requests_per_minute: int):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
        
    async def is_rate_limited(self, client_ip: str) -> bool:
        now = time.time()
        minute_ago = now - 60
        
        # Clean old requests
        self.requests[client_ip] = [req_time for req_time in self.requests[client_ip] if req_time > minute_ago]
        
        if len(self.requests[client_ip]) >= self.requests_per_minute:
            return True
            
        self.requests[client_ip].append(now)
        return False

rate_limiter = RateLimiter(RATE_LIMIT_PER_MINUTE)

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

# Initialize RootAgent
agent = RootAgent()

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """Middleware to handle rate limiting."""
    if request.url.path == "/invoke":
        client_ip = request.client.host
        is_limited = await rate_limiter.is_rate_limited(client_ip)
        if is_limited:
            return JSONResponse(
                status_code=429,
                content={
                    "error": "Too many requests",
                    "message": f"Rate limit exceeded. Maximum {RATE_LIMIT_PER_MINUTE} requests per minute."
                }
            )
    response = await call_next(request)
    return response

@app.exception_handler(CareerLogPoseException)
async def career_log_pose_exception_handler(request: Request, exc: CareerLogPoseException):
    """Global exception handler for CareerLogPose exceptions."""
    error_response = {
        "error": exc.__class__.__name__,
        "message": exc.message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "path": request.url.path,
        "method": request.method
    }
    
    # Add additional error context for agent invocation errors
    if isinstance(exc, AgentInvocationError) and exc.original_error:
        error_response.update({
            "error_type": type(exc.original_error).__name__,
            "error_details": str(exc.original_error)
        })
        
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response
    )

class InvokeRequest(BaseModel):
    """Defines the structure of the incoming request JSON."""
    query: str = Field(..., min_length=1, max_length=2000, description="The user's career-related query")
    session_id: Optional[str] = Field(None, description="Optional session ID for maintaining conversation context")
    metadata: Optional[Dict[str, Any]] = Field(
        default_factory=dict,
        description="Optional metadata for the request (e.g., user preferences, constraints)"
    )

class InvokeResponse(BaseModel):
    """Defines the structure of the outgoing response JSON."""
    output: Dict[str, Any] = Field(..., description="The agent's structured response")
    session_id: str = Field(..., description="Session ID for the conversation")
    metadata: Dict[str, Any] = Field(
        ...,
        description="Response metadata including processing time, agent used, etc."
    )
    timestamp: datetime = Field(default_factory=datetime.now(timezone.utc), description="Response timestamp")
 
# API Routes   
@app.get("/health", status_code=status.HTTP_200_OK, tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify API status.
    
    Returns:
        dict: A dictionary containing status information and timestamp.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc),
        "service": "Career Log Pose API",
    }
    
@app.post("/invoke", response_model=InvokeResponse, summary="Invoke the Career Log Pose Agent")
async def invoke_agent(request: InvokeRequest):
    """
    Process a career-related query through the Career Log Pose agent system.
    
    Args:
        request (InvokeRequest): The request containing the user's query and optional session ID.
        
    Returns:
        InvokeResponse: The agent's response including career guidance and metadata.
        
    Raises:
        InvalidInputError: If the input query is invalid or cannot be processed.
        AgentInvocationError: If there's an error during agent processing.
    """
    try:
        # Start timing the request
        start_time = time.time()
        
        # Validate and sanitize the query
        query = request.query.strip()
        if not query:
            raise InvalidInputError("Query cannot be empty")
            
        # Generate or use existing session ID
        session_id = request.session_id or str(uuid.uuid4())
        
        # Prepare agent configuration
        config = {
            "configurable": {
                "session_id": session_id,
                "metadata": request.metadata
            }
        }

        # Prepare agent input
        agent_input = {"input": query}
        
        # Invoke the agent with timeout handling
        try:
            print(f"Invoking agent with input: {agent_input}")
            print(f"Agent configuration: {config}")
            result = await agent.invoke(agent_input, config)
            print(f"Agent result: {result}")
        except ValueError as e:
            print(f"Validation error: {str(e)}")
            raise AgentValidationError(f"Invalid input or configuration: {str(e)}")
        except RuntimeError as e:
            print(f"Runtime error: {str(e)}")
            if "timeout" in str(e).lower():
                raise AgentTimeoutError("Agent took too long to respond")
            raise AgentInvocationError("Error processing query", original_error=e)
        except Exception as e:
            print(f"Unexpected error: {type(e).__name__}: {str(e)}")
            raise AgentInvocationError("Unexpected error during processing", original_error=e)
            
        # Calculate processing time
        processing_time = time.time() - start_time
        
        # Prepare response metadata
        response_metadata = {
            "processing_time_ms": round(processing_time * 1000, 2),
            "request_metadata": request.metadata,
            "agent_version": "0.1.0"
        }
        
        # Extract and validate agent output
        output = result.get("output")
        if not output:
            raise AgentInvocationError("No output received from agent")
            
        # Convert string output to structured format if needed
        if isinstance(output, str):
            output = {"response": output}
            
        return InvokeResponse(
            output=output,
            session_id=session_id,
            metadata=response_metadata,
            timestamp=datetime.utcnow()
        )
        
    except CareerLogPoseException:
        # Re-raise CareerLogPoseExceptions to be handled by the global handler
        raise
    except Exception as e:
        # Convert unexpected exceptions to AgentInvocationError
        raise AgentInvocationError(f"Unexpected error: {str(e)}")
