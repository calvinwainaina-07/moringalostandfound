"""
CLAIMS MODULE - Ownership & Matching Logic Notes
------------------------------------------------
- A user can only claim an item that is currently marked as "Lost".
- Once a claim is approved by admin, the item status should change to "Claimed" or "Found".
- Duplicate pending claims by the same user on the same item are blocked.
- Only the claimant can update or delete their own claim (ownership).
- Full matching logic (comparing lost vs found reports) will be completed 
  once the Item model from Hasim is ready.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.claim import Claim, ClaimStatus
from app.schemas.claim import ClaimCreate, ClaimUpdate, ClaimResponse

router = APIRouter(
    prefix="/claims",
    tags=["Claims"]
)


# Temporary helper – later this will come from the JWT token
def get_current_user_id() -> int:
    # TODO: Replace with real authentication when Calvin finishes Auth
    return 1


# ---------- Create a new claim ----------
@router.post("/", response_model=ClaimResponse, status_code=status.HTTP_201_CREATED)
def create_claim(claim: ClaimCreate, db: Session = Depends(get_db)):
    current_user_id = get_current_user_id()

    # 1. Prevent duplicate pending claims by the same user on the same item
    existing_claim = db.query(Claim).filter(
        Claim.item_id == claim.item_id,
        Claim.claimant_id == current_user_id,
        Claim.status == ClaimStatus.pending
    ).first()

    if existing_claim:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have a pending claim on this item."
        )

    # 2. Create the claim
    new_claim = Claim(
        item_id=claim.item_id,
        claimant_id=current_user_id,
        message=claim.message,
        status=ClaimStatus.pending
    )

    db.add(new_claim)
    db.commit()
    db.refresh(new_claim)
    return new_claim


# ---------- Get all claims (with filters) ----------
@router.get("/", response_model=List[ClaimResponse])
def get_claims(
    status: Optional[ClaimStatus] = None,
    item_id: Optional[int] = None,
    my_claims_only: bool = False,          # new useful filter
    db: Session = Depends(get_db)
):
    query = db.query(Claim)

    if status:
        query = query.filter(Claim.status == status)

    if item_id:
        query = query.filter(Claim.item_id == item_id)

    if my_claims_only:
        query = query.filter(Claim.claimant_id == get_current_user_id())

    return query.order_by(Claim.created_at.desc()).all()


# ---------- Get a single claim ----------
@router.get("/{claim_id}", response_model=ClaimResponse)
def get_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()

    if not claim:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Claim not found"
        )
    return claim


# ---------- Update a claim ----------
@router.patch("/{claim_id}", response_model=ClaimResponse)
def update_claim(
    claim_id: int,
    claim_update: ClaimUpdate,
    db: Session = Depends(get_db)
):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    # Ownership check – only the claimant can update their own claim
    if claim.claimant_id != get_current_user_id():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own claims"
        )

    if claim_update.status is not None:
        claim.status = claim_update.status

    if claim_update.message is not None:
        claim.message = claim_update.message

    db.commit()
    db.refresh(claim)
    return claim


# ---------- Delete / Cancel a claim ----------
@router.delete("/{claim_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    # Ownership check
    if claim.claimant_id != get_current_user_id():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own claims"
        )

    db.delete(claim)
    db.commit()
    return None