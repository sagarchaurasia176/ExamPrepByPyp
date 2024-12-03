import React from "react";
import logo from "../img/logoimg.png";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" justify-between flex bg-slate-950 w-full fixed top-0 left-0 z-50 text-white p-4">
      <Link to='/' class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl text-white">PYP |  &nbsp;
        <b>Exam_Prep</b>

        </span>
      </Link>
    </div>
  );
};

export default Navbar;
