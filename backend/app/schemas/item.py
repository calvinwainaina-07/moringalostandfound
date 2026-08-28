from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ItemType(str, Enum):
    lost = "lost"
    found = "found"


class ItemStatus(str, Enum):
    open = "open"
    claimed = "claimed"
    returned = "returned"


class ItemBase(BaseModel):
    title: str
    description: str
    category: str
    location: str
    item_type: ItemType
    image_url: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    status: Optional[ItemStatus] = None
    image_url: Optional[str] = None


class ItemOut(ItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: ItemStatus
    reported_by_id: int
    created_at: datetime
    updated_at: datetime