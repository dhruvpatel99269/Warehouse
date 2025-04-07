import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiCamera, FiClock } from "react-icons/fi";
import { MdOutlineVideocam } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full h-screen px-4 py-6 hidden md:flex flex-col justify-start items-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-xl">
        <div className="w-full flex justify-center items-center mb-10">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-extrabold tracking-widest py-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
            SurveilEdge
          </h1>
        </div>
        <ul className="w-full flex flex-col text-lg font-semibold space-y-6 justify-center items-center">
          <li
            className={`flex justify-center items-center space-x-4 px-0 lg:px-4 xl:px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 w-full ${
              isActive("/")
                ? "bg-white/20 backdrop-blur-md text-pink-300"
                : "hover:bg-white/10 hover:backdrop-blur-md"
            }`}
          >
            <FiCamera className={`text-2xl ${isActive("/") ? "text-pink-300" : "text-pink-400"}`} />
            <Link to="/" className={`${isActive("/") ? "text-pink-300" : "hover:text-pink-300"} transition-all`}>
              Live Camera Feed
            </Link>
          </li>
          <li
            className={`flex justify-center items-center space-x-4 px-0 lg:px-4 xl:px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 w-full ${
              isActive("/past-events")
                ? "bg-white/20 backdrop-blur-md text-purple-300"
                : "hover:bg-white/10 hover:backdrop-blur-md"
            }`}
          >
            <FiClock className={`text-2xl ${isActive("/past-events") ? "text-purple-300" : "text-purple-400"}`} />
            <Link
              to="/past-events"
              className={`${isActive("/past-events") ? "text-purple-300" : "hover:text-purple-300"} transition-all`}
            >
              Past Events
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#1f1c2c] to-[#928dab] text-white p-6 transition-transform duration-500 shadow-2xl rounded-r-3xl z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-3xl text-white hover:text-gray-300 transition-transform hover:scale-110"
        >
          <FiX />
        </button>
        <div className="mt-16">
          <ul className="space-y-6 text-lg font-medium">
            <li
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                isActive("/")
                  ? "bg-white/20 backdrop-blur-md text-pink-300"
                  : "hover:bg-white/10 hover:backdrop-blur-md"
              }`}
            >
              <FiCamera className={`text-xl ${isActive("/") ? "text-pink-300" : "text-pink-400"}`} />
              <MdOutlineVideocam />
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`${isActive("/") ? "text-pink-300" : "hover:text-pink-200"} transition-all`}
              >
                Live Camera Feed
              </Link>              
            </li>
            <li
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                isActive("/past-events")
                  ? "bg-white/20 backdrop-blur-md text-purple-300"
                  : "hover:bg-white/10 hover:backdrop-blur-md"
              }`}
            >
              <FiClock className={`text-xl ${isActive("/past-events") ? "text-purple-300" : "text-purple-400"}`} />
              <Link
                to="/past-events"
                onClick={() => setIsOpen(false)}
                className={`${isActive("/past-events") ? "text-purple-300" : "hover:text-purple-200"} transition-all`}
              >
                Past Events
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
