const API_URL = import.meta.env.VITE_API_URL;

export async function getAllSkills() {
  const response = await fetch(`${API_URL}/raketista-skill`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  return await response.json();
}

export async function fetchCurrentUserSkills() {
  const res = await fetch(`${API_URL}/raketista-skill/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user skills");
  return await res.json();
}
