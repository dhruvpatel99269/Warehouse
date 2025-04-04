import os
import base64
import datetime
import pytz
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition
from models.db import db  # Your MongoDB connection

# ✅ Load environment variables
load_dotenv()
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")

# ✅ MongoDB Collection
collection = db["emails_log"]

# ✅ Timezones
UTC = pytz.utc
IST = pytz.timezone("Asia/Kolkata")

def send_email_alert():
    message = Mail(
        from_email="99269dhruvpatel@gmail.com",
        to_emails="dhruv.patel.btech2022@sitpune.edu.in",
        subject="🚨 Fall Detected!",
        html_content="<h1>Alert!</h1><p>A fall has been detected. See the attached image.</p>"
    )

    # ✅ Read and encode the fall detection image
    file_path = os.path.join("alerts", "fall_detected.jpg")
    with open(file_path, "rb") as f:
        file_data = f.read()
        encoded_file = base64.b64encode(file_data).decode()  # base64 string

    # ✅ Create attachment for email
    attachment = Attachment(
        file_content=FileContent(encoded_file),
        file_type=FileType("image/jpeg"),
        file_name=FileName("fall_alert.jpg"),
        disposition=Disposition("attachment")
    )
    message.attachment = attachment

    # ✅ Capture timestamps correctly
    timestamp_utc = datetime.datetime.now(UTC)
    timestamp_ist = timestamp_utc.astimezone(IST)

    # ✅ Log email + attachment in MongoDB
    email_data = {
        "recipient": "dhruv.patel.btech2022@sitpune.edu.in",
        "subject": "🚨 Fall Detected!",
        "timestamp": timestamp_utc,  # Store one main timestamp (UTC)
        "status": 202,
        "attachment": {
            "filename": "fall_alert.jpg",
            "filetype": "image/jpeg",
            "content": encoded_file  # Base64-encoded image
        }
    }
    collection.insert_one(email_data)

    print(f"✅ Email sent and logged at {timestamp_utc.strftime('%Y-%m-%d %H:%M:%S UTC')}")

# ✅ Test the function
if __name__ == "_main_":
    send_email_alert()
