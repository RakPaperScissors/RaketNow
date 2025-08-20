const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUsers() {
    const response = await fetch (`${API_URL}/user`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
}