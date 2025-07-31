import React from "react";
import SideNav from "../components/SideNav";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function ProfilePage() {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen/>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />

      {/* diri ang contents */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#0c2c57] mb-6">My Profile</h1>
        <ProfileCard />
      </main>
    </div>
  );
}

export default ProfilePage;
