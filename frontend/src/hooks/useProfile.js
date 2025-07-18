import { useEffect, useState } from "react";
import { getProfile, updateBio, getAllSkills, addSkill, deleteSkill } from "../api/profile";

export function useProfile() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [bio, setBio] = useState("");
    const [allSkills, setAllSkills] = useState([]);
    const [selectedSkillId, setSelectedSkillId] = useState("");

    const accessToken = localStorage.getItem("access_token");

    useEffect(() => {
        if (!accessToken) {
            setMessage("You are not logged in.");
            return;
        }

        getProfile(accessToken)
            .then((data) => {
                setUser(data);
                setBio(data.bio || "");
            })
            .catch(() => setMessage("Failed to fetch profile."));

        getAllSkills()
            .then(setAllSkills)
            .catch(() => setMessage("Failed to load skills."));
    }, []);

    const handleBioSave = async () => {
        setMessage("");
        try {
            await updateBio(user.uid, bio, accessToken);
            setUser((prev) => ({ ...prev, bio }));
            setIsEditingProfile(false);
            setMessage("Bio updated!");
        } catch {
            setMessage("Error updating bio.");
        }
    };

    const handleAddSkill = async () => {
        try {
            await addSkill(user.uid, parseInt(selectedSkillId), accessToken);
            const added = allSkills.find((s) => s.skill_Id === parseInt(selectedSkillId));
            setUser((prev) => ({
                ...prev,
                raketistaSkills: [...(prev.raketistaSkills || []), { skill: added, id: Date.now() }],
            }));
            setSelectedSkillId("");
        } catch {
            setMessage("Error adding skill.");
        }
    };

    const handleDeleteSkill = async (raketistaSkillId) => {
        try {
            await deleteSkill(raketistaSkillId, accessToken);
            setUser((prev) => ({
                ...prev,
                raketistaSkills: prev.raketistaSkills.filter((s) => s.id !== raketistaSkillId),
            }));
        } catch {
            setMessage("Error deleting skill.");
        }
    };

    return {
        user,
        bio,
        isEditingProfile,
        message,
        allSkills,
        selectedSkillId,
        setSelectedSkillId,
        setIsEditingProfile,
        setBio,
        handleBioSave,
        handleAddSkill,
        handleDeleteSkill,
    };
}