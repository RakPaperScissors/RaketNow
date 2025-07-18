import React from "react";

const WelcomeBanner = ({ fullName = "User" }) => {
  const firstName = fullName.split(" ")[0];

  return (
    <div className="relative w-full h-64 bg-gradient-to-r from-[#EFF6FF] to-[#FFF7ED] text-[#0C2C57] flex flex-col justify-center items-center px-6">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back, {firstName}!
      </h1>
      <p className="text-base">
        Ready to find your next raket or post a new gig?
      </p>
    </div>
  );
};

export default WelcomeBanner;
