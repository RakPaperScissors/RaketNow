import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Briefcase, Lightbulb } from "lucide-react";
import { fetchMyRakets, fetchOpenRakets } from "../api/rakets";
import { fetchCurrentUserSkills } from "../api/skills";
import { useCurrentUser } from "../hooks/useCurrentUser";

const DashboardCardList = () => {
  const user = useCurrentUser();
  const [myRakets, setMyRakets] = useState([]);
  const [suggestedRakets, setSuggestedRakets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadRakets = async () => {
      try {
        // fetch my rakets for all users
        const myRaketsData = await fetchMyRakets();
        setMyRakets(myRaketsData || []);

        // Only fetch skills & open rakets if user is Raketista
        if (user.type === "Raketista") {
          const [skillsData, openRaketsData] = await Promise.all([
            fetchCurrentUserSkills(),
            fetchOpenRakets(),
          ]);

          const userCategories = skillsData.map(skill =>
            skill.category?.trim().toLowerCase()
          );

          const matchedRakets = (openRaketsData || [])
            .filter(
              raket =>
                raket.status === "open" &&
                userCategories.includes(raket.category?.trim().toLowerCase())
            )
            .sort(
              (a, b) =>
                new Date(b.dateCreated).getTime() -
                new Date(a.dateCreated).getTime()
            )
            .slice(0, 3)
            .map(r => ({
              raketId: r.raketId,
              title: r.title,
              category: r.category,
            }));

          setSuggestedRakets(matchedRakets);
        }
      } catch (err) {
        console.error("Error loading rakets:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRakets();
  }, [user]);

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

      {/* Suggested Rakets - only for Raketista */}
      {user?.type === "Raketista" && (
        <div className="flex-1 min-w-[280px]">
          <DashboardCard
            icon={Lightbulb}
            title="Suggested Rakets"
            items={
              loading
                ? []
                : suggestedRakets.length > 0
                ? suggestedRakets
                : [{ raketId: "none", title: "No Suggestions Available" }]
            }
            ctaText="Explore Matches →"
            ctaLink="/rakets"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardCardList;
