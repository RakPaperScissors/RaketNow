import { useEffect, useState } from "react";
import { fetchUsers } from "../api/admin";

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
                setError(err);
                setLoading(false);
            });
    }, []);

    return { users, loading, error };
}