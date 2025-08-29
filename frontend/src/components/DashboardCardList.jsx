import React from "react";
import DashboardCard from "./DashboardCard";
import { Briefcase, Lightbulb } from "lucide-react";
import { useMyRakets } from "../hooks/useMyRakets";

const DashboardCardList = () => {
  const { myRakets, loading } = useMyRakets();

  const activeRakets = loading
    ? ["Loading..."]
    : myRakets
        .filter(r => r.status === "active")
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 3)
        .map(r => r.title);

  return (
    <div className="flex flex-wrap gap-6">
      {/* My Active Rakets */}
      <div className="flex-1 min-w-[280px]">
        <DashboardCard
          icon={Briefcase}
          title="My Active Rakets"
          items={
            loading
              ? ["Loading..."]
              : activeRakets.length > 0
              ? activeRakets
              : ["No Active Rakets"]
          }
          ctaText="View All →"
          ctaLink="/my-rakets"
        />
      </div>

      {/* Suggested Rakets */}
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
