import { useRaket } from "../../hooks/useRaket";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DebugPanel from "../../components/DebugPanel"; 

function Raket() {
    const { id } = useParams();
    const { raket, loading, error, apply, applyLoading, applyError, applySuccess } = useRaket(id);
    const currentUser = useCurrentUser();
    const raketistaId = currentUser?.uid;

    if (error) return <div>{error}</div>;
    if (loading) return <div>Loading...</div>;

    function applyToThisRaket() {
        const parsedRaketId = Number(id);
        const parsedRaketistaId = Number(raketistaId);

        if (!parsedRaketId || !parsedRaketistaId) {
            console.error("Invalid apply data:", {
            raketId: parsedRaketId,
            raketistaId: parsedRaketistaId,
            });
            return;
        }

        apply(parsedRaketistaId);
    }

    return (
        <div>
            <DebugPanel user={currentUser} />
            <div>
            <h2><strong>{raket.title}</strong></h2>
            <p>{raket.description}</p>
            <p>Budget: Php {raket.budget}</p>
            <p>Posted by: {raket.user?.name} ({raket.user?.email})</p>
            <p>Posted {raket.dateCreated ? formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true}) : ""}</p>
            </div>
            <div>
                <h2><strong>About Me</strong></h2>
                <h2>Name: {raket.user?.name}</h2>
                <h3>Email: {raket.user?.email}</h3>
                <p>{raket.user?.bio}</p>
            </div>

            {/* apply to raket */}
            {raket.status === "open" && (
                <div>
                    <h2>Apply to this Raket</h2>
                    <input
                    type="number"
                    placeholder="Your Price Proposal"
                    />
                    <button
                    onClick={applyToThisRaket}
                    disabled={applyLoading}
                    >
                    {applyLoading ? "Applying..." : "Apply"}
                    </button>
                    {applyError && <p style={{ color: "red" }}>{applyError}</p>}
                    {applySuccess && <p style={{ color: "green" }}>Application successful!</p>}
                </div>
                )}
        </div>
    );
}

export default Raket;