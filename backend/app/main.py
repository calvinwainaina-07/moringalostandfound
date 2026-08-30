from fastapi import FastAPI
from app.database import Base, engine
from app.routes.items import router as items_router

app = FastAPI(
    title="Moringa Lost & Found API",
    description="Backend API for the Moringa Lost & Found system",
    version="1.0.0",
)

Base.metadata.create_all(bind=engine)

app.include_router(items_router)



@app.get("/")
def root():
    return {"message": "Moringa Lost & Found API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
