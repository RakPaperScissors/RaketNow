import React from "react";
import DashboardCard from "./DashboardCard";
import { Briefcase, Lightbulb, Rocket } from "lucide-react";

// To be replaced with actual data from the backend 
const DashboardCardList = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <DashboardCard
        icon={Briefcase}
        title="My Active Rakets"
        items={[
          "Graphic Design for Lokal Cafe",
          "React Website for NGO",
          "Social Media Manager - Ongoing",
        ]}
        ctaText="View All →"
        ctaLink="#"
      />

      <DashboardCard
        icon={Lightbulb}
        title="Suggested Rakets"
        items={[
          "UX Designer for Mobile App",
          "Virtual Assistant - Data Entry",
          "Logo Design Contest",
        ]}
        ctaText="Explore Matches →"
        ctaLink="#"
      />

      <DashboardCard
        icon={Rocket}
        title="Upgrade to Pro"
        items={[
          "Access premium gigs",
          "Boost your visibility",
          "Rank higher in search",
        ]}
        ctaText="Upgrade Now"
        ctaLink="#"
        isPromo={true}
        bgGradient="from-[#1e2761] via-[#94480e] to-[#ff7c2b]"
        textColor="text-white"
      />
    </div>
  );
};

export default DashboardCardList;
