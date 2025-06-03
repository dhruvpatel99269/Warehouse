# AI-Powered Warehouse Surveillance System

## Overview
The AI-Powered Warehouse Surveillance System is an advanced solution designed to enhance safety, security, and operational efficiency in warehouse environments. This project addresses the limitations of traditional surveillance systems by integrating three specialized machine learning (ML) models for **Personal Protective Equipment (PPE) compliance**, **fall detection**, and **fire detection**. Built using **YOLOv8** for real-time object detection, a **Flask API** backend, and a **React-based** frontend dashboard, the system provides automated threat detection, real-time alerts, and actionable insights. Developed as part of a Bachelor of Technology project at Symbiosis Institute of Technology, Pune, this system significantly improves workplace safety and operational efficiency in high-risk warehouse settings.

The project was carried out by:  
- Vasu Desai (22070122050)  
- Dhaval Bhimani (22070122051)  
- Dhruv Patel (22070122054)  
- Harsh Kharwar (22070122074)  
Under the guidance of Dr. Deepali Vora and Prof. Shubhangi Deokar.

## Problem Statement
Warehouses face significant safety and security challenges, with injury rates of **4.8 per 100 full-time workers** (compared to the industry average of 2.7) and fatality rates of **14.6 per 100,000 employees** in the transportation and material moving sector (2022 data). Traditional surveillance systems are hindered by:  
- Labor-intensive manual monitoring prone to human error.  
- Passive CCTV setups lacking automated alerts.  
- Delayed incident response times.  
- Inefficient inventory tracking and incomplete spatial coverage.  
- Poor predictive analysis of security threats.  

This project aims to overcome these limitations by developing an intelligent, AI-driven surveillance system tailored for warehouse environments.

## Features
- **PPE Compliance Monitoring**: Detects safety equipment (helmets, vests, gloves, boots, goggles) using YOLOv8, ensuring adherence to safety protocols with high precision (0.6973).  
- **Fall Detection**: Combines YOLOv8 with LSTM for pose estimation and temporal analysis to identify worker falls (mAP@0.5: 0.683), enabling swift incident response.  
- **Fire Detection**: Identifies fire and smoke with a balanced precision (0.7392) and recall (0.7526) on testing sets, critical for early hazard mitigation.  
- **Real-Time Dashboard**: A React-based interface visualizes live feeds, detection alerts, and analytics, powered by a Flask API for seamless data integration.  
- **Automated Alerts**: Utilizes Socket.io and SendGrid for instant notifications on detected anomalies, stored in MongoDB for audit purposes.  
- **Video Summarization**: Employs LSTMs and SUM-GAN/VASNet for keyframe extraction, reducing cognitive load on security personnel.

## System Architecture
The system architecture is designed to handle real-time surveillance efficiently, consisting of four main phases: Data Preprocessing & Video Frame Extraction, Object Detection, Tracking & Classification, Activity Recognition & Anomaly Detection, and Automated Video Summarization & Real-Time Alerts. Below is the diagram illustrating the system architecture:

![System Architecture Diagram](assets/system-architecture.png)

## Methodology
The system follows a four-phase architecture:  
1. **Data Preprocessing & Video Frame Extraction**:  
   - Processes live CCTV feeds at 5-15 FPS using OpenCV and FFmpeg.  
   - Resizes frames to 640x640 and applies Gaussian Blur for noise reduction.  
2. **Object Detection, Tracking & Classification**:  
   - Uses YOLOv8 with CSPDarknet53 backbone for detecting workers, forklifts, pallets, and safety equipment.  
   - Implements DeepSORT with Kalman Filter for consistent object tracking across frames.  
3. **Activity Recognition & Anomaly Detection**:  
   - Detects falls, PPE violations, forklift proximity risks, and fire/smoke events in real-time.  
   - Prioritizes alerts based on confidence scores and event severity.  
4. **Automated Video Summarization & Real-Time Alerts**:  
   - Generates summarized video clips using LSTM and reinforcement learning.  
   - Delivers instant alerts via Socket.io and logs events in MongoDB.

## Technical Stack
- **Machine Learning**:  
  - YOLOv8 (Ultralytics) for object detection.  
  - PyTorch for model training.  
  - CSPDarknet53 for feature extraction.  
- **Data Processing**:  
  - OpenCV for frame extraction and preprocessing.  
  - FFmpeg for video decoding.  
  - Gaussian Blur for noise reduction.  
- **Backend**:  
  - Flask API for video processing, model inference, and alert generation.  
- **Frontend**:  
  - React with Tailwind CSS for a responsive dashboard.  
- **Database**:  
  - MongoDB for event logging and historical data.  
- **Datasets**:  
  - **PPE Compliance**: 2,700 images (helmets, vests, boots, gloves, goggles, non-compliance classes).  
  - **Fall Detection**: 4,000 images (down, up classes).  
  - **Fire Detection**: 9,000 images (fire, smoke, normal classes).  
- **Deployment**: Models deployed on edge devices (e.g., NVIDIA Jetson) or cloud servers.  

## Results and Analysis
- **Object Detection**:  
  - Precision: 0.6973, Recall: 0.4628, mAP@0.5: 0.4954, F1-Score: 0.5564.  
  - Strong detection of helmets, vests, and persons; weaker performance on non-compliance classes (e.g., no_helmet, no_goggles).  
- **PPE Compliance**:  
  - High precision for helmets and vests (AP > 0.85); moderate for gloves, boots, goggles.  
  - Low recall for non-compliance classes due to subtle visual cues and class imbalance.  
- **Fire Detection**:  
  - Testing Set: Precision: 0.7392, Recall: 0.7526, mAP@0.5: 0.8213, F1-Score: 0.7392.  
  - Effective generalization with balanced performance; some missed detections due to low confidence scores.  
- **Fall Detection**:  
  - Precision: 0.697, Recall: 0.654, mAP@0.5: 0.683, F1-Score: 0.674, AUC: 0.86.  
  - Strong true-positive detection for falls (411) and stand-ups (358); moderate cross-class confusion.  
- **Key Observations**:  
  - Models prioritize precision over recall, reducing false positives but missing some true events.  
  - Bounding box localization (mAP@0.5:0.95: 0.2394) needs improvement for tighter fits.  
  - Confidence score calibration required to balance detection accuracy.

## Advantages
- **Enhanced Safety**: Reduces injury risks (4.8 per 100 workers) through real-time PPE and fall monitoring.  
- **Operational Efficiency**: Automates asset tracking and optimizes workflows via pattern analysis.  
- **Scalability**: Modular design supports multiple camera feeds and diverse warehouse sizes.  
- **Reduced Cognitive Load**: Video summarization and automated alerts streamline monitoring.

## Future Directions
- **Multimodal Fusion**: Integrate thermal, audio, or RFID data for enhanced detection.  
- **Federated Learning**: Enable collaborative learning across warehouses while preserving privacy.  
- **Explainable AI**: Develop interpretable models for transparent decision-making.  
- **Adaptive Learning**: Implement continuous learning for real-time model improvement.  
- **Extended Anomaly Detection**: Identify subtle operational issues for proactive management.

## Impact
This system addresses critical warehouse safety challenges, reducing injury and fatality rates while improving operational efficiency. By automating threat detection and compliance monitoring, it minimizes human error, enhances response times, and supports scalable deployment, making it a valuable tool for modern warehouse management.

## Screenshots
*Add a screenshot of the React dashboard displaying real-time camera feeds with annotated detections (e.g., bounding boxes around workers indicating PPE compliance, fall alerts, or fire detection). You can use the mockup generated earlier for this purpose.*

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.