import os
import cv2
import threading
import numpy as np
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from ultralytics import YOLO
from services.fall_email import send_email_alert

fall_detection_bp = Blueprint("fall_detection", __name__)

# Model Path
MODEL_PATH = r"E:\SEM-6 Projects\PBL-Project\flaskapi\models\fall-detection\fall-model.pt"
model = YOLO(MODEL_PATH)

UPLOAD_FOLDER = "uploads"
ALERT_FOLDER = "alerts"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(ALERT_FOLDER, exist_ok=True)

@fall_detection_bp.route("/fall-detection", methods=["POST"])
def detect_fall():
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    video_file = request.files["video"]
    filename = secure_filename(video_file.filename)
    video_path = os.path.join(UPLOAD_FOLDER, filename)
    video_file.save(video_path)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return jsonify({"error": "Failed to open video file"}), 500

    alert_var = 0  # Counter for fall detections
    detected_fall = False

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame, stream=False)

        for result in results:
            for box in result.boxes.xyxy:
                x1, y1, x2, y2 = map(int, box.tolist())
                width, height = x2 - x1, y2 - y1
                aspect_ratio = height / width

                if aspect_ratio < 1:
                    detected_fall = True
                    alert_var += 1
                else:
                    alert_var = max(0, alert_var - 1)

        if detected_fall and alert_var >= 20:            
            alert_frame_path = os.path.join(ALERT_FOLDER, "fall_detected.jpg")
            cv2.imwrite(alert_frame_path, frame)
            threading.Thread(target=send_email_alert).start()  # Send alert in background
            break  

    cap.release() 
    return jsonify({"fall_detected": detected_fall, "message": "Processing completed"}), 200