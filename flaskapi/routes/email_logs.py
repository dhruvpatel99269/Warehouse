from flask import Blueprint, jsonify
from models.db import db
from pytz import timezone, UTC
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
                "recipient": log.get("recipient", "N/A"),
                "subject": log.get("subject", "N/A"),
                "status": log.get("status", "N/A"),
                "timestamp_utc": None,
                "timestamp_ist": "N/A",
                "attachment": log.get("attachment", None)
            })
            continue

        # Ensure the timestamp is timezone-aware
        ts_utc = ts_utc.replace(tzinfo=UTC)
        ts_ist = ts_utc.astimezone(timezone("Asia/Kolkata"))

        result.append({
            "recipient": log.get("recipient", "N/A"),
            "subject": log.get("subject", "N/A"),
            "status": log.get("status", "N/A"),
            "timestamp_utc": ts_utc.isoformat(),  # ✅ ISO format for frontend compatibility
            "timestamp_ist": ts_ist.strftime("%Y-%m-%d %I:%M:%S %p IST"),
            "attachment": log.get("attachment", None)
        })

    return jsonify({"email_logs": result})
