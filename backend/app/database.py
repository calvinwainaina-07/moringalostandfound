
    try:
        yield db
    finally:<<<<<<< backend-claims
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
 dev
from dotenv import load_dotenv

load_dotenv()

backend-claims
# For now we use SQLite (easy for development)
# Later Calvin can switch this to PostgreSQL
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./moringa_lost_found.db")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}  # only needed for SQLite
)

=======
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./lost_and_found.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
dev
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


 backend-claims
# Dependency for routes

dev
def get_db():
    db = SessionLocal()
        db.close()