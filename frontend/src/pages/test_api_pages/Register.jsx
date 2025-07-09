import React, { useState } from "react";

function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        role: "client",
        organizationName: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const payload = { ...form };
        if(form.role !== "organization") {
            delete payload.organizationName;
        }
        try {
            const res = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Registration successful! You can now log in.");
            } else {
                setMessage(data.message || "Registration failed.");
            }
        } catch {
            setMessage("An error occured. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto", border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Name:</label>
                    <input 
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Email:</label>
                    <input 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Password:</label>
                    <input 
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Role:</label>
                    <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8, marginTop: 4 }}
                    >
                        <option value="client">Client</option>
                        <option value="raketista">Raketista</option>
                        <option value="organization">Organization</option>
                    </select>
                </div>
                {form.role === "organization" && (
                    <div style={{ marginBottom: 12 }}>
                        <label>Organization Name:</label>
                        <input
                        name="organizationName"
                        value={form.organizationName}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                        />
                    </div>
                )}
                <button type="submit" style={{ width: "100%", padding: 10, background: "#0C2C57", color: "#fff", border: "none", borderRadius: 4 }}>
                    Register
                </button>
            </form>
            {message && <div style={{ marginTop: 16, color: message.includes("success") ? "green" : "red "}}>{message}</div>}
        </div>
    );
}

export default Register;