import React from "react";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import UserRakets from "../components/UserRakets"; 
import RaketStatus from "../components/RaketStatus";

// for debugging
import DebugPanel from "../components/DebugPanel"; 
import { useCurrentUser } from "../hooks/useCurrentUser";

const MyRakets = () => {
  const currentUser = useCurrentUser();
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <DebugPanel user={currentUser} />
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 z-20 bg-white border-r">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Section */}
        <div className="sticky top-0 z-10 bg-white">
          <SearchBar />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <UserRakets />
          <RaketStatus />
        </div>
      </div>
    </div>
  );
};

export default MyRakets;