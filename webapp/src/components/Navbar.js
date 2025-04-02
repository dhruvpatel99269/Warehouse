import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar for larger screens */}
      <nav className="bg-blue-300 px-6 py-3 hidden md:flex justify-between items-center">
        <h1 className="text-xl font-bold">SurveilEdge</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-white">Home</Link></li>
          <li><Link to="/live-camera-feed" className="hover:text-white">Live Camera Feed</Link></li>
          <li><Link to="/past-events" className="hover:text-white">Past Events</Link></li>
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <div className="md:hidden flex items-center justify-between px-6 py-3 bg-blue-300">
        <h1 className="text-xl font-bold">My WebApp</h1>
        <button onClick={() => setIsOpen(true)} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-500 p-6 text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          <FiX />
        </button>
        <ul className="mt-10 space-y-4">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/live-camera-feed" onClick={() => setIsOpen(false)}>Live Camera Feed</Link></li>
          <li><Link to="/past-events" onClick={() => setIsOpen(false)}>Past Events</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;