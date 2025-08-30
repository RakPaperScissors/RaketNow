import React from "react";

const CategoryCard = ({ icon: Icon, label, link }) => {
  return (
    <a
      className="group relative flex flex-col items-center justify-center p-4 w-36 h-32 rounded-xl shadow-md 
      cursor-pointer transition-all duration-300 bg-white overflow-hidden"
    >
      <div className="absolute w-26 h-26 rounded-full bg-[radial-gradient(circle,_#FFF4ED,_#fff4edc2)] opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 blur-md" />

      <div className="relative z-10 flex flex-col items-center">
        <Icon className="w-8 h-8 mb-2 text-[#0C2C57] group-hover:text-[#FF7C2B] transition-colors duration-300" />
        <p className="text-sm text-center text-[#0C2C57] font-medium group-hover:text-[#FF7C2B] transition-colors duration-300">
          {label}
        </p>
      </div>
    </a>
  );
};

export default CategoryCard;
