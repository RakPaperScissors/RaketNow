import { useState } from "react";
import { useRaketApplications } from "../../hooks/useRaketApplications";
import { useMyRaketApplications } from "../../hooks/useMyRaketApplications";
import { acceptApplication, rejectApplication } from "../../api/notifications";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DebugPanel from "../../components/DebugPanel";

// money formatting
const formatPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

function Applications() {
  const {raketApplications: applications,loading, error,refetch: refresh, } = useRaketApplications();
  const { apps: myApplications, loading: myLoading, error: myError, refetch: refreshMine,} = useMyRaketApplications();
  const currentUser = useCurrentUser();
  const [actionLoading, setActionLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  const handleAccept = async (id) => {
    try {
      setActionLoading(true);
      await acceptApplication(id, token);
      await refresh();
    } finally {
      setActionLoading(false);
    }
  };
  const handleReject = async (id) => {
    try {
      setActionLoading(true);
      await rejectApplication(id, token);
      await refresh();
    } finally {
      setActionLoading(false);
    }
  };
  const handleWithdraw = async (id) => {
    try {
      setActionLoading(true);
      const res = await fetch(
        `http://localhost:3000/raket-application/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`(${res.status}) ${text || res.statusText}`);
      }
      await refresh?.();
      await refreshMine?.();
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to withdraw application");
    } finally {
      setActionLoading(false);
    }
  };

  const renderRaketistaName = (raketista) =>
    [raketista?.firstName, raketista?.lastName].filter(Boolean).join(" ") ||
    "Unknown";

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <DebugPanel user={currentUser} />
      <h1>Raket Applications</h1>

      {/* raket applications to user's rakets */}
      <section style={{ marginTop: 32 }}>
        <h2>Applications to My Rakets</h2>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : applications && applications.length > 0 ? (
          <ul>
            {applications.map((app) => {
              const raketistaName = renderRaketistaName(app.raketista);
              const isOwner = currentUser?.uid === app.raket?.user?.uid;
              const isPending = app.status?.toUpperCase() === "PENDING";

              return (
                <li
                  key={app.applicationId}
                  style={{
                    marginBottom: 16,
                    border: "1px solid #eee",
                    padding: 12,
                    borderRadius: 6,
                  }}
                >
                  <div>
                    <strong>Raket:</strong> {app.raket?.title || "No title"}
                  </div>
                  <div>
                    <strong>Raketista:</strong> {raketistaName}
                  </div>
                  <div>
                    <strong>Proposal:</strong>{" "}
                    {formatPeso.format(Number(app.priceProposal || 0))}
                  </div>
                  <div>
                    <strong>Status:</strong> {app.status}
                  </div>

                  {isPending && isOwner && (
                    <div style={{ marginTop: 8 }}>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAccept(app.applicationId)}
                        style={{ marginRight: 8 }}
                      >
                        Accept
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleReject(app.applicationId)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No applications to your rakets.</p>
        )}
      </section>
      {/* raket a pplications the user (raketista) submitted */}
      <section style={{ marginTop: 32 }}>
        <h2>My Submitted Applications</h2>

        {myLoading ? (
          <div>Loading...</div>
        ) : myError ? (
          <div style={{ color: "red" }}>{myError}</div>
        ) : myApplications && myApplications.length > 0 ? (
          <ul>
            {myApplications.map((app) => {
              const isMine = currentUser?.uid === app.raketista?.uid;
              const isPending = app.status?.toUpperCase() === "PENDING";

              return (
                <li
                  key={app.applicationId}
                  style={{
                    marginBottom: 16,
                    border: "1px solid #eee",
                    padding: 12,
                    borderRadius: 6,
                  }}
                >
                  <div>
                    <strong>Raket:</strong> {app.raket?.title || "No title"}
                  </div>
                  <div>
                    <strong>Proposal:</strong>{" "}
                    {formatPeso.format(Number(app.priceProposal || 0))}
                  </div>
                  <div>
                    <strong>Status:</strong> {app.status}
                  </div>

                  {isPending && isMine && (
                    <div style={{ marginTop: 8 }}>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleWithdraw(app.applicationId)}
                      >
                        Withdraw
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>You haven't applied to any rakets yet.</p>
        )}
      </section>
    </div>
  );
}

export default Applications;
