import { useEffect, useState } from "react";
import { getRaketById } from "../api/rakets";

export function useRaket(id) {
    const [raket, setRaket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            setError("You are not logged in.");
            setLoading(false);
            return;
        }

        getRaketById(id, accessToken)
            .then(data => {
                setRaket(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return { raket, loading, error };
}