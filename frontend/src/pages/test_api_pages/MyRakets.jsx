import { useEffect, useState, useCallback } from "react";
import { fetchMyRakets, updateRaketStatus, fetchAssignedRakets, requestCompletion, cancelCompletionRequest, deleteRaketById } from "../../api/rakets";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DebugPanel from "../../components/DebugPanel"; 

const MyRakets = () => {
    const currentUser = useCurrentUser();
    const [rakets, setRakets] = useState([]);
    const [assignedRakets, setAssignedRakets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const token = localStorage.getItem("access_token");

    const fetchRaketsData = useCallback(async () => {
        if (!token) {
        setError("Access token not found.");
        setLoading(false);
        return;
        }

        try {
        const [myRaketsData, assignedRaketsData] = await Promise.all([
            fetchMyRakets(token),
            fetchAssignedRakets(token),
        ]);

        setRakets(myRaketsData);
        setAssignedRakets(assignedRaketsData);
        } catch (err) {
        console.error("Error fetching rakets:", err);
        setError("Failed to fetch rakets.");
        } finally {
        setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchRaketsData();
    }, [fetchRaketsData]);

    const handleStatusChange = async (raketId, newStatus) => {
        try {
            setUpdatingId(raketId);
            const raket = rakets.find(r => r.raketId === raketId);
            const wasPending = raket.status === "pending_confirmation";
            await updateRaketStatus(raketId, newStatus, token);
            if (wasPending && newStatus === "in_progress") {
            await cancelCompletionRequest(raketId, token); // optional: backend cleanup
            }
            await fetchRaketsData();
        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Failed to update status. Try again.");
        } finally {
            setUpdatingId(null);
        }
    };


    const handleMarkCompleted = async (raketId) => {
        try {
            setUpdatingId(raketId);
            await requestCompletion(raketId, token);
            await fetchRaketsData();
        } catch (err) {
            console.error("Failed to mark as completed:", err);
            alert("Something went wrong. Try again.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleCancelConfirmation = async (raketId) => {
        try {
            setUpdatingId(raketId);
            await cancelCompletionRequest(raketId, token);
            await fetchRaketsData();
        } catch (err) {
            console.error("Failed to cancel confirmation:", err);
            alert("Something went wrong. Try again.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleClientConfirmCompleted = async (raketId) => {
        try {
        setUpdatingId(raketId);
        await updateRaketStatus(raketId, "completed", token);
        await fetchRaketsData();
        } catch (err) {
        console.error("Failed to confirm completion:", err);
        alert("Something went wrong. Try again.");
        } finally {
        setUpdatingId(null);
        }
    };

    const handleDeleteRaket = async (raketId) => {
        try {
            setUpdatingId(raketId);
            await deleteRaketById(raketId, token);
            await fetchRaketsData();
        } catch (err) {
            console.error("Failed to delete raket:", err);
            alert("Failed to delete raket.");
        } finally {
            setUpdatingId(null);
        }
    };


    const formatStatus = (status) =>
        status
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    if (loading) {
        return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
    }

    if (error) {
        return (
        <p style={{ textAlign: "center", color: "red", marginTop: 40 }}>
            {error}
        </p>
        );
    }

    return (
        <div style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
        <DebugPanel user={currentUser} />
        <h1>My Rakets</h1>

        {/* Grouped Rakets by Status */}
        {["open", "in_progress", "completed"].map((status) => {
            const statusRakets =
            status === "in_progress"
                ? rakets.filter(
                    (r) => r.status === "in_progress" || r.status === "pending_confirmation"
                )
                : rakets.filter((r) => r.status === status);

            return (
            <section key={status} style={{ marginTop: 32 }}>
                <h2>{formatStatus(status)}</h2>
                {statusRakets.length === 0 ? (
                <p>No rakets in this status.</p>
                ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {statusRakets.map((raket) => (
                    <li
                        key={raket.raketId}
                        style={{
                        border: "1px solid #ddd",
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 16,
                        }}
                    >
                        <strong>{raket.title}</strong>
                        <div style={{ marginTop: 8 }}>
                        Status:{" "}
                        {raket.status === "pending_confirmation"
                            ? "In Progress (Pending Completed Confirmation)"
                            : formatStatus(raket.status)}
                        </div>
                        {/*for open rakets */}
                        {raket.status === "open" && (
                        <div style={{ marginTop: 8 }}>
                            <button
                            onClick={() => handleDeleteRaket(raket.raketId)}
                            disabled={updatingId === raket.raketId}
                            >
                            {updatingId === raket.raketId ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                        )}
                        {/*for in progress and pending confirmation rakets */}
                        {raket.status !== "completed" && raket.status !== "open" && (
                        <>
                            <div style={{ marginTop: 8 }}>
                            <select
                                disabled={updatingId === raket.raketId}
                                value={raket.status}
                                onChange={(e) =>
                                handleStatusChange(raket.raketId, e.target.value)
                                }
                            >
                                <option value="in_progress">In Progress</option>
                                {raket.status === "pending_confirmation" && (
                                <option value="pending_confirmation" disabled>
                                    Pending Confirmation
                                </option>
                                )}
                                <option value="completed">Completed</option>
                            </select>
                            </div>

                            {raket.status === "pending_confirmation" && (
                            <div style={{ marginTop: 8 }}>
                                <button
                                onClick={() => handleClientConfirmCompleted(raket.raketId)}
                                disabled={updatingId === raket.raketId}
                                >
                                {updatingId === raket.raketId
                                    ? "Processing..."
                                    : "Confirm Completion"}
                                </button>
                            </div>
                            )}
                        </>
                        )}

                        {raket.acceptedRaketista && (
                        <div style={{ marginTop: 8 }}>
                            Assigned Raketista:{" "}
                            {`${raket.acceptedRaketista.firstName} ${raket.acceptedRaketista.lastName}`}
                        </div>
                        )}
                        {/*for completed rakets */}
                        {raket.status === "completed" && raket.completedAt && (
                        <div style={{ marginTop: 8 }}>
                            Date Completed:{" "}
                            {new Date(raket.completedAt).toLocaleString()}
                        </div>
                        )}
                    </li>
                    ))}
                </ul>
                )}
            </section>
            );
        })}

        {/* assigned to me (only raketistas can have this section) */}
        {currentUser?.role === "raketista" && (
            <section style={{ marginTop: 48 }}>
            <h2>Rakets Assigned to Me</h2>

            {loading ? (
                <p>Loading assigned rakets...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : assignedRakets.length === 0 ? (
                <p>No rakets have been assigned to you yet.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                {assignedRakets.map((raket) => (
                    <li
                    key={raket.raketId}
                    style={{
                        border: "1px solid #ddd",
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 16,
                    }}
                    >
                    <strong>{raket.title}</strong>
                    <div
                        style={{ marginTop: 4, fontSize: 14, color: "#555" }}
                    >
                        Client: {raket.clientName || "Unknown"}
                    </div>
                    <div style={{ marginTop: 8 }}>
                        Status: {formatStatus(raket.status)}
                    </div>

                    {raket.status === "completed" && raket.completedAt && (
                        <div>
                        Date Completed:{" "}
                        {new Date(raket.completedAt).toLocaleString()}
                        </div>
                    )}
                    <div style={{ marginTop: 8 }}>
                        {raket.status === "in_progress" && (
                        <button
                            onClick={() => handleMarkCompleted(raket.raketId)}
                            disabled={updatingId === raket.raketId}
                        >
                            {updatingId === raket.raketId
                            ? "Processing..."
                            : "Mark as Completed"}
                        </button>
                        )}
                        {raket.status === "pending_confirmation" && (
                        <>
                            <button disabled>
                            Pending Client Confirmation
                            </button>
                            <button
                            onClick={() =>
                                handleCancelConfirmation(raket.raketId)
                            }
                            disabled={updatingId === raket.raketId}
                            >
                            {updatingId === raket.raketId
                                ? "Processing..."
                                : "Cancel Request"}
                            </button>
                        </>
                        )}
                    </div>
                    </li>
                ))}
                </ul>
            )}
            </section>
        )}
        </div>
    );
};

export default MyRakets;

