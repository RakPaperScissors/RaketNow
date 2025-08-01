import { useEffect, useState, useCallback } from "react";
import { fetchMyRakets, updateRaketStatus, fetchAssignedRakets, requestCompletion, cancelCompletionRequest, deleteRaketById, cancelOngoingRaket, rejectCompletionRequest, withdrawFromRaket  } from "../../api/rakets";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DebugPanel from "../../components/DebugPanel"; 

const UserRakets = () => {
    const currentUser = useCurrentUser();
    const [rakets, setRakets] = useState([]);
    const [assignedRakets, setAssignedRakets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchRaketsData = useCallback(async () => {
        try {
        const [myRaketsData, assignedRaketsData] = await Promise.all([
            fetchMyRakets(),
            fetchAssignedRakets(),
        ]);
        setRakets(myRaketsData);
        setAssignedRakets(assignedRaketsData);
        } catch (err) {
        console.error("Error fetching rakets:", err);
        setError("Failed to fetch rakets.");
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRaketsData();
    }, [fetchRaketsData]);

    useEffect(() => {
        fetchRaketsData();
    }, [fetchRaketsData]);

    const handleStatusChange = async (raketId, newStatus) => {
        try {
        setUpdatingId(raketId);
        const raket = rakets.find((r) => r.raketId === raketId);
        const wasPending = raket.status === "pending_confirmation";
        await updateRaketStatus(raketId, newStatus);
        if (wasPending && newStatus === "in_progress") {
            await cancelCompletionRequest(raketId);
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

    const handleMarkCompleted = async (raketId) => {
        try {
        setUpdatingId(raketId);
        await requestCompletion(raketId);
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
        await cancelCompletionRequest(raketId);
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
        await updateRaketStatus(raketId, "completed");
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
        await deleteRaketById(raketId);
        await fetchRaketsData();
        } catch (err) {
        console.error("Failed to delete raket:", err);
        alert("Failed to delete raket.");
        } finally {
        setUpdatingId(null);
        }
    };

    const handleCancel = async (raketId) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this ongoing raket?");
        if (!confirmCancel) return;

        try {
        setUpdatingId(raketId);
        await cancelOngoingRaket(raketId);
        await fetchRaketsData();
        } catch (err) {
        console.error("Failed to cancel raket:", err);
        alert("Failed to cancel raket. Please try again.");
        } finally {
        setUpdatingId(null);
        }
    };

    const handleRejectCompletionRequest = async (raketId) => {
        const confirmReject = window.confirm("Are you sure you want to reject the completion request?");
        if (!confirmReject) return;

        try {
        setUpdatingId(raketId);
        await rejectCompletionRequest(raketId);
        await fetchRaketsData();
        } catch (err) {
        console.error("Failed to reject completion request:", err);
        alert("Something went wrong. Try again.");
        } finally {
        setUpdatingId(null);
        }
    };

    const handleWithdraw = async (raketId) => {
        const confirm = window.confirm("Are you sure you want to withdraw? The raket will return to open status.");
        if (!confirm) return;

        try {
        setUpdatingId(raketId);
        await withdrawFromRaket(raketId);
        await fetchRaketsData();
        } catch (err) {
        console.error("Failed to withdraw:", err);
        alert("Failed to withdraw from raket.");
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
        {["open", "in_progress", "completed", 'cancelled'].map((status) => {
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
                        <div style={{ marginTop: 12 }}>
                            <button
                            disabled={updatingId === raket.raketId}
                            onClick={() => handleDeleteRaket(raket.raketId)}
                            >
                            🗑️ Delete
                            </button>
                        </div>
                        )}
                        {/*for pending and ongoing rakets */}
                        {raket.status === "pending_confirmation" && (
                        <div style={{ marginTop: 12 }}>
                            <button
                            disabled={updatingId === raket.raketId}
                            onClick={() => handleClientConfirmCompleted(raket.raketId)}
                            >
                            Confirm Completion
                            </button>
                            <button
                            disabled={updatingId === raket.raketId}
                            onClick={() => handleRejectCompletionRequest(raket.raketId)}
                            >
                            Still Ongoing
                            </button>
                        </div>
                        )}
                        {raket.status === "in_progress" && (
                        <div style={{ marginTop: 12 }}>
                            <select
                            disabled={updatingId === raket.raketId}
                            value="in_progress"
                            onChange={(e) => handleStatusChange(raket.raketId, e.target.value)}
                            >
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            </select>
                            <button
                            style={{ marginLeft: 8 }}
                            disabled={updatingId === raket.raketId}
                            onClick={() => handleCancel(raket.raketId)}
                            >
                            Cancel
                            </button>
                        </div>
                        )}
                        {/*for cancelled and completed rakets */}
                        {raket.status === "completed" && raket.completedAt && (
                        <div style={{ marginTop: 8 }}>
                            Date Completed: {new Date(raket.completedAt).toLocaleString()}
                        </div>
                        )}

                        {raket.status === "cancelled" && raket.updatedAt && (
                        <div style={{ marginTop: 8 }}>
                            Date Cancelled: {new Date(raket.updatedAt).toLocaleString()}
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
                        <>
                            <button
                            onClick={() => handleMarkCompleted(raket.raketId)}
                            disabled={updatingId === raket.raketId}
                            >
                            {updatingId === raket.raketId ? "Processing..." : "Mark as Completed"}
                            </button>

                            <button
                            onClick={() => handleWithdraw(raket.raketId)}
                            disabled={updatingId === raket.raketId}
                            style={{ marginLeft: 8, backgroundColor: "#f44336", color: "white", border: "none", padding: "6px 12px", borderRadius: 4 }}
                            >
                            {updatingId === raket.raketId ? "Processing..." : "Withdraw"}
                            </button>
                        </>
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

export default UserRakets;

