from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from marshmallow import ValidationError

from app.database import SessionLocal
from app.schemas.user import (
    UserLoginSchema,
    UserRegisterSchema,
    UserResponseSchema,
)
from app.services.auth_service import authenticate_user, register_user


auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

register_schema = UserRegisterSchema()
login_schema = UserLoginSchema()
response_schema = UserResponseSchema()


@auth_bp.route("/register", methods=["POST"])
def register():
    db = SessionLocal()

    try:
        data = register_schema.load(request.get_json() or {})

        user = register_user(
            db=db,
            name=data["name"],
            email=data["email"],
            password=data["password"],
        )

        if user is None:
            return jsonify({"message": "Email already registered"}), 409

        return jsonify({
            "message": "User registered successfully",
            "user": response_schema.dump(user),
        }), 201

    except ValidationError as error:
        return jsonify({
            "message": "Validation error",
            "errors": error.messages,
        }), 400

    finally:
        db.close()


@auth_bp.route("/login", methods=["POST"])
def login():
    db = SessionLocal()

    try:
        data = login_schema.load(request.get_json() or {})

        user = authenticate_user(
            db=db,
            email=data["email"],
            password=data["password"],
        )

        if user is None:
            return jsonify({
                "message": "Invalid email or password"
            }), 401

        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={
                "role": user.role,
                "name": user.name,
            },
        )

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": response_schema.dump(user),
        }), 200

    except ValidationError as error:
        return jsonify({
            "message": "Validation error",
            "errors": error.messages,
        }), 400

    finally:
        db.close()


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    db = SessionLocal()

    try:
        user_id = get_jwt_identity()

        from app.models.user import User

        user = db.query(User).filter(User.id == int(user_id)).first()

        if user is None:
            return jsonify({"message": "User not found"}), 404

        return jsonify({
            "user": response_schema.dump(user),
        }), 200

    finally:
        db.close()