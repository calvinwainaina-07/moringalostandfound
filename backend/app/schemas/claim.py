from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class ClaimStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"


# ---------- Base Schema ----------
class ClaimBase(BaseModel):
    item_id: int = Field(..., description="ID of the item being claimed")
    message: Optional[str] = Field(None, description="Optional message explaining the claim")


# ---------- Create Schema (what the user sends) ----------
class ClaimCreate(ClaimBase):
    pass


# ---------- Update Schema (for status changes etc.) ----------
class ClaimUpdate(BaseModel):
    status: Optional[ClaimStatus] = None
    message: Optional[str] = None


# ---------- Response Schema (what we return to the frontend) ----------
class ClaimResponse(ClaimBase):
    id: int
    claimant_id: int
    status: ClaimStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True   # allows reading data from SQLAlchemy models