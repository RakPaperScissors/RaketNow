import { useEffect, useState, useCallback } from "react";
import { fetchApplicationsForRaket } from "../api/rakets";


export function useRaketApplications(raketId) {
  const [raketApplications, setRaketApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
  setLoading(true);
  try {
    const data = await fetchApplicationsForRaket(raketId);
    setRaketApplications(data);
    setError("");
  } catch (err) {
    console.error("Error fetching raket applications:", err);
    setError(err.message || "Failed to load applications");
  } finally {
    setLoading(false);
  }
}, [raketId]);


  useEffect(() => {;
    if (raketId) fetch();
  }, [raketId, fetch]);

  return { raketApplications, loading, error, refetch: fetch };
}
