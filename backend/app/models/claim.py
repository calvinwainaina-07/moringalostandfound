from sqlalchemy import Column, Integer, String
from app.database import Base


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, nullable=False)
    user_id = Column(Integer, nullable=False)
    status = Column(String, default="Pending", nullable=False)
