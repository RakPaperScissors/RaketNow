import React from 'react';
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
  return (
    <div className="px-4 pt-1 pb-6">
      <h1 className="text-2xl font-semibold text-center text-[#0C2C57] mb-4">
        Featured Services
      </h1>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-1 py-4">
        {categories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
