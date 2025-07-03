import React from "react";

function AdBanner() {
  return (
    <div className="bg-[#FF7C2B] text-white py-12 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Join raketNow today
      </h2>
      <p className="text-sm md:text-base text-white mb-6">
        Find the work or talent you need
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-[#FF7C2B] font-semibold px-6 py-2 rounded-md hover:bg-[#fab489] hover:text-[#0C2C57] transition">
          Get Started as Client
        </button>
        <button className="bg-[#0c2340] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#576e8b] hover:text-[#FF7C2B] transition">
          Join as Freelancer
        </button>
      </div>
    </div>
  );
}

export default AdBanner;
