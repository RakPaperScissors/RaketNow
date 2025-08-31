import { format } from "date-fns";
import { useProfile } from "../../hooks/useProfile";

function Profile() {
    const {
        user,
        bio,
        isEditingProfile,
        message,
        allSkills,
        selectedSkillId,
        setSelectedSkillId,
        setIsEditingProfile,
        setBio,
        handleSaveAllChanges,
        handleAddSkill,
        handleDeleteSkill,
        selectedImageFile,
        setSelectedImageFile,
        currentRaketistaSkills,
    } = useProfile();


    if (message && !user) return <div>{message}</div>;
    if (!user) return <div>Loading profile...</div>;

    const isRaketista = user.role === "raketista";

    return (
        <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            {message && <p className="text-red-500 text-center mb-4">{message}</p>}

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Hello, <strong className="text-indigo-600">{user.firstName}</strong>!
            </h2>

            {/* BASIC INFORMATION SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <p className="text-gray-700"><strong>Name:</strong> {user.firstName + " " + user.lastName}</p>
                <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700"><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>

                {user.role === "organization" && user.orgName && (
                    <p className="text-gray-700"><strong>Organization Name:</strong> {user.orgName}</p>
                )}

                <p className="text-gray-700">Joined {user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : ""}</p>
                <p className="text-gray-700"><strong>Last Active:</strong> {user.lastActive ? new Date(user.lastActive).toLocaleString() : "N/A"}</p>
            </div>
            

            {/* PROFILE PICTURE SECTION */}
            <div className="mb-6 flex flex-col items-center">
                <img  
                    src={
                        selectedImageFile
                            ? URL.createObjectURL(selectedImageFile)
                            : user?.profilePicture || `${process.env.PICTURE_URL}/raketnow/user-profile-pictures/default_profile.jpg`
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-300 shadow-md mb-4"
                    onError={(e) => {
                        e.target.src = `${process.env.PICTURE_URL}/raketnow/user-profile-pictures/default_profile.jpg`;
                    }}
                />
                {/* Profile picture input visible only when editing */}
                {isEditingProfile && (
                    <input  
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImageFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                )}
            </div>

            {/* BIO SECTION */}
            {isRaketista && (
                <div className="mb-6">
                    <strong className="block text-gray-700 text-lg mb-2">Bio:</strong>
                    {isEditingProfile ? (
                        <div>
                            <textarea  
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    ) : (
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{user.bio || "No bio yet."}</p>
                    )}
                </div>
            )}

            {/* RAKETISTA SKILLS SECTION */}
            {isRaketista && (
                <div className="mb-6">
                    <strong className="block text-gray-700 text-lg mb-2">Skills:</strong>
                    {currentRaketistaSkills?.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            {currentRaketistaSkills.map((rs) => (
                                <li key={rs.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                    <span className="text-gray-800">{rs.skill.skillName} <span className="text-gray-500 text-sm">({rs.skill.category})</span></span>
                                {isEditingProfile && (
                                    <button
                                        onClick={() => handleDeleteSkill(rs.id, rs.skill.skill_Id)}
                                        className="ml-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition duration-200"
                                    >
                                        Remove
                                    </button>
                                )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No skills assigned yet.</p>
                    )}

                    {isEditingProfile && (
                        <div className="mt-4 flex gap-2">
                            <select
                                value={selectedSkillId}
                                onChange={(e) => setSelectedSkillId(e.target.value)}
                                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-100"
                            >
                                <option value="">-- Select Skill to Add --</option>
                                {allSkills.map(skill => (
                                    <option key={skill.skill_Id} value={skill.skill_Id}>
                                        {skill.skillName} ({skill.category})
                                    </option>
                                ))}
                            </select>
                            <button
                                disabled={!selectedSkillId}
                                onClick={handleAddSkill}
                                className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* EDIT / SAVE / CANCEL BUTTONS */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end gap-3">
                {isEditingProfile ? (
                    <>
                        <button
                            onClick={handleSaveAllChanges}
                            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => {
                                setIsEditingProfile(false);
                            }}
                            className="px-5 py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition duration-200"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditingProfile(true)}
                        className="px-5 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;