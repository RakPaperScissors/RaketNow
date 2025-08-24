import React, { useState } from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import SearchBar from "../components/SearchBar";
import DashboardCardList from "../components/DashboardCardList";
import SideNav from "../components/SideNav";
import { useAuth } from "../context/AuthContext";
import { useRakets } from "../hooks/useRakets";
import RaketCard from "../components/RaketCard";
import PostRaket from "../components/PostRaket";
import Help from "../components/Help";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  const { user, loading: authLoading } = useAuth();
  const { rakets, loading: raketLoading } = useRakets();
  const [searchTerm, setSearchTerm] = useState("");
  

  if (authLoading) {
    return <LoadingSpinner fullScreen />;
  }
  if (!user) return <p>You are not logged in.</p>;

  const filteredRakets = rakets.filter((raket) =>
    raket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <div className={`${collapsed ? "w-20" : "w-64"} h-screen fixed top-0 left-0 z-50 transition-all duration-200`}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div className={`${collapsed ? "ml-20" : "ml-64"} flex-1 relative min-h-screen bg-[#ffffff] overflow-y-auto transition-all duration-200`}>
        {/* Top Banner */}
        <WelcomeBanner firstName={user?.firstName} />

        {/* Search */}
        <div className="absolute left-1/2 top-44 transform -translate-x-1/2 z-10 w-full px-4">
          <SearchBar
            transparentBg
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Main content */}
        <div className="pt-28 px-8 space-y-6 relative">
          <PostRaket />
          <Help />
          <DashboardCardList />
          {/* Show filtered rakets */}
          {searchTerm && (
            <div className="mt-5 mb-10">
              <h2 className="text-xl text-[#0c2c57] font-semibold mb-4">
                Search results for{" "}
                <span className="text-[#ff7c2b]">"{searchTerm}"</span>
              </h2>

              {raketLoading ? (
                <p>Loading search results...</p>
              ) : filteredRakets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRakets.map((raket) => (
                    <RaketCard
                      key={raket.raketId}
                      title={raket.title}
                      description={raket.description}
                      images={raket.images || []}
                      budget={raket.budget}
                      user={raket.user || "Unknown"}
                      postedAt={raket.postedAt}
                      location={raket.location}
                      rating={raket.rating}
                      category={raket.category}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No rakets found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
