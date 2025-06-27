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
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Featured Services
      </h1>
    <div className="flex space-x-4 overflow-x-auto px-4 py-6 scrollbar-hide">
      {categories.map((cat, index) => (
        <CategoryCard key={index} {...cat} isActive={index === 0} />
      ))}
    </div>
    </div>
  );
};

export default CardList;
