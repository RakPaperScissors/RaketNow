import { useCallback, useEffect, useState } from "react";

export function useMyRaketApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refetch = useCallback(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found");
      setApps([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("http://localhost:3000/raket-application/my-applications", {
      headers: { Authorization: `Bearer ${token}` },
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
      .catch((e) => setError(e.message || "Failed to fetch my applications"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { apps, loading, error, refetch };
}