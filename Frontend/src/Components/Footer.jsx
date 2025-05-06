import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-900 fle text-white py-4 mt-8">
      <div className=" mx-auto px-4 flex justify-center   sm:flex-row items-center text-sm">
        <p className="mb-2 sm:mb-0 ">&copy; {new Date().getFullYear()} E-Paper Hub. All rights reserved.</p>
    
      </div>
    </footer>
  );
}

export default Footer;
