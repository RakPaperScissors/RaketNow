import { useEffect, useState } from "react";
import { fetchRaketApplications } from "../api/rakets";

export function useRaketApplications() {
  const [raketApplications, setRaketApplications] = useState([]);
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
    fetchRaketApplications(accessToken)
      .then(data => {
        setRaketApplications(data);
        setError("");
      })
      .catch(err => {
        setError(err.message || "Failed to fetch applications");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { raketApplications, loading, error, refetch: fetchData };
}

