import enum
from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime, Enum

from app.database import Base


class ItemType(str, enum.Enum):
    lost = "lost"
    found = "found"


class ItemStatus(str, enum.Enum):
    open = "open"
    claimed = "claimed"
    returned = "returned"


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False, index=True)
    location = Column(String(150), nullable=False, index=True)
    item_type = Column(Enum(ItemType), nullable=False, index=True)
    status = Column(Enum(ItemStatus), nullable=False, default=ItemStatus.open, index=True)
    image_url = Column(String(500), nullable=True)

    # TODO: restore ForeignKey("users.id") once Calvin's User model is merged from backend-auth
    reported_by_id = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)