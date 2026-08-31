from fastapi import FastAPI

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
