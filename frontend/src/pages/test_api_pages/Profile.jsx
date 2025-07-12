import { format } from "date-fns";
import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false);
    const [bio, setBio] = useState("");

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
                                <li key={index}>{rs.skill.skillName} <span style={{ color: "#888" }}>({rs.skill.category})</span></li>
                            ))}
                        </ul>
                    ) : ( 
                        <p>No skills assigned yet.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Profile;