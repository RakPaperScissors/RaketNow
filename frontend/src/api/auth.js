// For Login Functionality
export async function login(email, password) {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        delete payload.organizationName;
    }

    const response = await fetch ('http://localhost:3000/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
    }
    return data;
}