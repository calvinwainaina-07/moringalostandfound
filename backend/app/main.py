import os

from dotenv import load_dotenv
from flask import Flask
from flask_jwt_extended import JWTManager

from app.routes.auth import auth_bp

load_dotenv()

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager(app)

app.register_blueprint(auth_bp)


@app.route("/")
def home():
    return {"message": "Moringa Lost and Found API is running"}


@app.route("/health")
def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    app.run(debug=True)
