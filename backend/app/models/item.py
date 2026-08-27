from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    location = Column(String, nullable=False)
    date = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String, nullable=False)
    reward = Column(String, nullable=True)
    image = Column(String, nullable=True)
    reported_by = Column(String, nullable=True)
    report_type = Column(String, nullable=True)
    admin_status = Column(String, default="Pending", nullable=False)
    original_lost_item_id = Column(Integer, nullable=True)
