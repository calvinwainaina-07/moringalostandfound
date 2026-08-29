from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return {"message": "Moringa Lost and Found API is running"}

if __name__ == "__main__":
    app.run(debug=True)