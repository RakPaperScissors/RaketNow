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
