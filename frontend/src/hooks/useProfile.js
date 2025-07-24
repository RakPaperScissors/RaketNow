import { useEffect, useState } from "react";
import { getProfile, uploadProfilePicture, updateBio, getAllSkills, addSkill, deleteSkill } from "../api/profile";

export function useProfile() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    // States for editable fields
    const [bio, setBio] = useState("");
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    // States for skills management
    const [allSkills, setAllSkills] = useState([]);
    const [selectedSkillId, setSelectedSkillId] = useState("");

    // Original skills state
    const [originalRaketistaSkills, setOriginalRaketistaSkills] = useState([]);
    // Temporary skills state for display and manipulation in edit mode
    const [currentRaketistaSkills, setCurrentRaketistaSkills] = useState([]);
    // New states to track pending changes
    const [skillsToAdd, setSkillsToAdd] = useState([]);
    const [skillsToDelete, setSkillsToDelete] = useState([]); 

    const accessToken = localStorage.getItem("access_token");

    // Initial load effect
    useEffect(() => {
        if (!accessToken) {
            setMessage("You are not logged in.");
            return;
        }

        getProfile(accessToken)
            .then((data) => {
                setUser(data);
                setBio(data.bio || "");
                setOriginalRaketistaSkills(data.raketistaSkills || []);
                setCurrentRaketistaSkills(data.raketistaSkills || []);
            })
            .catch(() => setMessage("Failed to fetch profile."));

        getAllSkills()
            .then(setAllSkills)
            .catch(() => setMessage("Failed to load skills."));
    }, [accessToken]);

    // Reset bio when editing mode starts
    useEffect(() => {
        if (!isEditingProfile && user) {
            // When exiting editing mode, reset temporary states
            setBio(user.bio || "");
            setSelectedImageFile(null);
            setCurrentRaketistaSkills(user.raketistaSkills?.length ? user.raketistaSkills : []);
            setSkillsToAdd([]);
            setSkillsToDelete([]);
            setSelectedSkillId("");
        } else if (isEditingProfile && user) {
            // When entering edit mode, ensure currentSkills reflect user's skills
            setCurrentRaketistaSkills(user.raketistaSkills?.length ? user.raketistaSkills : []);
        }
    }, [isEditingProfile, user]);


    // Skill Management Functions
    const handleAddSkill = async () => {
        if (!user || !selectedSkillId) return;

        const skillIdNum = parseInt(selectedSkillId);
        const addedSkill = allSkills.find((s) => s.skill_Id === skillIdNum);

        // Prevent adding duplicate skills
        if (currentRaketistaSkills.some(rs => rs.skill.skill_Id === skillIdNum)) {
            setMessage("Skill already added.");
            return;
        }

        // Check if this skill was previously marked for deletion
        const wasMarkedForDeletion = skillsToDelete.includes(`pending-delete-${skillIdNum}`);
        const newSkillsToDelete = skillsToDelete.filter(id => id !== `pending-delete-${skillIdNum}`);

        // Add to current skills for display, give it a temporary ID
        const tempId = `temp-${Date.now()}-${Math.random()}`;
        setCurrentRaketistaSkills(prev => [...prev, { skill: addedSkill, id: tempId, isNew: true, skill_Id: skillIdNum }]);

        // Add to pending additions, but only if it's truly new
        if (!wasMarkedForDeletion) {
            setSkillsToAdd(prev => [...prev, { raketistaId: user.uid, skillId: skillIdNum }]);
        }
        setSkillsToDelete(newSkillsToDelete);

        setSelectedSkillId("");
        setMessage("Skill added to pending changes.");
    };

    const handleDeleteSkill = async (raketistaSkillId) => {
        // Find the skill to be deleted from current skills
        const skillToRemove = currentRaketistaSkills.find(rs => rs.id === raketistaSkillId);
        if (!skillToRemove) return;

        // If it's a new skill, just remove it from pending additions and current skills
        if (skillToRemove.isNew) {
            setSkillsToAdd(prev => prev.filter(s => s.skillId !== skillToRemove.skill_Id));
            setCurrentRaketistaSkills(prev => prev.filter(rs => rs.id !== raketistaSkillId));
            setMessage("Pending skill addition removed.");
        } else {
            // If it's an existing skill, mark it for deletion
            setSkillsToDelete(prev => [...prev, raketistaSkillId]);
            // Remove from the current skills for display
            setCurrentRaketistaSkills(prev => prev.filter(rs => rs.id !== raketistaSkillId));
            setMessage("Skill marked for removal.");
        }
    };

    // Core Save Functions
    const handleSaveAllChanges = async () => {
        setMessage("");
        let hasError = false;
        let successfulChanges = 0;

        // 1 - Handle Profile Picture Upload
        if (selectedImageFile) {
            try {
                const data = await uploadProfilePicture(selectedImageFile, accessToken);
                setUser((prev) => ({
                    ...prev,
                    profilePicture: data.imageUrl,
                }));
                setSelectedImageFile(null);
                setMessage(prev => prev + "Profile picture uploaded. ");
            } catch (err) {
                console.error("Error uploading profile picture:", err);
                setMessage(prev => prev + (err.message || "Error updating profile picture. "));
                hasError = true;
            }
        }

        // 2 - Handle Bio Update
        if (user && user.role === "raketista" && bio !== user.bio) {
            try {
                await updateBio(user.uid, bio, accessToken);
                setUser((prev) => ({ ...prev, bio }));
                setMessage(prev => prev + "Bio updated. ");
            } catch (err) {
                console.error("Error updating bio:", err);
                setMessage(prev => prev + (err.message || "Error updating bio. "));
                hasError = true;
            }
        }

        // 3 - Handle Skill Additions
        for (const skill of skillsToAdd) {
            try {
                await addSkill(skill.raketistaId, skill.skillId, accessToken);
                successfulChanges++;
            } catch (err) {
                console.error(`Error adding skill ${skill.skillId}:`, err);
                setMessage(prev => prev + `Error adding skill ${skill.skillId}.`);
                hasError = true;
            }
        }

        // 4 - Handle Skill Deletions
        for (const raketistaSkillId of skillsToDelete) {
            try {
                await deleteSkill(raketistaSkillId, accessToken);
                successfulChanges++;
            } catch (err) {
                console.error(`Error deleting skill ${raketistaSkillId}:`, err);
                setMessage(prev => prev + `Error deleting skill ${raketistaSkillId}.`);
                hasError = true;
            }
        }

        // After all saves, if no erros, reset pending states and exit edit mode
        if (!hasError) {
            setMessage("Profile changes saved successfully!");
            try {
                const updatedUser = await getProfile(accessToken);
                setUser(updatedUser);
                setOriginalRaketistaSkills(updatedUser.raketistaSkills || []);
                setCurrentRaketistaSkills(updatedUser.raketistaSkills || []);
                setBio(updatedUser.bio || "");

                // Clear all pending change states
                setSkillsToAdd([]);
                setSkillsToDelete([]);
                setSelectedImageFile(null);
                setSelectedSkillId("");

                setIsEditingProfile(false);
            } catch (fetchError) {
                console.error("Error re-fetching profile after save:", fetchError);
                setMessage("Profile saved, but failed to refresh data. Please refresh manually.");
                setIsEditingProfile(false);
            }
        } else {
            setMessage(prev => prev + "Some changes could not be saved. Please review and try again.");
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
        handleSaveAllChanges,
        handleAddSkill,
        handleDeleteSkill,
        selectedImageFile,
        setSelectedImageFile,
        currentRaketistaSkills,
    };
}