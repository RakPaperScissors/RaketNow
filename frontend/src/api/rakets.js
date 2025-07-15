export async function fetchRakets() {
    const response = await fetch('http://localhost:3000/rakets');
    if (!response.ok) throw new Error('Failed to fetch rakets');
    return response.json();
}

// To open specific raket details
export async function getRaketById(id, accessToken) {
    const response = await fetch(`http://localhost:3000/rakets/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch raket.");
    }
    return response.json();
}