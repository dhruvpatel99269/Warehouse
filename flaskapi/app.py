from flask import Flask, jsonify
from flask_cors import CORS
from routes import register_routes
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")


app = Flask(__name__)
CORS(app)

register_routes(app)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask API"})

if __name__ == "__main__":
    app.run(debug=False)