import React, { useState } from "react";

const VideoPlayer = () => {
  const [videoId, setVideoId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleFetchVideo = () => {
    setVideoUrl(`http://127.0.0.1:5000/video/get-video/${videoId}`);
  };

  return (
    <div>
      <h2>Play Video</h2>
      <input type="text" placeholder="Enter Video ID" onChange={(e) => setVideoId(e.target.value)} />
      <button onClick={handleFetchVideo}>Fetch Video</button>

      {videoUrl && (
        <video controls width="600">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
