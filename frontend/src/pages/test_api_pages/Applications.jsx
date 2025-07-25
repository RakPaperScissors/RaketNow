import { useState } from "react";
import { useRaketApplications } from '../../hooks/useRaketApplications';
import { acceptApplication, rejectApplication } from '../../api/notifications';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import DebugPanel from "../../components/DebugPanel"; 

function Applications() {
  const { raketApplications: applications, loading, error, refetch: refresh } = useRaketApplications();
  const currentUser = useCurrentUser();
  const [actionLoading, setActionLoading] = useState(false);

  const handleAccept = async (id) => {
    setActionLoading(true);
    const token = localStorage.getItem("access_token");
    await acceptApplication(id, token);
    refresh();
    setActionLoading(false);
  };

  const handleReject = async (id) => {
    setActionLoading(true);
    const token = localStorage.getItem("access_token");
    await rejectApplication(id, token);
    refresh();
    setActionLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <DebugPanel user={currentUser} />
      <h2>Raket Applications</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : applications && applications.length > 0 ? (
        <ul>
          {applications.map(app => (
            <li key={app.applicationId} style={{ marginBottom: 16 }}>
              <div>
                <strong>Raket:</strong> {app.raket?.title || "No title"}
              </div>
              <div>
                <strong>Raketista:</strong> {app.raketista?.name || "Unknown"}
              </div>
              <div>
                <strong>Proposal:</strong> Php {app.priceProposal}
              </div>
              <div>
                <strong>Status:</strong> {app.status}
              </div>
              {app.status === "pending" && currentUser?.uid === app.raket?.user?.uid && (
                <>
                  <button disabled={actionLoading} onClick={() => handleAccept(app.applicationId)}>
                    Accept
                  </button>
                  <button disabled={actionLoading} onClick={() => handleReject(app.applicationId)}>
                    Reject
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}

export default Applications;