import React, { useState } from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import SearchBar from "../components/SearchBar";
import DashboardCardList from "../components/DashboardCardList";
import SideNav from "../components/SideNav";
import { useAuth } from "../context/AuthContext";
import { useRakets } from "../hooks/useRakets";
import RaketCard from "../components/RaketCard";

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const { rakets, loading: raketLoading} = useRakets();
  const [searchTerm, setSearchTerm] = useState("");

  if (authLoading) {
  return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p>Loading...</p>
      </div>
    );
  }
  if (!user) return <p>You are not logged in.</p>;
  
  const filteredRakets = rakets.filter((raket) =>
    raket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(rakets);
  return (
    <div className="flex">
      <div className="w-64 h-screen fixed top-0 left-0 z-50">
        <SideNav />
      </div>

      <div className="ml-64 flex-1 relative min-h-screen bg-[#ffffff] overflow-y-auto">
        {/* Top Banner */}
        <WelcomeBanner firstName={user?.firstName} />

        {/* Search */}
        <div className="absolute left-1/2 top-44 transform -translate-x-1/2 z-10 w-full px-4">
          <SearchBar transparentBg searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>

        {/* Main content */}
        <div className="pt-28 px-8 space-y-6">
          <DashboardCardList />

          {/* Show filtered rakets */}
          {searchTerm && (
            <div className="mt-5 mb-10">
              <h2 className="text-xl font-semibold mb-4">
                Search results for "{searchTerm}"
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
