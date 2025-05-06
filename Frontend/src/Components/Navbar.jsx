import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logoimg.png";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-950/70 p-4">
      <div className="max-w-[1080px] mx-auto flex justify-center lg:flex lg:justify-start md:flex md:justify-start">
        <Link
          to="/"
          className="flex items-center space-x-3 text-white"
        >
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
      </div>
    </div>
  );
};

export default Navbar;
