import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useLayoutEffect } from 'react';


const Footer = () => {  
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
    <footer className="bg-slate-950 text-white py-4">
      <div className="max-w-[1080px] mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-xl">
            PYP | <b>Exam_Prep</b>
          </Link>
        </div>

        {/* Social Media Icons */}
       
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PYP | Exam_Prep. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;
//
// Footer component



