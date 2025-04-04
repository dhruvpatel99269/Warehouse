from flask import Flask
from .fall_detection import fall_detection_bp
from .fire_detection import fire_detection_bp
from .ppe_compliance import ppe_compliance_bp
from .video_upload import video_bp
from .email_logs import email_logs_bp

def register_routes(app: Flask):
    app.register_blueprint(video_bp)
    app.register_blueprint(email_logs_bp)
    app.register_blueprint(fall_detection_bp)
    app.register_blueprint(fire_detection_bp)
    app.register_blueprint(ppe_compliance_bp)
