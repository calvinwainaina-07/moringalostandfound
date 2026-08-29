from sqlalchemy import Column, Integer, String, DateTime, Text, Enum
from datetime import datetime
import enum

from app.database import Base


class ClaimStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    
    # Temporary: just store the IDs as integers (we will add proper ForeignKeys later)
    item_id = Column(Integer, nullable=False, index=True)
    claimant_id = Column(Integer, nullable=False, index=True)
    
    message = Column(Text, nullable=True)
    status = Column(Enum(ClaimStatus), default=ClaimStatus.pending, nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)