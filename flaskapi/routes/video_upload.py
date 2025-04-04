from flask import Blueprint, request, jsonify, send_file, Response
from models.db import fs  # Import GridFS
import gridfs
import io
from bson import ObjectId

video_bp = Blueprint("video_bp", __name__)

@video_bp.route("/upload-video", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    video_file = request.files["video"]
    video_id = fs.put(video_file, filename=video_file.filename)

    return jsonify({"message": "Video uploaded successfully!", "video_id": str(video_id)}), 201

@video_bp.route("/get-video/<video_id>", methods=["GET"])
def get_video(video_id):
    try:
        video = fs.get(video_id)
        return send_file(io.BytesIO(video.read()), mimetype="video/mp4", as_attachment=False)
    except gridfs.errors.NoFile:
        return jsonify({"error": "Video not found"}), 404


@video_bp.route('/get-videos', methods=['GET'])
def get_videos():
    try:
        files = fs.find({})
        videos = [
            {
                "_id": str(file._id),
                "filename": file.filename,
                "videoUrl": f"http://127.0.0.1:5000/stream-video/{file._id}"  # Streaming URL
            }
            for file in files
        ]
        return jsonify(videos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@video_bp.route("/stream-video/<video_id>", methods=["GET"])
def stream_video(video_id):
    try:
        video = fs.get(ObjectId(video_id))  # Convert string to ObjectId
        return send_file(io.BytesIO(video.read()), mimetype="video/mp4")
    except gridfs.errors.NoFile:
        return jsonify({"error": f"Video with ID {video_id} not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
