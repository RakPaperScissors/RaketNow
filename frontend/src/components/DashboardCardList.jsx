import React from "react";
import DashboardCard from "./DashboardCard";
import { Briefcase, Lightbulb } from "lucide-react";

const DashboardCardList = () => {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex-1 min-w-[280px]">
        <DashboardCard
          icon={Briefcase}
          title="My Active Rakets"
          items={[
            "Graphic Design for Lokal Cafe",
            "React Website for NGO",
            "Social Media Manager - Ongoing",
          ]}
          ctaText="View All →"
          ctaLink="/my-rakets"
        />
      </div>

      <div className="flex-1 min-w-[280px]">
        <DashboardCard
          icon={Lightbulb}
          title="Suggested Rakets"
          items={[
            "UX Designer for Mobile App",
            "Virtual Assistant - Data Entry",
            "Logo Design Contest",
          ]}
          ctaText="Explore Matches →"
          ctaLink="/rakets"
        />
      </div>
    </div>
  );
};

export default DashboardCardList;
