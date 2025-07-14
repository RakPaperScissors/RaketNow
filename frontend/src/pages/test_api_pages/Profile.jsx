import { format } from "date-fns";
import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [allSkills, setAllSkills] = useState([]);
    const [selectedSkillId, setSelectedSkillId] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if(!accessToken) {
            setMessage("You are not logged in.");
            return;
        }
        fetch('http://localhost:3000/auth/me', {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            setBio(data.bio || "");
        })
        .catch(() => setMessage("Failed to fetch profile."));

        // Fetch all skills
        fetch('http://localhost:3000/skills')
            .then(response => response.json())
            .then(data => setAllSkills(data))
            .catch(() => setMessage("Failed to load skills."));
    }, []);

    const handleBioSave = async () => {
        const accessToken = localStorage.getItem("access_token");
        setMessage("");
        try {
            const response = await fetch(`http://localhost:3000/raketista/${user.uid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ bio }),
            });
            if (response.ok) {
                setMessage("Bio updated!");
                setEditing(false);
                setUser({ ...user, bio });
            } else {
                const data = await response.json();
                setMessage(data.message || "Failed to update bio.");
            }
        } catch {
            setMessage("An error occurred while updating bio.");
        }
    }

    const handleAddSkill = async () => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await fetch('http://localhost:3000/raketista-skill', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    raketistaId: user.uid,
                    skillId: parseInt(selectedSkillId),
                }),
            });
            if (response.ok) {
                const addedSkill = allSkills.find(skill => skill.skill_Id === parseInt(selectedSkillId));
                setUser(prev => ({
                    ...prev,
                    skills: [...(prev.skills || []), addedSkill],
                }));
                setSelectedSkillId("");
            } else {
                setMessage("Failed to add skill.");
            }
        } catch {
            setMessage("Error adding skill. Please try again.");
        }
    };

    const handleDeleteSkill = async (raketistaSkillId) => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await fetch(`http://localhost:3000/raketista-skill/${raketistaSkillId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            });
            if (response.ok) {
                setUser(prev => ({
                    ...prev,
                    raketistaSkills: prev.raketistaSkills.filter(skill => skill.id !== raketistaSkillId)
                }));
            } else {
                setMessage("Failed to delete skill.");
            }
        } catch {
            setMessage("Error deleting skill.");
        }
    };


    if (message) return <div>{message}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: 500, margin: "40px auto", border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
            <h2>Hi, <strong>{user.name}</strong>!</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {user.role === "organization" && user.organizationName && (
                <p><strong>Organization Name:</strong> {user.organizationName}</p>
            )}
            <p>Joined {user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : ""}</p>
            <p><strong>Last Active:</strong> {user.lastActive ? new Date(user.lastActive).toLocaleString() : "N/A"}</p>
            {user.profilePicture && (
                <div>
                    <img src={user.profilePicture} alt="Profile" style={{ width: 100, borderRadius: "50%" }} />
                </div>
            )}
            <div style={{ marginTop: 16 }}>
                <strong>Bio:</strong>
                {user.role === "raketista" ? (
                    editing ? (
                        <div>
                            <textarea 
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                rows={4}
                                style={{ width: "100%", marginTop: 8 }}
                            />
                            <div style={{ marginTop: 8 }}>
                                <button onClick={handleBioSave} style={{ marginRight: 8 }}>Save</button>
                                <button onClick={() => { setEditing(false); setBio(user.bio || ""); }}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p style={{ whiteSpace: "pre-line" }}>{user.bio || "No bio yet."}</p>
                            <button onClick={() => setEditing(true)}>Edit Bio</button>
                        </div>
                    )
                ) : (
                    <p style={{ whiteSpace: "pre-line"}}>{user.bio || "No bio."}</p>
                )}
            </div>
            {user.role === "raketista" && (    
                <div style={{ marginTop: 16 }}>
                    <strong>Skills:</strong>
                    {user.raketistaSkills?.length > 0 ? (
                        <ul style={{ marginTop: 8 }}>
                            {user.raketistaSkills.map((rs, index) => (
                                <li key={index}>
                                    {rs.skill.skillName} <span style={{ color: "#888" }}>({rs.skill.category})</span>
                                    <button style={{ marginLeft: 8, backgroundColor: "red" }} onClick={() => handleDeleteSkill(rs.id)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : ( 
                        <p>No skills assigned yet.</p>
                    )}

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
                </div>
            )}
        </div>
    )
}

export default Profile;