import { useState, useEffect, useCallback } from "react";
import { getProfileById } from "../api/profile";
import { getAllSkills } from "../api/skills";
import { getRaketOfUser, fetchCompletedRaketsOfUser } from "../api/rakets";

export function useViewProfile(userId) {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userRakets, setUserRakets] = useState([]);
    const [userCompletedRakets, setUserCompletedRakets] = useState([]);

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setError("No user ID provided");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const [profileData, allSkills, userRakets, userCompletedRakets] = await Promise.all([getProfileById(userId), getAllSkills(), getRaketOfUser(userId), fetchCompletedRaketsOfUser(userId)]);
            setUser(profileData);
            const userSkills = allSkills.filter(item => { return item.raketista?.uid === Number(userId) });
            setSkills(userSkills);
            setUserRakets(userRakets);
            setUserCompletedRakets(userCompletedRakets);
        } catch (err) {
            setError(err.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { user, skills, userRakets, userCompletedRakets, loading, error, refetch: fetchProfile };
}
