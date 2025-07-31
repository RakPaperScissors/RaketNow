import { useState } from "react";
import { applyForRaketista } from "../api/users";
import { updateBio, addSkill } from "../api/profile";
import { useAuth } from "../context/AuthContext";


export function useApplyRaketista() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const apply = async (uid, bio, selectedSkillIds) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const result = await applyForRaketista();

            await updateBio(uid, bio);

            for (const skillId of selectedSkillIds) {
                await addSkill(user.uid, skillId);
            }
            
            setSuccess(true);
            return result;
        } catch (err) {
            setError("Application failed: " + (err?.message || "Unknown error"));
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        apply,
        loading,
        error,
        success,
    };
}
