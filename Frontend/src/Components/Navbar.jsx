import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";


// Navbar component
// This component is responsible for rendering the navigation bar of the application.
const Navbar = () => {
  const { user, isAuthenticated, logout, isLoading } = useUser();
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    setDropdownOpen(false);
    if (success) {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-950/100 p-4 sticky top-0 z-50">
        <div className="max-w-[1080px] mx-auto flex justify-between items-center">
          {/* Loading skeleton or spinner */}
          <div className="animate-pulse h-10 w-40 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950/100 p-4 sticky top-0 z-50">
      <div className="max-w-[1080px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 text-white">
        <BookOpen className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
          <span className="text-xl">
            PYP | <b>Exam_Prep</b>
          </span>
        </Link>

        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
              aria-label="User menu"
            >
              <img
                src={user?.avatar || alert("No avatar found")}
                alt="User profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-indigo-300"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm text-black">Signed in as</p>
                  <p className="text-sm font-medium text-black truncate">
                    {user?.email || user?.username || "User"}
                  </p>
                </div>
              
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 w-full text-left"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <></>
          // <div className="flex space-x-4">
          //   <Link
          //     to="/login"
          //     className="text-white hover:text-indigo-300 transition-colors"
          //   >
          //     Login
          //   </Link>
        
          // </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;