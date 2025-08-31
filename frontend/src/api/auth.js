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

    try {
        const response = await fetch (`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            throw new Error("Server returned non-JSON response");
        }

        if (!response.ok) {
            throw new Error(data.message || "Registration failed.");
        }

        return data;
    } catch (err) {
        throw err;
    }
}

export async function verifyEmail(email, code) {
    const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Verification failed. Please try again.');
    }
    return data;
}

export async function resendVerificationCode(email) {
    const response = await fetch(`${API_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to resend code.');
    }
    return data;
}