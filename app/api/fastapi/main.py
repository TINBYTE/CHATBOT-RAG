from fastapi import FastAPI
from app.routers import question
from app.routers import auth

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Question Generation API")

# Allow all origins for now (you can restrict this to specific domains in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify the allowed origins here
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(question.router, prefix="/Exam", tags=["Questions"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
