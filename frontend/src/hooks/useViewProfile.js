import { useState, useEffect, useCallback } from "react";
import { getProfileById } from "../api/profile";
import { getAllSkills } from "../api/skills";

export function useViewProfile(userId) {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProfile = useCallback(async () => {
        console.log("🔍 fetchProfile called with userId:", userId);
        if (!userId) {
            setError("No user ID provided");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("📡 Fetching profile and skills...");
            const [profileData, allSkills] = await Promise.all([getProfileById(userId), getAllSkills()]);
            console.log("✅ Profile data received:", profileData);
            console.log("✅ All skills received:", allSkills);
            setUser(profileData);
            const userSkills = allSkills.filter(item => { return item.raketista?.uid === Number(userId) });
            console.log(`🎯 Filtered skills for userId ${userId}:`, userSkills);
            setSkills(userSkills);
        } catch (err) {
            setError(err.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { user, skills, loading, error, refetch: fetchProfile };
}
