import { useState } from "react";
import { cancelRaket } from "../../api/rakets";

export function useCancelRaket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = async (raketId) => {
    try {
      setLoading(true);
      setError(null);
      await cancelRaket(raketId);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { handleCancel, loading, error };
}
