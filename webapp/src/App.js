import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import LiveCameraFeed from "./pages/LiveCameraFeed";
import PastEvents from "./pages/PastEvents";
import Navbar from "./components/Navbar";
import UploadVideo from "./pages/VideoUpload";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row h-screen overflow-hidden">
        <Toaster position="top-right" />
        {/* Fixed Navbar */}
        <div className="w-full lg:w-1/5 xl:w-1/5 bg-fixed bg-white shadow-md fixed top-0 left-0 h-10vh lg:h-screen xl:h-screen z-10">
          <Navbar />
        </div>

        {/* Scrollable content */}
        <div className="ml-[25%] lg:ml-[20%] xl:ml-[20%] w-full lg:w-4/5 xl:w-4/5 min-h-screen overflow-y-auto bg-blue-100">
          <Routes>
            <Route path="/" element={<LiveCameraFeed />} />
            <Route path="/past-events" element={<PastEvents />} />
            <Route path="/video-upload" element={<UploadVideo />} />
            <Route path="/video-player" element={<VideoPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
