from flask import Blueprint, jsonify
from models.db import db
from pytz import timezone, UTC
from bson.objectid import ObjectId
import datetime

email_logs_bp = Blueprint("email_logs", __name__)

@email_logs_bp.route("/email-logs", methods=["GET"])
def get_email_logs():
    logs = db.emails_log.find().sort("timestamp", -1)

    result = []
    for log in logs:
        ts_utc = log.get("timestamp")

        if not ts_utc:
            result.append({
                "_id": str(log.get("_id")),
                "recipient": log.get("recipient", "N/A"),
                "subject": log.get("subject", "N/A"),
                "status": log.get("status", "N/A"),
                "timestamp_utc": None,
                "timestamp_ist": "N/A",
                "attachment": log.get("attachment", None)
            })
            continue

        # Ensure timestamp is timezone-aware
        if ts_utc.tzinfo is None:
            ts_utc = ts_utc.replace(tzinfo=UTC)

        ts_ist = ts_utc.astimezone(timezone("Asia/Kolkata"))

        result.append({
            "_id": str(log.get("_id")),
            "recipient": log.get("recipient", "N/A"),
            "subject": log.get("subject", "N/A"),
            "status": log.get("status", "N/A"),
            "timestamp_utc": ts_utc.isoformat(),
            "timestamp_ist": ts_ist.strftime("%Y-%m-%d %I:%M:%S %p IST"),
            "attachment": log.get("attachment", None)
        })

    return jsonify({"email_logs": result})


@email_logs_bp.route("/email-logs/<string:log_id>", methods=["DELETE"])
def delete_email_log(log_id):
    result = db.emails_log.delete_one({"_id": ObjectId(log_id)})  # FIXED: collection name
    if result.deleted_count == 0:
        return jsonify({"message": "Log not found"}), 404
    return jsonify({"success": True, "message": "Email log deleted"})
