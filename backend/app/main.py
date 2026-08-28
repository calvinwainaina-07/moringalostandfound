from fastapi import FastAPI
from app.routes import claims   # ← add this

app = FastAPI(
    title="Moringa Lost & Found API",
    description="Backend API for the Moringa Lost & Found system",
    version="1.0.0",
)

# Register routes
app.include_router(claims.router)


@app.get("/")
def root():
    return {"message": "Moringa Lost & Found API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}