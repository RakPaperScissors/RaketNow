import { useEffect, useState } from "react";
import { fetchMyRakets } from "../api/rakets";

export function useMyRakets() {
  const [myRakets, setMyRakets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);

    fetchMyRakets()
      .then(data => {
        setMyRakets(data);
        setError("");
      })
      .catch(err => {
        setError(err.message || "Failed to fetch rakets");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { myRakets, loading, error, refetch: fetchData };
}
