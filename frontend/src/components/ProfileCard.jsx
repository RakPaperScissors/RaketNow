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
      <div className="bg-white shadow-sm hover:shadow-md transition rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto my-8">
        {message && (
          <p className="text-center mb-4 text-sm text-gray-600 italic">{message}</p>
        )}

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-shrink-0">
              <img
                src={
                  selectedImageFile
                    ? URL.createObjectURL(selectedImageFile)
                    : user.profilePicture || "/default_profile.jpg"
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default_profile.jpg";
                }}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-orange-300 shadow-sm"
              />
              {isEditing && (
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
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
              <h2 className="text-xl sm:text-2xl font-bold text-[#0c2c57]">
                {`${user.firstName} ${user.lastName}`}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
                <span className="bg-orange-100 text-orange-600 px-3 py-0.5 rounded-full font-medium capitalize">
                  {user.type === "Users" ? "Client" : user.type}
                </span>
                <span>• Joined {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-600 mt-1 text-sm">
                <Mail className="w-4 h-4 mr-1.5" />
                <span className="break-all">{user.email}</span>
              </div>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={toggleEditMode}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>

        {/* BIO */}
        {isRaketista && (
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-lg font-semibold mb-3 text-orange-500 flex items-center gap-2">
              <User className="w-5 h-5" /> Bio
            </h3>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm 
                   outline-none transition shadow-xs"
                placeholder="Tell us about your services..."
              />
            ) : (
              <p className="text-gray-700 text-base whitespace-pre-wrap">
                {bio || "No bio has been added yet."}
              </p>
            )}
          </div>
        )}


        {/* SKILLS */}
        {isRaketista && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-orange-500 flex items-center gap-2">
              <Hammer className="w-5 h-5" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsLoading ? (
                <LoadingSpinner size={24} />
              ) : currentSkills && currentSkills.length > 0 ? (
                currentSkills.map((raketistaSkill) => (
                  <span
                    key={raketistaSkill.id}
                    className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
                  >
                    {raketistaSkill.skill.skillName}
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteSkill(raketistaSkill.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No skills have been added yet.</p>
              )}
            </div>

            {isEditing && (
              <div className="mt-4 flex flex-col sm:flex-row gap-3 border-t pt-4">
                <select
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-lg bg-white text-sm 
                 outline-none shadow-xs"
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
                  className="px-4 py-2 bg-[#FF7C2C] text-white font-normal text-sm rounded-lg 
           hover:bg-[#e85e00]"

                >
                  Add Skill
                </button>
              </div>
            )}

          </div>
        )}

        {/* ACTION BUTTONS */}
        {isEditing && (
          <div className="mt-8 pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={toggleEditMode}
              className="px-5 py-2 bg-gray-400 text-white font-normal text-sm rounded-lg 
              hover:bg-gray-500 disabled:opacity-50 transition"
               >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={authLoading}
              className="px-5 py-2 bg-[#0c2c57] text-white font-normal rounded-lg 
              hover:bg-[#091f40] disabled:opacity-50 text-sm transition"
            >
              {authLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white shadow-sm hover:shadow-md transition rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto my-8">
        <h2 className="text-lg font-semibold text-[#0c2c57] mb-4">Your Recent Activity</h2>
        <div
          className={`divide-y divide-gray-200 ${myRakets.length > 5 ? "max-h-80 overflow-y-auto pr-2" : ""
            }`}
        >
          {myRakets.length > 0 ? (
            myRakets.map((raket, index) => (
            <div key={index} className="flex items-center space-x-3 py-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#ff7c2b] rounded-full flex items-center justify-center shadow-sm">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{raket.title}</p>
                <p className="text-xs text-gray-500">
                  Posted{" "}
                  {formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
          ) : (
            <div className="text-center text-gray-500 text-sm py-6 italic">
              No posted activities yet. 🌱
            </div>
          )}
          
        </div>
      </div>

      {/* COMPLETED JOBS */}
      {isRaketista && (
        <div className="bg-white shadow-sm hover:shadow-md transition rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto my-8">
          <h2 className="text-lg font-semibold text-[#0c2c57] mb-4">Finished Jobs</h2>
          {myCompletedRakets.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {myCompletedRakets.map((job, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 flex flex-col shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-base text-[#0c2c57]">{job.title}</h3>
                      <p className="text-sm text-gray-500">
                        Client: {job.client.firstName} {job.client.lastName}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-0.5 rounded-full">
                      Completed
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Completed:{" "}
                      {new Date(job.completedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-yellow-500 font-medium">
                      <Star className="w-4 h-4 mr-1 fill-yellow-500" />
                      {job.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm py-6 italic">
              Ready to take on your first <span className="text-[#ff7c2b]">raket?</span> 🚀
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
