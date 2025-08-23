import React from "react";
import SideNav from "../components/SideNav";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../context/AuthContext";
import RecentActivity from "../components/RecentActivity";
import FinishedJobs from "../components/FinishedJobs";
import LoadingSpinner from "../components/LoadingSpinner";

function ProfilePage() {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 z-20">
        <SideNav />
      </div>

      {/* diri ang contents */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold text-[#0c2c57] mb-6">My Profile</h1>
        <ProfileCard />
      </main>
    </div>
  );
}

export default ProfilePage;
