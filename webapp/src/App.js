
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveCameraFeed from "./pages/LiveCameraFeed";
import PastEvents from "./pages/PastEvents";
import Navbar from "./components/Navbar";
import UploadVideo from "./pages/VideoUpload";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  return (
    <Router>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 lg:w-1/5 xl:w-1/5 flex justify-center items-center">
          <Navbar /> {/* Add a navigation bar for easy navigation */}
        </div>

        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-4/5 flex justify-center items-center bg-blue-100 shadow-xl">
          <Routes className="w-full flex">            
            <Route path="/" element={<LiveCameraFeed />} />
            <Route path="/past-events" element={<PastEvents />} />
            <Route path="/video-upload" element={<UploadVideo />} />
            <Route path="/video-player" element={<VideoPlayer />} />
          </Routes>
        </div >
      </div>
    </Router>
  );
};

export default App;