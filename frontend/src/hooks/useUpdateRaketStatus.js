import { useState } from "react";
import { updateRaketStatus } from "../api/rakets";

export function useUpdateRaketStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateStatus = async (raketId, newStatus) => {
    setLoading(true);
    setError("");

    try {
      const updated = await updateRaketStatus(raketId, newStatus);
      return updated;
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
}
