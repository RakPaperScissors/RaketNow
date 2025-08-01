import { useEffect, useState } from "react";
import { fetchRaketistas } from "../api/users";
import { getAllSkills } from "../api/skills";

export function useRaketistas() {
    const [raketistas, setRaketistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadRaketistas = async () => {
            setLoading(true)
            try{
                const [raketistaList, skillsList] = await Promise.all([fetchRaketistas(), getAllSkills()]);
                console.log("Raw raketista data:", raketistaList);
                console.log("Raw skills data:", skillsList);

                const raketistaMap = {};

                // First, create base raketista entries
                for (const r of raketistaList) {
                    raketistaMap[r.uid] = {
                        id: r.uid,
                        name: `${r.firstName} ${r.lastName}`,
                        type: r.type || "N/A",
                        rating: r.averageRating ?? 0,
                        totalReviews: r.totalReviews ?? 0,
                        skills: [],
                        img: r.profilePicture
                            ? `http://localhost:9000/raketnow/${r.profilePicture}`
                            : "http://localhost:9000/raketnow/default_profile.jpg",
                        email: r.email,
                    };
                }

                // Then, assign skills to each raketista
                for (const entry of skillsList) {
                    const raketistaId = entry.raketista?.uid;
                    const skillName = entry.skill?.skillName;

                    if (raketistaMap[raketistaId] && skillName) {
                        raketistaMap[raketistaId].skills.push(skillName);
                    }
                }

                // Convert map to array
                const enrichedData = Object.values(raketistaMap);
                setRaketistas(enrichedData);
            } catch (err) {
                console.error(err);
                setMessage("Failed to load raketistas.");
            } finally {
                setLoading(false);
            }
        };
        loadRaketistas();
    }, []);

    return {
        raketistas,
        loading,
        message,
    };
}