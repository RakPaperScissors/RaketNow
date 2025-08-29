import React, { useState } from "react";
import {
  Mail,
  User,
  Hammer,
  Pencil,
  X,
  Briefcase,
  Calendar,
  Star,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

function ProfileCard() {
  const {
    myRakets,
    myCompletedRakets,
    skillsLoading,
    message,
    isEditing,
    bio,
    setBio,
    allSkills,
    currentSkills,
    selectedImageFile,
    setSelectedImageFile,
    toggleEditMode,
    handleAddSkill,
    handleDeleteSkill,
    handleSaveChanges,
  } = useProfile();

  const { user, loading: authLoading, error } = useAuth();
  const [selectedSkillId, setSelectedSkillId] = useState("");

  const isPageLoading = authLoading || skillsLoading;
  if (isPageLoading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center p-6 sm:p-10 text-red-500">Error: {error}</div>;
  if (!user)
    return (
      <div className="text-center p-6 sm:p-10 text-gray-500">
        No user data found. Please log in.
      </div>
    );

  const isRaketista = user.type === "Raketista";

  const availableSkills = allSkills.filter(
    (skill) => !currentSkills.some((rs) => rs.skill.skill_Id === skill.skill_Id)
  );

  return (
    <div className="px-4 sm:px-6">
      {/* PROFILE CARD */}
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-4xl mx-auto my-6 sm:my-10">
        {message && (
          <p className="text-center mb-4 text-xs sm:text-sm text-gray-600">{message}</p>
        )}

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-shrink-0">
              <img
                src={
                  selectedImageFile
                    ? URL.createObjectURL(selectedImageFile)
                    : user.profilePicture ||
                      "https://randomuser.me/api/portraits/lego/6.jpg"
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default_profile.jpg";
                }}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-orange-300"
              />
              {isEditing && (
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
                >
                  <Pencil className="w-4 h-4 text-gray-600" />
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setSelectedImageFile(e.target.files[0])}
                  />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#0c2c57]">
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

          {!isEditing && (
            <button
              onClick={toggleEditMode}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
            >
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>

        {/* BIO */}
        {isRaketista && (
          <div className="border-t border-gray-300 mt-4 sm:mt-6 pt-4">
            <h3 className="text-md sm:text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
              <User className="w-5 h-5" /> Bio
            </h3>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="Tell us about your services..."
              />
            ) : (
              <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap">
                {bio || "No bio has been added yet."}
              </p>
            )}
          </div>
        )}

        {/* SKILLS */}
        {isRaketista && (
          <div className="mt-4 sm:mt-6">
            <h3 className="text-md sm:text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
              <Hammer className="w-5 h-5" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsLoading ? (
                <div className="flex justify-center items-center w-full">
                  <LoadingSpinner size={24} />
                </div>
              ) : currentSkills && currentSkills.length > 0 ? (
                currentSkills.map((raketistaSkill) => (
                  <span
                    key={raketistaSkill.id}
                    className="bg-gray-100 text-gray-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1.5 sm:gap-2"
                  >
                    {raketistaSkill.skill.skillName}
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteSkill(raketistaSkill.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm">
                  No skills have been added yet.
                </p>
              )}
            </div>

            {isEditing && (
              <div className="mt-4 flex flex-col sm:flex-row gap-2 border-t pt-4">
                <select
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  className="flex-grow p-2 border rounded-md bg-white text-sm"
                >
                  <option value="">-- Select a skill to add --</option>
                  {availableSkills.map((skill) => (
                    <option key={skill.skill_Id} value={skill.skill_Id}>
                      {skill.skillName} ({skill.category})
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    handleAddSkill(selectedSkillId);
                    setSelectedSkillId("");
                  }}
                  disabled={!selectedSkillId}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white font-semibold text-sm rounded-md hover:bg-gray-700 disabled:opacity-50"
                >
                  Add Skill
                </button>
              </div>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        {isEditing && (
          <div className="mt-6 sm:mt-8 pt-4 border-t flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={toggleEditMode}
              className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={authLoading}
              className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              {authLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-4xl mx-auto my-6 sm:my-10">
        <h2 className="text-md sm:text-lg text-[#0c2c57] font-semibold mb-4">
          Your Recent Activity
        </h2>
        <div
          className={`divide-y divide-gray-200 ${
            myRakets.length > 5 ? "max-h-80 overflow-y-auto pr-2" : ""
          }`}
        >
          {myRakets.map((raket, index) => (
            <div key={index} className="flex items-center space-x-3 py-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#ff7c2b] rounded-full flex items-center justify-center">
                <Briefcase className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-800">
                  {raket.title}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500">
                  Posted{" "}
                  {formatDistanceToNow(new Date(raket.dateCreated), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPLETED JOBS */}
      {isRaketista && (
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 max-w-4xl mx-auto my-6 sm:my-10">
          <div className="mb-4">
            <h2 className="text-md sm:text-lg text-[#0c2c57] font-semibold">
              Finished Jobs
            </h2>
          </div>
          {myCompletedRakets.length > 0 ? (
            <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto pr-2">
              {myCompletedRakets.map((job, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-[#0c2c57]">
                        {job.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Client: {job.client.firstName} {job.client.lastName}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-600 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-full">
                      Completed
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                    {job.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm gap-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Completed:{" "}
                      {new Date(job.completedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-yellow-500 font-medium">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-yellow-500" />
                      {job.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-xs sm:text-sm py-6 italic">
              Ready to take on your first{" "}
              <span className="text-[#ff7c2b]">raket?</span> 🚀
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
