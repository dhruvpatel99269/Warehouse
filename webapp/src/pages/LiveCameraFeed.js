import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

const LiveCameraFeed = () => {
  const [cameras, setCameras] = useState([]);
  const [page, setPage] = useState(0);
  const videosPerPage = 4;

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get-videos");
        setCameras(response.data);
      } catch (error) {
        console.error("Error fetching camera feeds:", error);
      }
    };
    fetchCameras();
  }, []);

  const nextPage = () => {
    if ((page + 1) * videosPerPage < cameras.length) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextPage,
    onSwipedRight: prevPage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-4 py-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <h1 className="flex justify-center items-center text-xl sm:text-2xl font-bold mb-4 tracking-wide animate-fade-in w-full">
        <span className="animate-pulse text-md sm:text-xl">🔴</span>
        <span>Live Camera Feeds</span> 
      </h1>

      {/* Grid View */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full animate-fade-in px-0 md:px-6 lg:px-12 xl:px-12 py-2">
        {cameras
          .slice(page * videosPerPage, (page + 1) * videosPerPage)
          .map((camera, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-2xl transform transition-transform hover:scale-105"
            >
              <video
                src={camera.videoUrl}
                className="w-full h-64 object-cover rounded-xl"
                controls
                autoPlay
                loop
                muted
              />
            </div>
          ))}
      </div>

      {/* Mobile Swipe View */}
      <div {...handlers} className="sm:hidden w-full overflow-hidden mt-4 animate-fade-in">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 pb-4">
          {cameras.map((camera, index) => (
            <div
              key={index}
              className="snap-center w-full flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-2"
            >
              <video
                src={camera.videoUrl}
                className="w-full h-64 object-cover rounded-xl"
                controls
                autoPlay
                loop
                muted
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="hidden sm:flex gap-4 mt-6 animate-fade-in">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className={`px-6 py-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md ${
            page === 0 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          ⬅ Prev
        </button>
        <button
          onClick={nextPage}
          disabled={(page + 1) * videosPerPage >= cameras.length}
          className={`px-6 py-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md ${
            (page + 1) * videosPerPage >= cameras.length ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default LiveCameraFeed;
