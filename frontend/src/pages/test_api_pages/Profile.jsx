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
        handleBioSave,
        handleAddSkill,
        handleDeleteSkill,
    } = useProfile();


    if (message) return <div>{message}</div>;
    if (!user) return <div>Loading profile...</div>;

    return (
        <div style={{ maxWidth: 500, margin: "40px auto", border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
            {message && <p style={{ color: "red" }}>{message}</p>}
            <h2>Hi, <strong>{user.firstName}</strong>!</h2>
            <p><strong>Name:</strong> {user.firstName + " " + user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>

            {user.role === "organization" && user.orgName && (
                <p><strong>Organization Name:</strong> {user.orgName}</p>
            )}

            <p>Joined {user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : ""}</p>
            <p><strong>Last Active:</strong> {user.lastActive ? new Date(user.lastActive).toLocaleString() : "N/A"}</p>

            <img
                src={user?.profilePicture ? user.profilePicture : "http://localhost:9000/raketnow/user-profile-pictures/default_profile.jpg"}
                alt="Profile"
                className="w-16 h-16 rounded-full"
                onError={(e) => {
                    e.target.src = 'http://localhost:9000/raketnow/user-profile-pictures/default_profile.jpg';
                }}
            />

            {/* BIO SECTION */}
            <div style={{ marginTop: 16 }}>
                <strong>Bio:</strong>
                {user.role === "raketista" ? (
                    isEditingProfile ? (
                        <div>
                            <textarea 
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                rows={4}
                                style={{ width: "100%", marginTop: 8 }}
                            />
                            {/* <div style={{ marginTop: 8 }}>
                                <button onClick={handleBioSave} style={{ marginRight: 8 }}>Save</button>
                                <button onClick={() => { setIsEditingProfile(false); setBio(user.bio || ""); }}>Cancel</button>
                            </div> */}
                        </div>
                    ) : (
                        <div>
                            <p style={{ whiteSpace: "pre-line" }}>{user.bio || "No bio yet."}</p>
                            {/* <button onClick={() => setIsEditingProfile(true)}>Edit Bio</button> */}
                        </div>
                    )
                ) : (
                    <p style={{ whiteSpace: "pre-line"}}>{user.bio || "No bio."}</p>
                )}
            </div>

            {/* RAKETISTA SKILLS */}
            {user.role === "raketista" && (    
                <div style={{ marginTop: 16 }}>
                    <strong>Skills:</strong>
                    {user.raketistaSkills?.length > 0 ? (
                        <ul style={{ marginTop: 8 }}>
                            {user.raketistaSkills.map((rs, index) => (
                                <li key={index}>
                                    {rs.skill.skillName} <span style={{ color: "#888" }}>({rs.skill.category})</span>
                                    {/* <button style={{ marginLeft: 8, backgroundColor: "red" }} onClick={() => handleDeleteSkill(rs.id)}>
                                        Remove
                                    </button> */}
                                    {isEditingProfile && (
                                        <button style={{ marginLeft: 8, backgroundColor: "red", color: "white" }}
                                        onClick={() => handleDeleteSkill(rs.id)}>
                                            Remove
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : ( 
                        <p>No skills assigned yet.</p>
                    )}

                    {isEditingProfile && (
                        <div style={{ marginTop: 16 }}>
                            <select
                                value={selectedSkillId}
                                onChange={(e) => setSelectedSkillId(e.target.value)}
                                style={{ width: "100%"}}
                            >
                                <option value="">-- Select Skill to Add --</option>
                                {allSkills.map(skill => (
                                    <option key={skill.skill_Id} value={skill.skill_Id}>
                                        {skill.skillName} ({skill.category})
                                    </option>
                                ))}
                            </select>
                            <button disabled={!selectedSkillId} onClick={handleAddSkill} style={{ marginLeft: 8, backgroundColor: "green"}}>
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* EDIT / SAVE / CANCEL BUTTONS */}
            <div style={{ marginTop: 24 }}>
                {isEditingProfile ? (
                    <>
                        <button onClick={handleBioSave} style={{ marginRight: 8, backgroundColor: "blue" }}>
                            Save Changes
                        </button>
                        <button onClick={() => {setIsEditingProfile(false); setBio(user.bio || ""); setSelectedSkillId("");}} style={{ backgroundColor: "gray"}}>
                            Cancel
                        </button>
                    </>
                ) : (
                        <button onClick={() => setIsEditingProfile(true)} style={{ backgroundColor: "yellow" }}>Edit Profile</button>
                )}
            </div>
        </div>
    );
}

export default Profile;