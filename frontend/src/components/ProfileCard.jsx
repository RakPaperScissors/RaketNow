import React from "react";
import { format } from "date-fns";
import { Mail, User, Hammer, Pencil } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

function ProfileCard() {

  const { user, bio, isEditingProfile, message, allSkills, selectedSkillId, setSelectedSkillId, setIsEditingProfile, setBio, handleSaveAllChanges, handleAddSkill, handleDeleteSkill, selectedImageFile, setSelectedImageFile, currentRaketistaSkills } = useProfile();

  if (!user) return <div>Loading profile...</div>
  
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={
              selectedImageFile
                ? URL.createObjectURL(selectedImageFile)
                : user?.profilePicture || "http://localhost:9000/raketnow/user-profile-pictures/default_profile.jpg"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
            onError={(e) => {
                e.target.src = 'http://localhost:9000/raketnow/user-profile-pictures/default_profile.jpg';
            }}
          />
          <div>
            <h2 className="text-xl font-bold">{user?.firstName + " " + user?.lastName}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span>• Joined {user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : ""}</span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
              <Mail className="w-4 h-4 mr-1" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <div className="border-t border-gray-300 mt-6 pt-4">
        <h3 className="text-lg font-semibold mb-1 text-orange-500 flex items-center gap-2">
          <User className="w-5 h-5" />
          Bio
        </h3>
        <p className="text-gray-700">
          {user.bio}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
          <Hammer className="w-5 h-5" />
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {currentRaketistaSkills.map((rs) => (
            <span
              key={rs.id}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {rs.skill.skillName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
