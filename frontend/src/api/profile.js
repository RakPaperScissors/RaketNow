const API_URL = import.meta.env.VITE_API_URL;

// Get user profile
export async function getProfile() {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return await response.json();
}

export async function getProfileById(userId) {
    const res = await fetch(`${API_URL}/user/${userId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }
    return await res.json();
}

// To update profile picture
export async function uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/profile/upload`, {
        method: 'POST',
        body: formData,
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to upload profile picture.");
    }

    return await response.json();
}

// To update raketista bio
export async function updateBio(uid, bio) {
    const response = await fetch(`${API_URL}/user/${uid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to update bio");
    }
    return await response.json();
}

// To get all skills
export async function getAllSkills() {
    const response = await fetch(`${API_URL}/skills`);
    if (!response.ok) {
        throw new Error("Failed to fetch skills");
    }
    return await response.json();
}

// To assign a skill to the raketista
export async function addSkill(raketistaId, skillId) {
    console.log("📤 Sending skill assignment request:", { raketistaId, skillId });
    const response = await fetch(`${API_URL}/raketista-skill`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ raketistaId, skillId }),
        credentials: 'include',
    });
    console.log("📥 Response status:", response.status);
    if (!response.ok) {
        console.error("❌ Error response");
        throw new Error("Failed to assign skill to raketista.");
    }
    // console.log("✅ Skill assignment success:", result);
    return await response.json();
}

// To remove a skill from the raketista
export async function deleteSkill(raketistaSkillId) {
    const response = await fetch(`${API_URL}/raketista-skill/${raketistaSkillId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Failed to remove skill from raketista.");
    }
    return await response.json();
}

// fetch completed rakets for clients
export async function fetchCompletedPostedRakets() {
    const response = await fetch(`${API_URL}/rakets/completed`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch completed rakets");
    }

    return response.json();
}

// fetch completed rakets for raketistas
export async function fetchCompletedAssignedRakets() {
    const response = await fetch(`${API_URL}/rakets/completed/assigned`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch completed rakets");
    }

    return response.json();
}