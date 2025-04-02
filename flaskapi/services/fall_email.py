import os
import base64
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition

# Your SendGrid API Key
SENDGRID_API_KEY = "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"

def send_email_alert():
    message = Mail(
        from_email="99269dhruvpatel@gmail.com",  # Your verified SendGrid email
        to_emails="dhruv.patel.btech2022@sitpune.edu.in",    # Replace with the recipient's email
        subject="🚨 Fall Detected!",
        html_content="<h1>Alert!</h1><p>A fall has been detected. See the attached image.</p>"
    )

    # Read the fall detection image
    file_path = r"E:\try\flaskapi\alerts\fall_detected.jpg"
    with open(file_path, "rb") as f:
        file_data = f.read()
        encoded_file = base64.b64encode(file_data).decode()  # Encode file in base64

    # Create attachment
    attachment = Attachment(
        file_content=FileContent(encoded_file),
        file_type=FileType("image/jpeg"),
        file_name=FileName("fall_alert.jpg"),
        disposition=Disposition("attachment")
    )
    message.attachment = attachment  # Attach the image

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"✅ Email sent! Status Code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
