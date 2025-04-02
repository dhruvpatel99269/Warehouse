import cv2
import numpy as np
import os
import traceback
import threading
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
from services.ppe_email import send_email_alert

ppe_compliance_bp = Blueprint("ppe_compliance", __name__)
CORS(ppe_compliance_bp)  # Enable CORS for frontend integration

# Load YOLO Model
model_path = r"E:\SEM-6 Projects\PBL-Project\flaskapi\models\ppe-detection\ppe-model.pt"
model = YOLO(model_path)

UPLOAD_FOLDER = "uploads"
ALERT_FOLDER = "alerts"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(ALERT_FOLDER, exist_ok=True)

def process_ppe_detection(results, frame):
    persons_detected = []
    helmets_detected = []
    vests_detected = []
    non_compliant_people = []

    # Extract detected objects
    for result in results:
        for box, cls in zip(result.boxes.xyxy, result.boxes.cls):
            x1, y1, x2, y2 = map(int, box.tolist())
            label = model.names[int(cls)]
            
            if label == "Person":
                persons_detected.append((x1, y1, x2, y2))
            elif label == "Helmet":
                helmets_detected.append((x1, y1, x2, y2))
            elif label == "Vest":
                vests_detected.append((x1, y1, x2, y2))

    # Check PPE compliance
    for person in persons_detected:
        x1, y1, x2, y2 = person

        has_helmet = any(h[0] >= x1 and h[2] <= x2 and h[1] >= y1 and h[3] <= y2 for h in helmets_detected)
        has_vest = any(v[0] >= x1 and v[2] <= x2 and v[1] >= y1 and v[3] <= y2 for v in vests_detected)
        
        if not (has_helmet and has_vest):  # If missing either helmet or vest
            non_compliant_people.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2})

    return len(non_compliant_people) > 0, non_compliant_people

@ppe_compliance_bp.route("/ppe-compliance", methods=["POST"])
def detect_ppe():
    try:
        if "video" not in request.files:
            return jsonify({"error": "No video file in the request"}), 400

        file = request.files["video"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        video_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(video_path)
        print(f"Video saved at: {video_path}")

        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            return jsonify({"error": "Failed to open video file"}), 400

        frame_count = 0
        first_violation_saved = False
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break  # No more frames

            frame_count += 1
            results = model(frame)
            ppe_violation_detected, _ = process_ppe_detection(results, frame)

            if ppe_violation_detected and not first_violation_saved:
                alert_frame_path = os.path.join(ALERT_FOLDER, "ppe_first_violation.jpg")
                cv2.imwrite(alert_frame_path, frame)
                print(f"PPE violation detected! Frame saved: {alert_frame_path}")
                threading.Thread(target=send_email_alert, daemon=True).start()
                first_violation_saved = True
                break  # Stop processing after the first violation

        cap.release()

        return jsonify({"message": "Processing completed", "violation_detected": first_violation_saved}), 200
    
    except Exception as e:
        print(traceback.format_exc())  # Debugging
        return jsonify({"error": str(e)}), 500
