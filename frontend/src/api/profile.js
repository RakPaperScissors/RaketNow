// Get user profile
export async function getProfile(accessToken) {
    const response = await fetch('http://localhost:3000/auth/me', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return await response.json();
}

// To update profile picture
export async function uploadProfilePicture(file, accessToken) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`http://localhost:3000/profile/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to upload profile picture.");
    }

    return await response.json();
}

// To update raketista bio
export async function updateBio(uid, bio, accessToken) {
    const response = await fetch(`http://localhost:3000/user/${uid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ bio }),
    });
    if (!response.ok) {
        throw new Error("Failed to update bio");
    }
    return await response.json();
}

// To get all skills
export async function getAllSkills() {
    const response = await fetch('http://localhost:3000/skills');
    if (!response.ok) {
        throw new Error("Failed to fetch skills");
    }
    return await response.json();
}

// To assign a skill to the raketista
export async function addSkill(raketistaId, skillId, accessToken) {
    const response = await fetch(`http://localhost:3000/raketista-skill`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ raketistaId, skillId }),
    });
    if (!response.ok) {
        throw new Error("Failed to assign skill to raketista.");
    }
    return await response.json();
}

// To remove a skill from the raketista
export async function deleteSkill(raketistaSkillId, accessToken) {
    const response = await fetch(`http://localhost:3000/raketista-skill/${raketistaSkillId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to remove skill from raketista.");
    }
    return await response.json();
}