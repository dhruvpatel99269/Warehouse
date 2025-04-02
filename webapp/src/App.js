
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveCameraFeed from "./pages/LiveCameraFeed";
import PastEvents from "./pages/PastEvents";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App () {
  return (
    <Router>
      <Navbar /> {/* Add a navigation bar for easy navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-camera-feed" element={<LiveCameraFeed />} />
        <Route path="/past-events" element={<PastEvents />} />
      </Routes>
    </Router>
  );
};

export default App;