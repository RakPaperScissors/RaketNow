import React from "react";
import { Mail, User, Hammer, Pencil, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useViewProfile } from "../hooks/useViewProfile";
import LoadingSpinner from "../components/LoadingSpinner";
import SideNav from "../components/SideNav";
import RecentActivity from "../components/RecentActivity";
import FinishedJobs from "../components/FinishedJobs";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const ViewProfile = () => {
  const { userId } = useParams();
  const { user, skills, userRakets, userCompletedRakets, loading, error } =
    useViewProfile(userId);

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!user)
    return <p className="text-center text-gray-500">User not found.</p>;
  console.log("User skills:", skills);

  const isRaketista = user.type === "Raketista";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md">
        <SideNav />
      </div>
      <main className="ml-64 flex-1 p-8 h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold text-[#0c2c57] mb-6">
          {user.firstName}'s Profile
        </h1>
        {/* Profile Card Section */}
        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "/default_profile.jpg"
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default_profile.jpg";
                  }}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-orange-300"
                />
              </div>
              <div>
                <h2 className="text-xl text-[#0c2c57] font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium capitalize">
                    {user.type === "Users" ? "Client" : user.type}
                  </span>
                  <span>• Joined {formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail className="w-4 h-4 mr-1.5" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>
          {isRaketista && (
            <div className="border-t border-gray-300 mt-6 pt-4 ">
              <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
                <User className="w-5 h-5" /> Bio
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {user.bio || "No bio has been added yet."}
              </p>
            </div>
          )}
          {isRaketista && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
                <Hammer className="2-5 h-5" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span
                      key={skill.skill.skill_Id}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill.skill.skillName}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    User has no skills yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Rakets Section */}
        <RecentActivity rakets={userRakets} />

        {/* Completed Jobs Section */}
        <FinishedJobs jobs={userCompletedRakets} />
      </main>
    </div>
  );
};

export default ViewProfile;
