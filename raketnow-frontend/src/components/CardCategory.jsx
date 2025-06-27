import React from 'react';

const CategoryCard = ({ icon: Icon, label }) => {
  return (
    <div
      className="group flex flex-col items-center justify-center p-4 w-36 h-32 rounded-xl shadow-md 
        cursor-pointer transition-all duration-300 
        bg-white hover:bg-[#FFF4ED] hover:ring-[1.5px] hover:ring-[#FF7C2B]/40"
    >
      <Icon className="w-8 h-8 mb-2 text-[#0C2C57] group-hover:text-[#FF7C2B] transition-colors duration-300" />
<p className="text-sm text-center text-[#0C2C57] font-medium group-hover:text-[#FF7C2B] transition-colors duration-300">
  {label}
</p>

    </div>
  );
};

export default CategoryCard;
