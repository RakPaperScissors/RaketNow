import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import UserNotifications from "../components/Notifications";

const MyRakets = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Fixed Sidebar */}
      <div className={`${collapsed ? "w-20" : "w-64"} h-screen fixed top-0 left-0 z-50 transition-all duration-200`}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <div className={`${collapsed ? "ml-20" : "ml-64"} flex-1 relative min-h-screen  overflow-y-auto transition-all duration-200`}>
        {/* Top Section */}
        <div className="sticky top-0 z-10 bg-white">
          <SearchBar />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <UserNotifications />
        </div>
      </div>
    </div>
  );
};

export default MyRakets;