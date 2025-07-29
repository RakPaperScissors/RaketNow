// For getting the name
export async function getMe() {
    const response = await fetch('http://localhost:3000/auth/me', { 
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return await response.json();
}

// For getting the rakets
export async function getRakets() {
    const response = await fetch('http://localhost:3000/rakets', {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch rakets.");
    }
    return await response.json();
}

// For getting the raketistas
export async function getRaketistas() {
    const response = await fetch('http://localhost:3000/user?role=raketista', {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch raketistas.");
    }
    return await response.json();
}

// For posting a new raket
export async function postRaket(data) {
    const response = await fetch('http://localhost:3000/rakets', {
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