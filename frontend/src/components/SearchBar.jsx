import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ transparentBg = false, searchTerm, setSearchTerm }) => {
  return (
    <div className={`w-full px-4 py-4 ${transparentBg ? "bg-transparent" : "bg-[#f9fafb]"}`}>
      <div className="mx-auto w-full max-w-xl flex rounded-md overflow-hidden border border-gray-300 bg-white">
        <input
          type="text"
          placeholder="Search for rakets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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