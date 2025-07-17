import { useEffect, useState } from "react";
import { getRaketById, applyToRaket } from "../api/rakets";

export function useRaket(id) {
    const [raket, setRaket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // const [applyLoading, setApplyLoading] = useState(false);
    // const [applyError, setApplyError] = useState("");
    // const [applySuccess, setApplySuccess] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            setError("You are not logged in.");
            setLoading(false);
            return;
        }

        getRaketById(id, accessToken)
            .then(data => {
                setRaket(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    // raket application
    // const apply = async (raketistaId, priceProposal, budget) => {
    //     setApplyLoading(true);
    //     setApplyError("");
    //     setApplySuccess(false);
    //     const accessToken = localStorage.getItem("access_token");
    //     try {
    //         await applyToRaket({ raketId: id, raketistaId, priceProposal, budget }, accessToken);
    //         setApplySuccess(true);
    //     } catch (err) {
    //         setApplyError(err.message);
    //     } finally {
    //         setApplyLoading(false);
    //     }
    // };

    return { raket, loading, error };
        
        // , apply, applyLoading, applyError, applySuccess };
}