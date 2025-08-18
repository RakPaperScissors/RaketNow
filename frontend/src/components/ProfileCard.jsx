import React, { useState } from "react";
import { Mail, User, Hammer, Pencil, X, Briefcase, Calendar, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";

// A simple utility to format dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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

  // Local state for the dropdown, managed by the component itself
  const [selectedSkillId, setSelectedSkillId] = useState("");
  
  const isPageLoading = authLoading || skillsLoading;
  if (isPageLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!user) return <div className="text-center p-10">No user data found. Please log in.</div>;

  const isRaketista = user.type === "Raketista";

  // Filter out skills that are already in the user's list for the dropdown
  const availableSkills = allSkills.filter(
    skill => !currentSkills.some(rs => rs.skill.skill_Id === skill.skill_Id)
  );

  return (
    <div>
      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
        {message && <p className="text-center mb-4 text-sm text-gray-600">{message}</p>}

        {/* HEADER SECTION */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={selectedImageFile ? URL.createObjectURL(selectedImageFile) : (user.profilePicture || "https://randomuser.me/api/portraits/lego/6.jpg")}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default_profile.jpg"
                }}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-orange-300"
              />
              {isEditing && (
                <label htmlFor="profile-pic-upload" className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                  <Pencil className="w-4 h-4 text-gray-600" />
                  <input id="profile-pic-upload" type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedImageFile(e.target.files[0])} />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium capitalize">{user.type === "Users" ? "Client" : user.type}</span>
                <span>• Joined {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Mail className="w-4 h-4 mr-1.5" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          {!isEditing && (
            <button onClick={toggleEditMode} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>

        {/* BIO SECTION */}
        {isRaketista && (
          <div className="border-t mt-6 pt-4">
            <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2"><User className="w-5 h-5" /> Bio</h3>
            {isEditing ? (
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} className="w-full p-2 border rounded-md" placeholder="Tell us about your services..." />
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap">{bio || "No bio has been added yet."}</p>
            )}
          </div>
        )}

        {/* SKILLS SECTION */}
        {isRaketista && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2"><Hammer className="w-5 h-5" /> Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skillsLoading ? (
                <div className="flex justify-center items-center w-full">
                  <LoadingSpinner size={30}/>
                </div>
              ) : currentSkills && currentSkills.length > 0 ? (
                currentSkills.map((raketistaSkill) => (
                  <span key={raketistaSkill.id} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-2">
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
                <p className="text-gray-500 text-sm">No skills have been added yet.</p>
              )}
            </div>
            {isEditing && (
              <div className="mt-4 flex gap-2 border-t pt-4">
                <select value={selectedSkillId} onChange={(e) => setSelectedSkillId(e.target.value)} className="flex-grow p-2 border rounded-md bg-white">
                  <option value="">-- Select a skill to add --</option>
                  {availableSkills.map(skill => (
                    <option key={skill.skill_Id} value={skill.skill_Id}>{skill.skillName} ({skill.category})</option>
                  ))}
                </select>
                <button onClick={() => { handleAddSkill(selectedSkillId); setSelectedSkillId(""); }} disabled={!selectedSkillId} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 disabled:opacity-50">
                  Add Skill
                </button>
              </div>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        {isEditing && (
          <div className="mt-8 pt-4 border-t flex justify-end gap-3">
            <button onClick={toggleEditMode} className="px-5 py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500">Cancel</button>
            <button onClick={handleSaveChanges} disabled={authLoading} className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50">
              {authLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}  
      </div>

      {/* Posted Rakets / Recent Activity */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
            <h2 className="text-lg font-semibold mb-4">Your Recent activity</h2>
            <div className="divide-y divide-gray-200">
              {myRakets.map((raket, index) => (
                  <div key={index} className="flex items-center space-x-3 py-4"> 
                      <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Briefcase />
                      </div>
                      <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{raket.title}</p>
                          <p className="text-xs text-gray-500">
                              Posted {formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true })}
                          </p>
                      </div>
                  </div>
                ))}
            </div>
        </div>

        {/* Completed Jobs/Rakets Section */}
        {isRaketista && (
          <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
          {/* Header */}
          <div>
              <h2 className="text-lg font-semibold mb-4">Finished Jobs</h2>
              <button className="text-sm text-orange-500 hover:underline">
                  View All
              </button>
          </div>
          {/* Jobs List */}
          <div className="space-y-4">
              {myCompletedRakets.map((job, index) => (
                <div key={index} className="border rounded-lg p-4 flex flex-col space-y-2 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                      <div>
                          <h3 className="font-semibold text-gray-800">{job.title}</h3>
                          <p className="text-sm text-gray-500">Client: {job.client.firstName} {job.client.lastName}</p>
                      </div>
                      <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                          Completed
                      </span>
                  </div>

                  <p className="text-sm text-gray-600">{job.description}</p>

                  <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className='w-4 h-4 mr-1' />
                          Completed: {new Date(job.completedAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric"
                          })}
                      </div>
                      <div className="flex items-center text-yellow-500 text-sm font-medium">
                          <Star className="w-4 h-4 mr-1 fill-yellow-500" />
                          {job.rating.toFixed(1)}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default ProfileCard;