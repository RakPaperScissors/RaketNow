// For getting the name
export async function getMe(accessToken) {
    const response = await fetch('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return await response.json();
}

// For getting the rakets
export async function getRakets(accessToken) {
    const response = await fetch('http://localhost:3000/rakets', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch rakets.");
    }
    return await response.json();
}

// For getting the raketistas
export async function getRaketistas(accessToken) {
    const response = await fetch('http://localhost:3000/user?role=raketista', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch raketistas.");
    }
    return await response.json();
}

// For posting a new raket
export async function postRaket(data, accessToken) {
    const response = await fetch('http://localhost:3000/rakets', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || "Failed to create raket.");
    }
    return responseData;
}