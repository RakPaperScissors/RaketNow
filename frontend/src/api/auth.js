const API_URL = import.meta.env.VITE_API_URL;

// For Login Functionality
export async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    return data;
}

// For Sign Up Functionality
export async function signUp(formData) {
    const payload = { ...formData };

    delete payload.confirmPassword;

    console.log("📋 Original formData:", formData);
    console.log("📦 Final payload being sent:", payload);

    try {
        const response = await fetch (`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        console.log("📥 Response status:", response.status);
        console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()));

        const text = await response.text();
        console.log("📥 Raw response text:", text);

        let data;
        try {
            data = JSON.parse(text);
            console.log("✅ Parsed JSON:", data);
        } catch (err) {
            console.error("❌ Failed to parse JSON:", err);
            throw new Error("Server returned non-JSON response");
        }

        if (!response.ok) {
            console.error("❌ Registration failed:", data);
            throw new Error(data.message || "Registration failed.");
        }

        console.log("✅ Registration successful:", data);
        return data;
    } catch (err) {
        console.error("🔥 Network or unexpected error during signup:", err);
        throw err;
    }
}