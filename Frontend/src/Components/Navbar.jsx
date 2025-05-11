import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // We'll create this context

const Navbar = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="bg-slate-950/100 p-4 sticky top-0 z-50">
      <div className="max-w-[1080px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl">
            PYP | <b>Exam_Prep</b>
          </span>
        </Link>

        {/* User profile section */}
        {isAuthenticated && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={user.avatar || "https://via.placeholder.com/40"}
                alt="User profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-indigo-300"
              />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm text-white">Signed in as</p>
                  <p className="text-sm font-medium text-white truncate">{user.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 w-full text-left"
                  onClick={() => setDropdownOpen(false)}
                >
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 w-full text-left"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;