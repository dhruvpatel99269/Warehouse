import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiCamera, FiClock } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar for larger screens */}
      <nav className="w-full h-screen px-8 py-6 hidden md:flex flex-col justify-start items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl">
        <div className="w-full flex justify-center items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide text-blue-400">SurveilEdge</h1>
        </div>
        <ul className="w-full flex flex-col text-lg font-semibold space-y-6">          
          <li className="flex items-center space-x-4 px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300">
            <FiCamera className="text-xl text-blue-400" />
            <Link to="/" className="hover:text-blue-300">Live Camera Feed</Link>
          </li>
          <li className="flex items-center space-x-4 px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300">
            <FiClock className="text-xl text-blue-400" />
            <Link to="/past-events" className="hover:text-blue-300">Past Events</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-blue-500 shadow-md w-full h-[10vh]">
        <h1 className="text-xl font-bold text-white">SurveilEdge</h1>
        <button onClick={() => setIsOpen(true)} className="text-2xl text-white">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 p-6 text-white transition-transform duration-300 shadow-2xl rounded-r-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl text-white hover:text-gray-400"
        >
          <FiX />
        </button>
        <ul className="mt-14 space-y-5">          
          <li className="flex items-center space-x-4 px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300">
            <FiCamera className="text-xl text-blue-400" />
            <Link to="/" className="hover:text-blue-300" onClick={() => setIsOpen(false)}>Live Camera Feed</Link>
          </li>
          <li className="flex items-center space-x-4 px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300">
            <FiClock className="text-xl text-blue-400" />
            <Link to="/past-events" className="hover:text-blue-300" onClick={() => setIsOpen(false)}>Past Events</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;