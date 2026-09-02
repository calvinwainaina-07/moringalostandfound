import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Models
from app.models.user import User
from app.models.item import Item
from app.models.claim import Claim

# Routers
from app.routes.auth import router as auth_router
from app.routes.items import router as items_router
from app.routes.claims import router as claims_router


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Moringa Lost & Found API",
    description="Backend API for the Moringa Lost & Found system",
    version="1.0.0",
)


# Allow the local Vite server and configured production frontend to communicate
# with the API. CORS_ORIGINS is a comma-separated list of trusted origins.
cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in cors_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(auth_router)
app.include_router(items_router)
app.include_router(claims_router)


@app.get("/")
def home():
    return {
        "message": "Moringa Lost and Found API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
