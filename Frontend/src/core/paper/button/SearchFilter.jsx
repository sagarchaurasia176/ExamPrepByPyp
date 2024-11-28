import React from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

const SearchFilter = () => {
  return (
    <div className="flex justify-center items-center bg-gray-900">
      <button className="bg-green-500 text-white px-6 py-2 w-[20rem] flex items-center justify-center rounded-lg hover:bg-green-600 focus:outline-none">
        <FaSearch className="mr-2" /> {/* Icon with spacing */}
        Click to Search
      </button>
    </div>
  );
};

export default SearchFilter;
