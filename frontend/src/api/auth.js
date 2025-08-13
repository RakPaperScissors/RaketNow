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
    if (payload.role !== "organization") {
        delete payload.orgName;
    }

    const response = await fetch (`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
    }
    return data;
}