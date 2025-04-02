import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

const LiveCameraFeed = () => {
  const [cameras, setCameras] = useState([]);
  const [page, setPage] = useState(0);

  const videosPerPage = 4; // 4 videos per page (2 per row x 2 rows)

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

  // Swipe Handlers for Mobile
  const handlers = useSwipeable({
    onSwipedLeft: nextPage,
    onSwipedRight: prevPage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Live Camera Feeds</h1>

      {/* Desktop & Tablet View (2x2 Grid with Pagination) */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {cameras.slice(page * videosPerPage, (page + 1) * videosPerPage).map((camera, index) => (
          <div key={index} className="w-full h-70 flex justify-center items-center bg-gray-800 rounded-lg shadow-lg">
            <video
              src={camera.videoUrl}
              className="w-full h-full object-cover rounded-lg"
              controls
              autoPlay
              loop
              muted
            />
          </div>
        ))}
      </div>

      {/* Mobile View (Swipeable) */}
      <div {...handlers} className="sm:hidden w-full overflow-hidden">
        <div className="flex gap-4 w-full overflow-x-auto snap-x snap-mandatory">
          {cameras.map((camera, index) => (
            <div key={index} className="snap-center w-full flex-shrink-0">
              <video
                src={camera.videoUrl}
                className="w-full h-60 object-cover rounded-lg shadow-lg"
                controls
                autoPlay
                loop
                muted
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Buttons (for Desktop & Tablet) */}
      <div className="hidden sm:flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
          onClick={prevPage}
          disabled={page === 0}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
          onClick={nextPage}
          disabled={(page + 1) * videosPerPage >= cameras.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LiveCameraFeed;
