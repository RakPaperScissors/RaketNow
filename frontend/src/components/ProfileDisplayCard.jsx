import React, { useEffect, useState } from "react";
import { Mail, User, Hammer } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner"; 
import { getPublicUserProfile } from "../api/users";
import { useParams } from 'react-router-dom';

const DEFAULT_AVATAR = "/default_profile.jpg";

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

function ProfileDisplayCard() {
  const { userId: routeUserId } = useParams();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const displayUid = Number(routeUserId);

    if (isNaN(displayUid) || !displayUid) {
      setLoading(false);
      setError("Invalid User ID provided in URL."); 
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPublicUserProfile(displayUid);
        setProfileUser(data);
      } catch (err) {
        setError(err.message || "Failed to fetch user profile.");
        console.error("Error fetching public profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [routeUserId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  if (!profileUser) return <div className="text-center p-6">Profile not found.</div>;

  const isRaketista = profileUser.type === "Raketista"; 

  const fullProfilePictureUrl = `${process.env.PICTURE_URL}/raketnow/${profileUser.profilePicture}` || `${process.env.PICTURE_URL}/raketnow/default_profile.jpg`;
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto my-10 border">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={fullProfilePictureUrl}
            onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-orange-300"
          />
          <div>
            <h2 className="text-xl font-bold">{`${profileUser.firstName} ${profileUser.lastName}`}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium capitalize">{profileUser.type}</span>
              <span>• Joined {formatDate(profileUser.createdAt)}</span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
              <Mail className="w-4 h-4 mr-1.5" />
              <span>{profileUser.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BIO SECTION */}
      {isRaketista && profileUser.bio && (
        <div className="border-t mt-6 pt-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2"><User className="w-5 h-5" /> Bio</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{profileUser.bio}</p>
        </div>
      )}

      {/* SKILLS SECTION */}
      {isRaketista && profileUser.raketistaSkills && profileUser.raketistaSkills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2"><Hammer className="w-5 h-5" /> Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profileUser.raketistaSkills.map((rs) => (
              <span key={rs.id} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                {rs.skill.skillName}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDisplayCard;