import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { BASE_URL } from "../config";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${BASE_URL}/user`, { withCredentials: true })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-[#253900] to-[#08CB00] text-white flex fixed top-0 left-0 items-center justify-between z-[999] pl-4 pr-6 py-3 shadow-md shadow-black/30 w-full">
      {/* Logo */}
      <Link to="/home">
        <div className="flex items-center space-x-3 text-[#08CB00] text-2xl font-extrabold hover:scale-105 transition-transform">
          <img
  src={logo}
  alt="Logo"
  className="w-14 h-14 ml-5 rounded-full shadow-md object-cover"
/>

          <span className="text-white hover:text-[#08CB00] transition-colors">
            KhetMitra
          </span>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        <Link to="/home" className="hover:text-[#08CB00] transition-colors">
          Home
        </Link>
        <Link to="/diagnose" className="hover:text-[#08CB00] transition-colors">
          Diagnose
        </Link>
        <Link to="/cropData" className="hover:text-[#08CB00] transition-colors">
          Crop Data
        </Link>
        <Link to="/about" className="hover:text-[#08CB00] transition-colors">
          About Us
        </Link>
        <Link to="/help" className="hover:text-[#08CB00] transition-colors">
          Help
        </Link>
        <Link to="/enam" className="hover:text-[#08CB00] transition-colors">
          Enam
        </Link>
      </div>

      {/* Profile */}
      <div className="relative pr-2" ref={dropdownRef}>
        <img
          src={
            user?.profileImage ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
          onClick={() => setShowDropdown((prev) => !prev)}
          className="h-11 w-11 rounded-full object-cover cursor-pointer border-2 border-[#08CB00] hover:shadow-[0_0_12px_#08CB00] transition"
          alt="profile"
        />

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-52 bg-[#1B1B1B] text-white rounded-lg shadow-lg flex flex-col border border-[#08CB00]">
            <div className="md:hidden flex flex-col">
              <Link to="/home" className="px-4 py-2 hover:bg-[#08CB00]/20">
                Home
              </Link>
              <Link to="/diagnose" className="px-4 py-2 hover:bg-[#08CB00]/20">
                Diagnose
              </Link>
              <Link to="/cropData" className="px-4 py-2 hover:bg-[#08CB00]/20">
                Crop Data
              </Link>
              <Link to="/about" className="px-4 py-2 hover:bg-[#08CB00]/20">
                About Us
              </Link>
              <Link to="/help" className="px-4 py-2 hover:bg-[#08CB00]/20">
                Help
              </Link>
              <Link to="/enam" className="px-4 py-2 hover:bg-[#08CB00]/20">
                Enam
              </Link>
            </div>

            {isAuthenticated === false && (
              <Link to="/signup" className="px-4 py-2 hover:bg-[#08CB00]/20">
                Sign up
              </Link>
            )}

            {user && (
              <>
                <Link
                  to="/myProfile"
                  className="px-4 py-2 hover:bg-[#08CB00]/20 border-t border-gray-700"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-300 hover:bg-red-600/20 border-t border-gray-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
