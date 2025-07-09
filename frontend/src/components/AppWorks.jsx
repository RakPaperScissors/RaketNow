import React from 'react';
import {
  UserRoundSearch,
  MessageCircleMore,
  CalendarCheck,
  CircleCheckBig,
} from 'lucide-react';

const StepCard = ({ icon: Icon, label, description }) => (
  <div className="p-6 flex-shrink-0 flex flex-col items-center text-center gap-4 w-[250px] min-h-[300px]">
    <div className="bg-[#FF7C2B] p-3 rounded-full shadow-inner">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-[#0C2C57] min-h-[48px] flex items-center">
      {label}
    </h3>
    <p className="text-sm text-gray-700 min-h-[60px] flex items-center">
      {description}
    </p>
  </div>
);

const steps = [
  {
    icon: UserRoundSearch,
    label: 'Post a Raket',
    description: 'Describe the task or service you need help with.',
  },
  {
    icon: MessageCircleMore,
    label: 'Receive & Review Offers',
    description: 'Browse proposals from interested Raketistas and choose who best fits your needs.',
  },
  {
    icon: CalendarCheck,
    label: 'Hire & Collaborate',
    description: 'Hire your chosen Raketista, align on expectations, and get the job done smoothly.',
  },
  {
    icon: CircleCheckBig,
    label: 'Rate & Build Your Cred',
    description: 'Give feedback after the job and help the raketista grow their reputation on the RaketNow community.',
  },
];


const AppWorks = () => (
  <section className="bg-[#FFFFFF] mt-6 px-4 py-12 ">
    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#0C2C57] mb-10">
      How it Works
    </h2>

    {/* Mobile - horizontal scroll */}
    <div className="flex flex-nowrap gap-6 overflow-x-auto hide-scrollbar sm:hidden px-2">
      {steps.map((step, index) => (
        <StepCard key={index} {...step} />
      ))}
    </div>

    {/* Tablet/Desktop - grid layout */}
    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
      {steps.map((step, index) => (
        <StepCard key={index} {...step} />
      ))}
    </div>
  </section>
);


export default AppWorks;
