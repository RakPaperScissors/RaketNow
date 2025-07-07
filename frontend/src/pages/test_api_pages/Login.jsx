import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const result = await fetch('http://localhost:3000/auth/login', 
                { method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ email, password }), 
            });
            const data = await result.json();
            if (result.ok && data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                setMessage("Login successful.");
                window.location.href = "/profile";
            } else {
                setMessage(data.message || "Login failed.");
            }
        } catch (error) {
            setMessage("An error has occured. Please try again.");
        }
    }  


    return (
        <div style={{ maxWidth: 400, margin: '40px auto', border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Email:</label>
                    <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: "100%", padding: 8, marginTop: 4, border: "1px solid black" }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Password:</label>
                    <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: "8", marginTop: "4", border: "1px solid black" }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: 10, background: "#0C2C57", color: "#fff", border: "none", borderRadius: 4 }}>
                    Login
                </button>
            </form>
            {message}
        </div>
    );
}

export default Login;