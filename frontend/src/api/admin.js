import { use } from "react";

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

export async function trackVisit(sessionId, userId) {
    const response = await fetch(`${API_URL}/visits/track`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sessionId, userId }),
    });

    if (!response.ok) {
        throw new Error("Failed to track visit");
    }

    return await response.json();
}

export async function fetchVisits() {
    const response = await fetch(`${API_URL}/visits/stats`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch visits");
    }

    return await response.json();
}

export async function deleteUser(userId) {
    if (!userId) throw new Error("deleteUser called without a valid userId");

    const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }

    return await response.json();
}