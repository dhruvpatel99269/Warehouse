from flask import Blueprint, request, jsonify, send_file 
from models.db import fs  # GridFS
import gridfs
import io
import threading
import requests
from bson import ObjectId

video_bp = Blueprint("video_bp", __name__)

# 🧠 In-memory set to track processed videos
processed_videos = set()

# ========== Upload Video (Unchanged) ==========
@video_bp.route("/upload-video", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    video_file = request.files["video"]
    video_id = fs.put(video_file, filename=video_file.filename)

    return jsonify({"message": "Video uploaded successfully!", "video_id": str(video_id)}), 201


# ========== Get Single Video by ID ==========
@video_bp.route("/get-video/<video_id>", methods=["GET"])
def get_video(video_id):
    try:
        video = fs.get(ObjectId(video_id))
        return send_file(io.BytesIO(video.read()), mimetype="video/mp4", as_attachment=False)
    except gridfs.errors.NoFile:
        return jsonify({"error": "Video not found"}), 404


# ========== Stream Video by ID ==========
@video_bp.route("/stream-video/<video_id>", methods=["GET"])
def stream_video(video_id):
    try:
        video = fs.get(ObjectId(video_id))
        return send_file(io.BytesIO(video.read()), mimetype="video/mp4")
    except gridfs.errors.NoFile:
        return jsonify({"error": f"Video with ID {video_id} not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ========== Get All Videos (Trigger Detection) ==========
@video_bp.route('/get-videos', methods=['GET'])
def get_videos():
    try:
        files = fs.find({})
        videos = []

        for file in files:
            video_id = str(file._id)
            video_url = f"http://127.0.0.1:5000/stream-video/{video_id}"

            videos.append({
                "_id": video_id,
                "filename": file.filename,
                "videoUrl": video_url
            })

            # ✅ Trigger detection only if not already processed
            if video_id not in processed_videos:
                processed_videos.add(video_id)
                threading.Thread(target=run_detection, args=(video_id, file.filename)).start()
            else:
                print(f"[INFO] Skipping detection for {file.filename} — already processed in this session.")

        return jsonify(videos), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ========== Detection Logic ==========
def run_detection(video_id, filename):
    try:
        video_file = fs.get(ObjectId(video_id))
        video_data = video_file.read()

        file_tuple = (filename, video_data, 'video/mp4')

        detection_endpoints = {
            "fall": "http://localhost:5000/fall-detection",
            "fire": "http://localhost:5000/fire-detection",
            "ppe": "http://localhost:5000/ppe-compliance"
        }

        for detection_type, endpoint in detection_endpoints.items():
            try:
                response = requests.post(endpoint, files={"video": file_tuple}, timeout=15)
                result = response.json()
                print(f"[{detection_type.upper()} Detection] for {filename}: {result}")
            except Exception as e:
                print(f"[{detection_type.upper()} Detection] Error for {filename}: {str(e)}")

    except Exception as err:
        print(f"[Detection Setup Failed] for video ID {video_id}: {str(err)}")
