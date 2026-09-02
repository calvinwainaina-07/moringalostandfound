from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.item import Item, ItemType
from app.models.user import User
from app.routes.auth import get_current_user
from app.schemas.item import ItemCreate, ItemOut, ItemUpdate
from app.services import item_service

router = APIRouter(prefix="/items", tags=["Items"])


@router.post("/", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
def create_item(
    item_in: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a lost or found item report. item_type field determines which."""
    return item_service.create_item(db, item_in, reported_by_id=current_user.id)


@router.get("/", response_model=list[ItemOut])
def list_items(
    skip: int = 0,
    limit: int = 20,
    item_type: Optional[ItemType] = Query(None, description="Filter by 'lost' or 'found'"),
    category: Optional[str] = Query(None, description="Filter by category"),
    location: Optional[str] = Query(None, description="Filter by location"),
    db: Session = Depends(get_db),
):
    """Get all items, with optional filtering by type, category, and location."""
    return item_service.get_items(
        db, skip=skip, limit=limit, item_type=item_type, category=category, location=location
    )


@router.get("/{item_id}", response_model=ItemOut)
def get_item(item_id: int, db: Session = Depends(get_db)):
    """Get a single item by ID."""
    item = item_service.get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.put("/{item_id}", response_model=ItemOut)
def update_item(
    item_id: int,
    item_in: ItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update an item. Only the reporting user should be allowed (enforced once auth lands)."""
    item = item_service.get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

    if item.reported_by_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this item",
        )

    return item_service.update_item(db, item, item_in)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete an item. Only the reporting user should be allowed (enforced once auth lands)."""
    item = item_service.get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

    if item.reported_by_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this item",
        )

    item_service.delete_item(db, item)
    return None
