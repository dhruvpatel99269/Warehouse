from flask import Flask, jsonify
from flask_cors import CORS
from routes import register_routes

app = Flask(__name__)
CORS(app)

register_routes(app)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask API"})

if __name__ == "__main__":
    app.run(debug=False)