import { acceptApplication as acceptAppApi, rejectApplication as rejectAppApi } from "../../api/notifications";
import { useNotifications } from "../../hooks/useNotifications";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DebugPanel from "../../components/DebugPanel"; 

function Notifications() {
  const { notifications, loading, error } = useNotifications();
  const currentUser = useCurrentUser();

  const userNotifications = notifications;
  
  const handleAccept = async (id) => {
    const token = localStorage.getItem("access_token");
    await acceptAppApi(id, token);
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("access_token");
    await rejectAppApi(id, token);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <DebugPanel user={currentUser} />
      <h2>Notifications</h2>
      {loading ? (
        <div>Loading notifications...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : userNotifications && userNotifications.length > 0 ? (
        <ul>
          {userNotifications.map(n => (
            <li key={n.id}>
              {n.message}
              {n.actionable && n.raketApplication && (
                <>
                  <button onClick={() => handleAccept(n.raketApplication.applicationId)}>Accept</button>
                  <button onClick={() => handleReject(n.raketApplication.applicationId)}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
}

export default Notifications;