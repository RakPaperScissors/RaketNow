import { useState, useEffect, useCallback } from "react";
import { getProfileById } from "../api/profile";

export function useViewProfile(userId) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setError("No user ID provided");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        try {
            const data = await getProfileById(userId);
            setUser(data);
        } catch (err) {
            setError(err.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { user, loading, error, refetch: fetchProfile };
}
