import React from "react";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import DebugPanel from "../components/DebugPanel";
import ApplicationList from "../components/ApplicationList";

const MyApplications = () => {

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Debug Info */}

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-20">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* SearchBar on Top */}
        <div className="sticky top-0 z-10 bg-white">
          <SearchBar />
        </div>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <ApplicationList />
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
