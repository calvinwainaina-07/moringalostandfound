from typing import Optional

from sqlalchemy.orm import Session

from app.models.item import Item, ItemType
from app.schemas.item import ItemCreate, ItemUpdate


def create_item(db: Session, item_in: ItemCreate, reported_by_id: int) -> Item:
    item = Item(
        title=item_in.title,
        description=item_in.description,
        category=item_in.category,
        location=item_in.location,
        item_type=item_in.item_type,
        image_url=item_in.image_url,
        reported_by_id=reported_by_id,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def get_item(db: Session, item_id: int) -> Optional[Item]:
    return db.query(Item).filter(Item.id == item_id).first()


def get_items(
    db: Session,
    skip: int = 0,
    limit: int = 20,
    item_type: Optional[ItemType] = None,
    category: Optional[str] = None,
    location: Optional[str] = None,
):
    query = db.query(Item)

    if item_type:
        query = query.filter(Item.item_type == item_type)
    if category:
        query = query.filter(Item.category.ilike(f"%{category}%"))
    if location:
        query = query.filter(Item.location.ilike(f"%{location}%"))

    return query.order_by(Item.created_at.desc()).offset(skip).limit(limit).all()


def update_item(db: Session, item: Item, item_in: ItemUpdate) -> Item:
    update_data = item_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def delete_item(db: Session, item: Item) -> None:
    db.delete(item)
    db.commit()