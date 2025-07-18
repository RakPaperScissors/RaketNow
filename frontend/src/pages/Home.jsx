import React from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import SearchBar from "../components/SearchBar";
import DashboardCardList from "../components/DashboardCardList";
import SideNav from "../components/SideNav";

const Home = () => {
  const mockUser = {
    fullName: "Daniya Reyes",
  };

  return (
    <div className="flex">
      <SideNav />

      <div className="flex-1 relative min-h-screen bg-[#ffffff]">
        {/* Top Banner */}
        <WelcomeBanner fullName={mockUser.fullName} />

        {/* Floating Search */}
        <SearchBar />

        {/* Main content (add padding to avoid overlap) */}
        <div className="pt-28 px-8 space-y-6">
          <DashboardCardList />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
