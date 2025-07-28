import { useEffect, useState } from "react";
import { fetchRakets, getRaketById } from "../api/rakets";

export function useRakets() {
    const [rakets, setRakets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRakets()
            .then(data => {
                setRakets(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { rakets, loading, error };
}