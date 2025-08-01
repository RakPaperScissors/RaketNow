import { useEffect, useState } from "react";
import { fetchAssignedRakets } from "../api/rakets";

export function useAssignedRakets() {
  const [assignedRakets, setAssignedRakets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchAssignedRakets(accessToken)
      .then(data => {
        setAssignedRakets(data);
        setError("");
      })
      .catch(err => {
        setError(err.message || "Failed to fetch assigned rakets");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { assignedRakets, loading, error, refetch: fetchData };
}
