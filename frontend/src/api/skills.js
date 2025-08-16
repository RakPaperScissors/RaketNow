const API_URL = import.meta.env.VITE_API_URL;

export async function getAllSkills() {
    const response = await fetch(`${API_URL}/raketista-skill`);
    if (!response.ok) {
        throw new Error("Failed to fetch skills");
    }
    return await response.json();
}