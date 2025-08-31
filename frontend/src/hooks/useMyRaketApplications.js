import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useMyRaketApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refetch = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/raket-application/my-applications`, {
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text || res.statusText);
        return text ? JSON.parse(text) : [];
      })
      .then((data) => {
        setApps(data);
        setError("");
      })
      .catch((e) =>
        setError(e.message || "Failed to fetch my applications")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { apps, loading, error, refetch };
}
