from flask import Blueprint, jsonify

fire_detection_bp = Blueprint("fire_detection", __name__)

@fire_detection_bp.route("/fire-detection")
def fire_detection():
    # Your fire detection logic here
    return jsonify({"message": "Fire detection processing completed!"})
