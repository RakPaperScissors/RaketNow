import React, { useState } from 'react';
import CategoryCard from './CardCategory';

import {
  Hammer,
  MonitorSmartphone,
  Heart,
  PartyPopper,
  Utensils,
  GraduationCap,
  Paintbrush,
  Briefcase,
  Car,
  Truck
} from 'lucide-react';

const categories = [
  { icon: Hammer, label: 'Home Repairs & Maintenance' },
  { icon: MonitorSmartphone, label: 'Tech & Electronics Support' },
  { icon: Heart, label: 'Personal & Home Care' },
  { icon: PartyPopper, label: 'Events & Entertainment' },
  { icon: Utensils, label: 'Food & Beverage' },
  { icon: GraduationCap, label: 'Education & Tutoring' },
  { icon: Paintbrush, label: 'Graphic & Digital Design' },
  { icon: Briefcase, label: 'Business & Professional Services' },
  { icon: Car, label: 'Automotive Services' },
  { icon: Truck, label: 'Moving & Delivery Services' },
];

const CardList = () => {
  const [expanded, setExpanded] = useState(false);

  const visibleCategories = expanded ? categories : categories.slice(0, 4);

  return (
    <div className="px-4 pt-6 pb-10 bg-[#F9FAFB]">
      <h1 className="text-2xl font-semibold text-center text-[#0C2C57] mt-2 sm:mt-4 md:mt-6 lg:mt-4 mb-6">
        Featured Services
      </h1>


      <div className="hidden lg:flex space-x-4 overflow-x-auto scrollbar-hide px-1 py-4 justify-center">
        {categories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 lg:hidden">
        {visibleCategories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>

      <div className="mt-6 text-center lg:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="border-2 border-[#0C2C57] text-[#0C2C57] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#e96b20] hover:text-white active:scale-95 transition-all duration-200"
        >
          {expanded ? 'See Less' : 'See More'}
        </button>
      </div>

    </div>
  );
};

export default CardList;
