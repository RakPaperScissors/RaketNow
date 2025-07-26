import React from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import SearchBar from "../components/SearchBar";
import DashboardCardList from "../components/DashboardCardList";
import SideNav from "../components/SideNav";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
  return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p>Loading...</p>
      </div>
    );
  }
  if (!user) return <p>You are not logged in.</p>;
  

  return (
    <div className="flex">
      <SideNav />

      <div className="flex-1 relative min-h-screen bg-[#ffffff]">
        {/* Top Banner */}
        <WelcomeBanner firstName={user?.firstName} />

        {/* Search */}
        <div className="absolute left-1/2 top-44 transform -translate-x-1/2 z-10 w-full px-4">
          <SearchBar transparentBg />
        </div>

        {/* Main content */}
        <div className="pt-28 px-8 space-y-6">
          <DashboardCardList />
        </div>

      </div>
    </div>
  );
};

export default Home;
