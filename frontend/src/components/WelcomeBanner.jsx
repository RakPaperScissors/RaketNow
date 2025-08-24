import React from "react";

const WelcomeBanner = ({ firstName }) => {
  return (
    <div className="relative w-full h-70 bg-gradient-to-r from-[#EFF6FF] to-[#FFF7ED] text-[#0C2C57] flex flex-col justify-center items-center px-6 py-12 shadow-sm">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back, <span className="text-[#FF7C2B]">{firstName}</span>!
      </h1>
      <p className="text-base text-[#374151]">
        Ready to find your next{" "}
        <span className="text-[#FF7C2B] font-medium">raket</span> or post a new
        gig?
      </p>
    </div>
  );
};

export default WelcomeBanner;
