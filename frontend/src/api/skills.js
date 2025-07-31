export async function getAllSkills() {
    const response = await fetch('http://localhost:3000/raketista-skill');
    if (!response.ok) {
        throw new Error("Failed to fetch skills");
    }
    return await response.json();
}