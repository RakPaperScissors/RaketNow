import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import UserRakets from "../components/UserRakets";
import RaketStatus from "../components/RaketStatus";
import MyApplications from "../components/MyApplications";
import { useCurrentUser } from "../hooks/useCurrentUser";

const MyRakets = () => {
  const currentUser = useCurrentUser();
  const [activeTab, setActiveTab] = useState("userRakets"); // default tab

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* SIDENAV */}
      <div className="fixed inset-y-0 left-0 w-64 z-20 bg-white border-r">
        <SideNav />
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Search Bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <SearchBar />
        </div>

        {/* TAB SECTION - now sticky */}
        <div className="sticky top-[64px] z-10 flex justify-center bg-[#f9fafb] pb-2">
          <div className="flex space-x-6 bg-white shadow-md rounded-xl px-6 py-3">
            {/* My Rakets */}
            <button
              className={`px-4 py-2 font-medium transition ${
                activeTab === "userRakets"
                  ? "text-[#0C2C57] border-b-2 border-[#FF7C2B]"
                  : "text-gray-500 hover:text-[#0C2C57]"
              }`}
              onClick={() => setActiveTab("userRakets")}
            >
              My Rakets
            </button>

            {/* Raket Status (only if raketista) */}
            {currentUser?.role === "raketista" && (
              <button
                className={`px-4 py-2 font-medium transition ${
                  activeTab === "raketStatus"
                    ? "text-[#0C2C57] border-b-2 border-[#FF7C2B]"
                    : "text-gray-500 hover:text-[#0C2C57]"
                }`}
                onClick={() => setActiveTab("raketStatus")}
              >
                Raket Status
              </button>
            )}

            {/* My Applications */}
            <button
              className={`px-4 py-2 font-medium transition ${
                activeTab === "myApplications"
                  ? "text-[#0C2C57] border-b-2 border-[#FF7C2B]"
                  : "text-gray-500 hover:text-[#0C2C57]"
              }`}
              onClick={() => setActiveTab("myApplications")}
            >
              My Applications
            </button>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {activeTab === "userRakets" && <UserRakets />}
          {activeTab === "raketStatus" && currentUser?.type === "Raketista" && (
            <RaketStatus />
          )}
          {activeTab === "myApplications" && <MyApplications />}
        </div>
      </div>
    </div>
  );
};

export default MyRakets;
