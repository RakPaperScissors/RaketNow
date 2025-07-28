import { useEffect, useState } from "react";
import { fetchMyRakets, updateRaketStatus, fetchAssignedRakets } from "../../api/rakets";
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

    useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
    }, [token]);

    const handleStatusChange = async (raketId, newStatus) => {
        try {
        setUpdatingId(raketId);
        await updateRaketStatus(raketId, newStatus, token);
        setRakets(prev =>
            prev.map(r =>
            r.raketId === raketId ? { ...r, status: newStatus } : r
            )
        );
        } catch (err) {
        console.error("Failed to update status:", err);
        alert("Failed to update status. Try again.");
        } finally {
        setUpdatingId(null);
        }
    };

    const formatStatus = (status) => {
        return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    const groupByStatus = (status) => rakets.filter(r => r.status === status);

    if (loading) {
        return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
    }

    if (error) {
        return <p style={{ textAlign: "center", color: "red", marginTop: 40 }}>{error}</p>;
    }

    return (
        <div style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
            <DebugPanel user={currentUser} />
            <h1>My Rakets</h1>

            {/* Grouped Rakets by Status */}
            {["open", "in_progress", "completed"].map((status) => {
            const statusRakets = groupByStatus(status);
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
                        <div style={{ marginTop: 8 }}>Status: {formatStatus(raket.status)}</div>
                        <div style={{ marginTop: 8 }}>
                            <select
                            disabled={updatingId === raket.raketId}
                            value={raket.status}
                            onChange={(e) =>
                                handleStatusChange(raket.raketId, e.target.value)
                            }
                            >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            </select>
                        </div>
                        {raket.acceptedRaketista && (
                        <div style={{ marginTop: 8 }}>
                            Assigned Raketista: {`${raket.acceptedRaketista.firstName} ${raket.acceptedRaketista.lastName}`}
                        </div>
                        )}

                        {raket.status === "completed" && (
                        <div style={{ marginTop: 8 }}>
                            Date Completed: {new Date(raket.completedAt).toLocaleString()}
                        </div>
                        )}
                        </li>
                    ))}
                    </ul>
                )}
                </section>
            );
            })}

            {/* Rakets Assigned to Me (Only for Raketistas) */}
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
                        key={raket.id}
                        style={{
                        border: "1px solid #ddd",
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 16,
                        }}
                    >
                        <strong>{raket.title}</strong>
                        <div style={{ marginTop: 4, fontSize: 14, color: "#555" }}>
                        Client: {raket.clientName || "Unknown"}
                        </div>
                        <div style={{ marginTop: 8 }}>Status: {formatStatus(raket.status)}</div>

                        {raket.status === "completed" && (
                        <div>
                            Date Completed:{" "}
                            {new Date(raket.completedAt).toLocaleString()}
                        </div>
                        )}
                        <div style={{ marginTop: 8 }}>
                        <button
                            onClick={() =>
                            handleStatusChange(raket.id, "in_progress")
                            }
                            disabled={
                            updatingId === raket.id || raket.status !== "open"
                            }
                        >
                            Mark as In Progress
                        </button>
                        <button
                            style={{ marginLeft: 8 }}
                            onClick={() =>
                            handleStatusChange(raket.id, "completed")
                            }
                            disabled={
                            updatingId === raket.id || raket.status !== "in_progress"
                            }
                        >
                            Mark as Completed
                        </button>
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
