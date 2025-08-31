import React from "react";
import SearchBar from "./SearchBar";

const WelcomeBanner = ({ userCreatedAt, firstName, searchTerm, setSearchTerm }) => {

  const isNew = userCreatedAt && new Date() - new Date(userCreatedAt) < 24 * 60 * 60 * 1000;

  return (
    <div className="relative w-full h-80 bg-gradient-to-r from-[#EFF6FF] to-[#FFF7ED] text-[#0C2C57] flex flex-col justify-center items-center px-6 py-12 shadow-xs md:py-16">

      <h1 className="text-3xl font-bold mb-2 mt-3 md:mt-3">
        {isNew ? "Welcome, " : "Welcome back, "}<span className="text-[#FF7C2B]">{firstName}</span>!
      </h1>
      <p className="text-base text-[#374151] mt-3">
        Ready to find your next{" "}
        <span className="text-[#FF7C2B] font-medium">raket</span> or post a new
        gig?
      </p>

      {typeof setSearchTerm === "function" && (
        <div className="w-full max-w-xl mt-3">
          <SearchBar
            transparentBg
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;
