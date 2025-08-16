import { useState } from "react";
import { withdrawMyApplication } from "../api/rakets";
import { useRaketApplications } from "../hooks/useRaketApplications";
import { useMyRaketApplications } from "../hooks/useMyRaketApplications";
import { acceptApplication, rejectApplication } from "../api/notifications";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useParams, useNavigate } from "react-router-dom";
import DebugPanel from "../components/DebugPanel";

// money formatting
const formatPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

function Applications() {
  const { raketId } = useParams();
  const numericRaketId = Number(raketId);
  const {
    raketApplications: applications,
    loading,
    error,
    refetch: refresh,
  } = useRaketApplications(numericRaketId);
  const {
    apps: myApplications,
    loading: myLoading,
    error: myError,
    refetch: refreshMine,
  } = useMyRaketApplications();
  const currentUser = useCurrentUser();
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  if (isNaN(numericRaketId) || numericRaketId <= 0) {
    return <p className="text-center text-red-500 mt-6">Invalid Raket ID.</p>;
  }

  const handleAccept = async (id) => {
    try {
      setActionLoading(true);
      await acceptApplication(id);
      await refresh();
      setTimeout(() => {
        navigate("/message");
      }, 200);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(true);
      await rejectApplication(id);
      await refresh();
    } finally {
      setActionLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw your application?"
    );
    if (!confirmed) return;

    try {
      setActionLoading(true);
      await withdrawMyApplication(id);
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

  const myRaketApps = applications || [];

  const pendingApps = applications.filter((app) => app.status === "PENDING");

  const otherApps = myRaketApps.filter(
    (app) => app.status?.toUpperCase() !== "PENDING"
  );

  const raketTitle = applications?.[0]?.raket?.title || "Raket";

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-[#0C2C57]">
          Application to {raketTitle}
        </h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : applications && applications.length > 0 ? (
        <>
          {pendingApps?.length > 0 && (
            <>
              <h3 className="mt-4 mb-4 font-semibold text-[#0c2c57]">
                Pending Applications
              </h3>
              <div className="space-y-6">
                {pendingApps.map((app) => {
                  const raketistaName = renderRaketistaName(app.raketista);
                  const isOwner = currentUser?.uid === app.raket?.user?.uid;

                  return (
                    <div
                      key={app.applicationId}
                      className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition flex justify-between items-center"
                    >
                      {/* Left Info Section */}
                      <div className="flex flex-col gap-1">
                        <div className="text-lg font-semibold text-gray-800">
                          {app.raket?.title || "No title"}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Applicant:</span>{" "}
                          {raketistaName}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">
                            Application Status:
                          </span>{" "}
                          {app.status}
                        </div>
                      </div>

                      {/* Right Buttons Section */}
                      {isOwner && (
                        <div className="flex gap-2">
                          <button
                            disabled={actionLoading}
                            onClick={() => handleAccept(app.applicationId)}
                            className="bg-[#3d8f44] text-white px-4 py-2 rounded-xl hover:bg-green-600 transition disabled:opacity-50"
                          >
                            Accept
                          </button>
                          <button
                            disabled={actionLoading}
                            onClick={() => handleReject(app.applicationId)}
                            className="bg-[#dc143c] text-white px-4 py-2 rounded-xl hover:bg-red-600 transition disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {otherApps?.length > 0 && (
            <>
              <h3 className="mt-8 mb-4 font-semibold">Other Applications</h3>
              <div className="space-y-6">
                {otherApps.map((app) => {
                  const raketistaName = renderRaketistaName(app.raketista);

                  return (
                    <div
                      key={app.applicationId}
                      className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="text-lg font-semibold text-gray-800">
                          {app.raket?.title || "No title"}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Applicant:</span>{" "}
                          {raketistaName}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">
                            Application Status:
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              app.status === "ACCEPTED"
                                ? "bg-green-100 text-green-700"
                                : app.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No applications to your rakets.
        </p>
      )}
    </div>
  );
}

export default Applications;
