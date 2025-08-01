import { useEffect, useState, useCallback } from "react";
import { 
    getProfile, 
    uploadProfilePicture, 
    updateBio, 
    getAllSkills, 
    addSkill, 
    deleteSkill 
} from "../api/profile";

export function useProfile() {
    // Core data states
    const [user, setUser] = useState(null);
    const [allSkills, setAllSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // States for managing the UI in edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [currentSkills, setCurrentSkills] = useState([]);
    const [skillsLoading, setSkillsLoading] = useState(true);

    // Fetches all necessary data for the profile page
    const fetchProfileData = useCallback(async () => {
        setLoading(true);
        setSkillsLoading(true);
        setMessage("");
        try {
            // Fetch profile and all skills in parallel for a faster load time
            const [userData, skillsData] = await Promise.all([getProfile(), getAllSkills()]);
            
            setUser(userData);
            setAllSkills(skillsData);
            
            // Initialize the states used for editing
            setBio(userData.bio || "");
            setCurrentSkills(userData.raketistaSkills || []);
        } catch (err) {
            setMessage(err.message || "Failed to load profile data.");
            console.error("Profile fetch error:", err);
        } finally {
            setLoading(false);
            setSkillsLoading(false);
        }
    }, []);

    // Load data on initial component mount
    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData, location.pathname]);

    // Handler to toggle editing mode on/off
    const toggleEditMode = () => {
        setIsEditing(prev => {
            // If we are canceling the edit, reset the fields to their original state
            if (prev && user) {
                setBio(user.bio || "");
                setCurrentSkills(user.raketistaSkills || []);
                setSelectedImageFile(null);
                setMessage("");
            }
            return !prev;
        });
    };

    // Adds a skill to the temporary 'currentSkills' list for display
    const addSkillToCurrent = (skillIdToAdd) => {
        if (!skillIdToAdd) return;
        
        const skillIdNum = parseInt(skillIdToAdd);
        if (currentSkills.some(rs => rs.skill.skill_Id === skillIdNum)) {
            setMessage("Skill is already in your list.");
            return;
        }

        const skillData = allSkills.find(s => s.skill_Id === skillIdNum);
        if (skillData) {
            const newRaketistaSkill = { 
                id: `new-${skillIdNum}`, // Temporary ID for the key
                skill: skillData, 
                isNew: true // Flag to identify this as a pending addition
            };
            setCurrentSkills(prev => [...prev, newRaketistaSkill]);
            setMessage("");
        }
    };

    // Removes a skill from the temporary 'currentSkills' list
    const removeSkillFromCurrent = (raketistaSkillId) => {
        setCurrentSkills(prev => prev.filter(rs => rs.id !== raketistaSkillId));
    };

    // Main function to save all pending changes
    const saveAllChanges = async () => {
        if (!user) return;
        setLoading(true);
        setMessage("Saving...");

        try {
            // Determine what has changed by comparing original state with current state
            const skillsToAdd = currentSkills.filter(rs => rs.isNew);
            const skillsToDelete = user.raketistaSkills.filter(
                rs => !currentSkills.some(current => current.id === rs.id)
            );

            // Build an array of promises for all API calls
            const promises = [];

            if (selectedImageFile) {
                promises.push(uploadProfilePicture(selectedImageFile));
            }
            // if (bio !== user.bio) {
                promises.push(updateBio(user.uid, bio));
            // }
            skillsToAdd.forEach(skill => {
                promises.push(addSkill(user.uid, skill.skill.skill_Id));
            });
            skillsToDelete.forEach(rs => {
                promises.push(deleteSkill(rs.id));
            });

            // Execute all API calls concurrently
            await Promise.all(promises);
            await fetchProfileData();
            setMessage("Profile updated successfully!");
            setIsEditing(false);

        } catch (err) {
            setMessage(err.message || "An error occurred while saving. Please try again.");
            console.error("Save changes error:", err);
        } finally {
            // Always refresh data from the server to get the latest state
            await fetchProfileData(); 
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        skillsLoading,
        message,
        isEditing,
        bio,
        setBio,
        allSkills,
        currentSkills,
        selectedImageFile,
        setSelectedImageFile,
        toggleEditMode,
        handleAddSkill: addSkillToCurrent,
        handleDeleteSkill: removeSkillFromCurrent,
        handleSaveChanges: saveAllChanges,
    };
}