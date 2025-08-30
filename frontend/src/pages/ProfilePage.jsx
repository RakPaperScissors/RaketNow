import React, { useState }from "react";
import SideNav from "../components/SideNav";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../context/AuthContext";
import RecentActivity from "../components/RecentActivity";
import FinishedJobs from "../components/FinishedJobs";
import LoadingSpinner from "../components/LoadingSpinner";


function ProfilePage() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  const { loading } = useAuth();


  if (loading) return <LoadingSpinner fullScreen />;


  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <div className={`${collapsed ? "w-20" : ""} h-screen fixed top-0 left-0 z-50 transition-all duration-200`}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>


      {/* diri ang contents */}
      <div className={`flex-1 relative min-h-screen overflow-y-auto transition-all duration-200 pb-20 md:pb-0 ${
        collapsed ? "md:ml-20" : "md:ml-64"
      }`}>
        <div className = "px-10 py-16">
        <h1 className="text-2xl font-bold text-[#0c2c57] mb-6 px-8">My Profile</h1>
        <ProfileCard />
        </div>
      </div>
    </div>
  );
}


export default ProfilePage;