import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

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
        .then(response => {
            if (!response.ok) {
                throw new Error("Unauthorized");
            }
            return response.json();
        })
        .then(data => setUser(data))
        .catch(() => setMessage("Faild to fetch profile."));
    }, []);

    if (message) return <div>{message}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>Hi, <strong>{user.name}</strong>!</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    )
}

export default Profile;