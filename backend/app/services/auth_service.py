from flask_bcrypt import Bcrypt
from sqlalchemy.orm import Session

from app.models.user import User


bcrypt = Bcrypt()


def register_user(db: Session, name: str, email: str, password: str):
    email = email.strip().lower()

    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        return None

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        name=name.strip(),
        email=email,
        password=hashed_password,
        role="user",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, email: str, password: str):
    email = email.strip().lower()

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not bcrypt.check_password_hash(user.password, password):
        return None

    return user