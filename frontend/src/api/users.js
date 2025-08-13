const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUsers() {
    const response = await fetch(`${API_URL}/user`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
}

export async function fetchUsersByRole(role) {
    const response = await fetch(`${API_URL}/user?role=${role}`);
    if (!response.ok) throw new Error('Failed to fetch users by role');
    return response.json();
}

export async function fetchRaketistas() {
    const response = await fetch(`${API_URL}/raketista`);
    if (!response.ok) throw new Error('Failed to fetch raketistas');
    return response.json();
}

export async function applyForRaketista() {
    const response = await fetch(`${API_URL}/user/apply-raketista`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) throw new Error('Failed to apply for raketista');
    return response.json();
}

export async function getPublicUserProfile(uid) {
    const response = await fetch(`${API_URL}/user/${uid}/public-profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch public profile.');
    }
    return response.json();
}

export async function searchUsers(query) {
    if (!query) return []; // Return empty array if query is empty

    // Determine if it's likely an email based on presence of '@'
    const isEmail = query.includes('@');
    const endpoint = isEmail ? 'search/email' : 'search/name';
    const param = isEmail ? query : encodeURIComponent(query); // Encode name for URL

    const url = `${API_URL}/user/search/name/${param}`;
    console.log("Searching URL:", url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Essential for cookie-based auth
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to search users by ${isEmail ? 'email' : 'name'}.`);
    }

    const data = await response.json();
    console.log(data)
    return isEmail ? (data || []) : (data.users || []); // Assuming searchByEmail returns user or null, searchByName returns {users:[]}
}