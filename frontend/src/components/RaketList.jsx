import React from "react";
import JobCard from "./RaketCard";
import Mockup from "../assets/images/raketnow-mockup.png";

// 4 lang ka featured jobs para aesthetic dont touch thank you
// to be replaced with actual data from API? basta go backend

const jobs = [
  {
    image: Mockup,
    title: "Logo & Branding Design wuhdiashdiuhasdihasdiuhswehdkwhdfjhdsjkfhsuidfhiusudfhiusfhdaid",
    description: "Professional logo design and complete brand identity package hehe sure sure no problem for startups and businesses.",
    budget: 7500,
    user: "DesignPro Studios",
    postedAt: "2h ago",
    location: "Makati",
    rating: 4.7,
    featured: true,
  },
  {
    image: Mockup,
    title: "Video Editing Services",
    description: "Professional video editing for YouTube, social media, and corporate videos with quick turnaround time.",
    budget: 12000,
    user: "VisualCraft Media",
    postedAt: "1h ago",
    location: "Quezon City",
    rating: 4.9,
    featured: true,
  },
  {
    image: Mockup,
    title: "Video Editing Services",
    description: "Professional video editing for YouTube, social media, and corporate videos with quick turnaround time.",
    budget: 12000,
    user: "VisualCraft Media",
    postedAt: "1h ago",
    location: "Quezon City",
    rating: 4.9,
    featured: true,
  },
  {
    image: Mockup,
    title: "Video Editing Services",
    description: "Professional video editing for YouTube, social media, and corporate videos with quick turnaround time.",
    budget: 12000,
    user: "VisualCraft Media",
    postedAt: "1h ago",
    location: "Quezon City",
    rating: 4.9,
    featured: true,
  },
];

const JobList = () => (
  <section className="bg-[#F9FAFB] px-6 py-24">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-[#0C2C57]">Featured Gigs</h2>
        <a href="/gigs" className="text-[#FF7C2B] font-medium text-sm">
          See All
        </a>
      </div>

      {/* Desktop: flex-wrap grid | Mobile: horizontal scroll */}
      <div className="hidden sm:flex flex-wrap justify-center gap-6">
        {jobs.map((job, idx) => (
          <div key={idx} className="w-[14rem] sm:w-[16rem] md:w-[18rem]">
            <JobCard {...job} />
          </div>
        ))}
      </div>

      <div className="sm:hidden overflow-x-auto">
        <div className="flex gap-4">
          {jobs.map((job, idx) => (
            <div key={idx} className="shrink-0 w-[16rem]">
              <JobCard {...job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default JobList;
