import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="absolute left-1/2 top-48 transform -translate-x-1/2 z-10 w-full px-4">
      <div className="mx-auto w-full max-w-xl flex rounded-md overflow-hidden border border-gray-300 bg-white">
        <input
          type="text"
          placeholder="Search for rakets..."
          className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
        />
        <button className="bg-[#FF7C2B] px-4 flex items-center justify-center">
          <Search size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
