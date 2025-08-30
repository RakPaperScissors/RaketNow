import { useEffect, useState, useRef, useCallback } from "react";
import { fetchUsers, trackVisit, fetchVisits as fetchVisitsApi, deleteUser } from "../api/admin";
import { fetchRakets } from "../api/rakets";

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err?.message || "Failed to fetch users.");
                setLoading(false);
            });
    }, []);

    return { users, loading, error };
}

export function makeSessionId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function useTrackVisit(userId) {
    const calledRef = useRef(false);

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;

        let sessionId = sessionStorage.getItem("raketnow_session");

        if (!sessionId) {
            sessionId = makeSessionId();
            sessionStorage.setItem("raketnow_session", sessionId);

            trackVisit(sessionId, userId).catch(() => {

            });
        }
    }, [userId]);
}

export const useVisits = () => {
    const [visits, setVisits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchVisitsApi();
                setVisits(data);
            } catch (err) {
                setError(err.message || "Failed to fetch visits");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return { visits, loading, error };
}

export function useDeleteUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDelete = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await deleteUser(userId);
            setSuccess(true);
            return result;
        } catch (err) {
            setError(err.message || "Failed to delete user.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return { handleDelete, loading, error, success };
}

export function useRakets() {
    const [rakets, setRakets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRakets()
            .then((data) => {
                setRakets(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err?.message || "Failed to fetch rakets.");
                setLoading(false);
            });
    }, []);

    return { rakets, loading, error };
}