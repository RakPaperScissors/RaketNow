import { useEffect, useState } from "react";
import { getMe, getRaketistas, getRakets, postRaket } from "../api/home";

export function useHomeFeed() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [feed, setFeed] = useState([]);
    const [search, setSearch] = useState("");

    const accessToken = localStorage.getItem("access_token");
    
    // To load feed based on role
    const fetchFeed = async (role) => {
        try {
            if (role === "raketista") {
                const rakets = await getRakets(accessToken);
                setFeed(rakets);
            } else {
                const raketistas = await getRaketistas(accessToken);
                setFeed(raketistas);
            }
        } catch {
            setMessage("Failed to load feed.");
        }
    };

    // For posting a raket
    const handlePostRaket = async (formData) => {
        try {
            await postRaket(formData, accessToken);
            const updated = await getRakets(accessToken);
            setFeed(updated);
            setMessage("Raket posted!");
        } catch (error) {
            setMessage(error.message || "Failed to create raket.");
        }
    };

    useEffect(() => {
        if (!accessToken) {
            setMessage("You are not logged in.");
            return;
        }

        getMe(accessToken)
            .then((me) => {
                setUser(me);
                fetchFeed(me.role);
            })
            .catch(() => setMessage("Failed to fetch profile."));
    }, [])

    return {
        user,
        feed,
        message,
        search,
        setSearch,
        handlePostRaket,
    };
}