import { useEffect, useState } from "react";
import { getRaketById, applyToRaket } from "../api/rakets";

export function useRaket(id) {
  const [raket, setRaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    getRaketById(id)
      .then(data => {
        setRaket(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "Failed to load raket.");
        setLoading(false);
      });
  }, [id]);

  const apply = async (raketistaId) => {
    setApplyLoading(true);
    setApplyError("");
    setApplySuccess(false);

    try {
      await applyToRaket({
        raketId: Number(id), 
        raketistaId: Number(raketistaId), 
      });
      setApplySuccess(true);
    } catch (err) {
      setApplyError(err.message || "Failed to apply.");
    } finally {
      setApplyLoading(false);
    }
  };

  return { raket, loading, error, apply, applyLoading, applyError, applySuccess };
}
