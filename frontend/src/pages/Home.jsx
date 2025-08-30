import React, { useState, useEffect } from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import SearchBar from "../components/SearchBar";
import DashboardCardList from "../components/DashboardCardList";
import SideNav from "../components/SideNav";
import { useAuth } from "../context/AuthContext";
import { fetchRakets } from "../api/rakets";
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

  const [rakets, setRakets] = useState([]);
  const [loadingRakets, setLoadingRakets] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRakets()
      .then((data) => {
        setRakets(data);
        setLoadingRakets(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingRakets(false);
      });
  }, []);

  if (authLoading || loadingRakets) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) return <p>You are not logged in.</p>;

  const filteredRakets = rakets.filter((raket) =>
    raket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } h-screen fixed top-0 left-0 z-50 transition-all duration-200`}
      >
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 relative min-h-screen bg-[#F9FAFB] overflow-y-auto transition-all duration-200 pb-20 md:pb-0 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        } ml-0`}
      >
        {/* Top Banner */}
        <div className="relative z-10">
          <WelcomeBanner
            firstName={user?.firstName}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Main content */}
        <div className="bg-[#F9FAFB] -mt-2 md:-mt-4 pt-10 md:pt-16 lg:pt-20 px-8 space-y-6 relative">
          <PostRaket />
          <Help />
          <DashboardCardList />

          {/* Filtered search results */}
          {searchTerm && (
            <div className="mt-5 mb-10">
              <h2 className="text-xl text-[#0c2c57] font-semibold mb-4">
                Search results for{" "}
                <span className="text-[#ff7c2b]">"{searchTerm}"</span>
              </h2>

              {error && <p className="text-red-500">{error}</p>}

              {filteredRakets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRakets.map((raket) => (
                    raket.raketId && (
                      <RaketCard
                        key={raket.raketId}
                        raketId={raket.raketId}
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
                    )
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
