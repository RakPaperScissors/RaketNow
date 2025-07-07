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
  { icon: Hammer, label: 'Home Repairs & Maintenance', link: '' },
  { icon: MonitorSmartphone, label: 'Tech & Electronics Support', link: '' },
  { icon: Heart, label: 'Personal & Home Care', link: '' },
  { icon: PartyPopper, label: 'Events & Entertainment', link: '' },
  { icon: Utensils, label: 'Food & Beverage', link: '' },
  { icon: GraduationCap, label: 'Education & Tutoring', link: '' },
  { icon: Paintbrush, label: 'Graphic & Digital Design', link: '' },
  { icon: Briefcase, label: 'Business & Professional Services', link: '' },
  { icon: Car, label: 'Automotive Services', link: '' },
  { icon: Truck, label: 'Moving & Delivery Services', link: '' },
];

const CardList = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleCategories = expanded ? categories : categories.slice(0, 4);

  return (
    <div className="px-4 py-20 bg-[#F9FAFB]">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#0C2C57] mt-2 sm:mt-4 md:mt-6 lg:mt-4 mb-6">
        Featured Services
      </h1>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-x-3 lg:gap-y-8 lg:px-10 lg:py-6 lg:place-items-center">
        {categories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>

      {/* Mobile */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 lg:hidden">
        {visibleCategories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>

      {/* Toggle button for mobile */}
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
