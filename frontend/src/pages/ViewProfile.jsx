import React, { useState } from "react";
import { Mail, User, Hammer, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, skills, userRakets, userCompletedRakets, loading, error } =
    useViewProfile(userId);

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-500">User not found.</p>;

  const isRaketista = user.type === "Raketista";

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <div
        className={`${collapsed ? "w-20" : ""
          } h-screen fixed top-0 left-0 z-50 transition-all duration-200`}
      >
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 relative min-h-screen bg-[#F9FAFB] overflow-y-auto transition-all duration-200 ${collapsed ? "md:ml-20" : "md:ml-64"
          }`}
      >
        <div className="px-4 sm:px-6 py-6 sm:py-10 mt-6 md:mt-0">
          {/* Back Button + Profile Title */}
          <div className="flex items-center gap-2 mt-4 sm:mt-6 mb-6 sm:mb-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#0c2c57] hover:text-[#ff7c2b] transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-[#0c2c57]">
              {user.firstName}'s Profile
            </h1>
          </div>


          {/* Profile Card */}
          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-4xl mx-auto mb-6 sm:mb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-shrink-0">
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
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-orange-300"
                  />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl text-[#0c2c57] font-bold">
                    {`${user.firstName} ${user.lastName}`}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 mt-1">
                    <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium capitalize">
                      {user.type === "Users" ? "Client" : user.type}
                    </span>
                    <span>• Joined {formatDate(user.createdAt)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1 text-xs sm:text-sm">
                    <Mail className="w-4 h-4 mr-1.5" />
                    <span className="break-all">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {isRaketista && (
              <div className="border-t border-gray-300 mt-4 sm:mt-6 pt-4">
                <h3 className="text-md sm:text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
                  <User className="w-5 h-5" /> Bio
                </h3>
                <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap">
                  {user.bio || "No bio has been added yet."}
                </p>
              </div>
            )}

            {/* Skills */}
            {isRaketista && (
              <div className="mt-4 sm:mt-6">
                <h3 className="text-md sm:text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
                  <Hammer className="w-5 h-5" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <span
                        key={skill.skill.skill_Id}
                        className="bg-gray-100 text-gray-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1.5 sm:gap-2"
                      >
                        {skill.skill.skillName}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs sm:text-sm">
                      User has no skills yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <RecentActivity rakets={userRakets} />

          {/* Finished Jobs */}
          <FinishedJobs jobs={userCompletedRakets} />
        </div>
      </main>
    </div>
  );
};

export default ViewProfile;
