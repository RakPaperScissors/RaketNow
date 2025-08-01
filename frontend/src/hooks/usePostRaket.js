import { useState } from "react";
import { postRaket } from "../api/rakets";

export function usePostRaket() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const submitRaket = async (raketData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const result = await postRaket(raketData);
            setSuccess(true);
            return result;
        } catch (err) {
            setError(err.message || "An error occured.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { submitRaket, loading, error, success};
}