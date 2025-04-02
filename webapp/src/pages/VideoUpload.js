import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) {
      setMessage("Please select a video first!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      const response = await axios.post("http://127.0.0.1:5000/video/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default UploadVideo;
