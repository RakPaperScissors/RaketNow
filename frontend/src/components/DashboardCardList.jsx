import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Briefcase, Lightbulb } from "lucide-react";
import { fetchMyRakets } from "../api/rakets";

const DashboardCardList = () => {
  const [myRakets, setMyRakets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRakets = async () => {
      try {
        const myRaketsData = await fetchMyRakets();
        setMyRakets(myRaketsData || []);
      } catch (err) {
        console.error("Error loading rakets:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRakets();
  }, []);

  const activeRakets = myRakets
    .filter(r => r.status === "in_progress" || r.status === "open")
    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
    .slice(0, 3)
    .map(r => ({ raketId: r.raketId, title: r.title }));
    
  return (
    <div className="flex flex-wrap gap-6">
      {/* My Active Rakets */}
      <div className="flex-1 min-w-[280px]">
        <DashboardCard
          icon={Briefcase}
          title="My Active Rakets"
          items={
            loading
              ? []
              : activeRakets.length > 0
              ? activeRakets
              : [{ raketId: "none", title: "No Active Rakets" }]
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
            { raketId: "1", title: "UX Designer for Mobile App" },
            { raketId: "2", title: "Virtual Assistant - Data Entry" },
            { raketId: "3", title: "Logo Design Contest" },
          ]}
          ctaText="Explore Matches →"
          ctaLink="/rakets"
        />
      </div>
    </div>
  );
};

export default DashboardCardList;
