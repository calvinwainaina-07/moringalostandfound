 backend-claims
from fastapi import FastAPI
from app.routes import claims   # ← add this

from flask import Flask
dev

app = Flask(__name__)

# Register routes
app.include_router(claims.router)


 backend-claims
@app.get("/")
def root():
    return {"message": "Moringa Lost & Found API is running"}

@app.route("/")
def home():
    return {"message": "Moringa Lost and Found API is running"}
 dev


@app.route("/health")
def health_check():
 backend-claims
    return {"status": "healthy"}

    return {"status": "healthy"}


if __name__ == "__main__":
    app.run(debug=True)
dev
