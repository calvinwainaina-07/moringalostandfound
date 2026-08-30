from pydantic import BaseModel
from typing import Optional

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    status: str = "lost"
    reportType: Optional[str] = None
    image: Optional[str] = None
    reportedBy: Optional[str] = None
    reward: Optional[str] = None
    originalLostItemId: Optional[int] = None

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    reportType: Optional[str] = None
    image: Optional[str] = None
    reportedBy: Optional[str] = None
    reward: Optional[str] = None
    originalLostItemId: Optional[int] = None

class ItemResponse(ItemBase):
    id: int

    class Config:
        from_attributes = True
