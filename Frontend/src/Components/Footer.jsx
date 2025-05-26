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
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';


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
   <footer className="mt-2 border-t border-slate-800/50 pt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
      <div className="relative text-center">
        <div className="flex justify-center items-center space-x-3 mb-6 group">
          <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
          </div>
          <span className="text-2xl font-bold text-white font-inter group-hover:text-indigo-100 transition-colors duration-300">
            PYP | Exam_Prep
          </span>
        </div>
        <p className="text-slate-400  space-x-2 font-inter text-lg">© 2025 University Papers Platform. All rights reserved.</p>
       
      </div>
    </footer>
  );
}
export default Footer;
//
// Footer component



