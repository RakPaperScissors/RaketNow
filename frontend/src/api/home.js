const API_URL = import.meta.env.VITE_API_URL;

// For getting the name
export async function getMe() {
    const response = await fetch(`${API_URL}/auth/me`, { 
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return await response.json();
}

// For getting the rakets
export async function getRakets() {
    const response = await fetch(`${API_URL}/rakets`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch rakets.");
    }
    return await response.json();
}

// For getting the raketistas
export async function getRaketistas() {
    const response = await fetch(`${API_URL}/user?role=raketista`, {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch raketistas.");
    }
    return await response.json();
}

// For posting a new raket
export async function postRaket(data) {
    const response = await fetch(`${API_URL}/rakets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || "Failed to create raket.");
    }
    return responseData;
}