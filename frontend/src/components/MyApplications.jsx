// ############################################################
// SUBMITTED APPLICATIONS COMPONENT
// ############################################################

import { useState } from "react";
import { withdrawMyApplication } from "../api/rakets";
import { useMyRaketApplications } from "../hooks/useMyRaketApplications";
import { useCurrentUser } from "../hooks/useCurrentUser";

const formatPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

function MyApplications() {
  const currentUser = useCurrentUser();
  const {
    apps: myApplications,
    loading,
    error,
    refetch,
  } = useMyRaketApplications();
  const [actionLoading, setActionLoading] = useState(false);

  const handleWithdraw = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw your application?"
    );
    if (!confirmed) return;

    try {
      setActionLoading(true);
      await withdrawMyApplication(id);
      await refetch?.();
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to withdraw application");
    } finally {
      setActionLoading(false);
    }
  };

  if (currentUser?.role === "client") return null; // hides if client

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-[#0C2C57]">
          Submitted Applications
        </h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : myApplications && myApplications.length > 0 ? (
        <div className="space-y-6">
          {myApplications.map((app) => (
            <div
              key={app.applicationId}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col gap-2">
                {/* Title */}
                <div className="text-lg font-semibold text-[#0C2C57]">
                  {app.raket?.title || "No title"}
                </div>

                {/* Divider below title */}
                <div className="border-b border-gray-200 mb-2" />

                {/* Client */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Client:</span>{" "}
                  {app.raket?.user?.firstName} {app.raket?.user?.lastName || ""}
                </div>

                {/* Budget + Withdraw (if pending) */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    <span className="font-medium">Budget:</span> PHP{" "}
                    {app.raket?.budget || 0}
                  </span>
                  {app.status?.toUpperCase() === "PENDING" && (
                    <button
                      disabled={actionLoading}
                      onClick={() => handleWithdraw(app.applicationId)}
                      className="bg-[#ff7c2b] text-white text-sm px-4 py-2 rounded-md hover:bg-[#ff914d]"
                    >
                      Withdraw
                    </button>
                  )}
                </div>

                {/* Status */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Application Status:</span>{" "}
                  <span
                    className={`px-4 py-2 rounded-md text-sm ${
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
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          You haven't applied to any rakets yet.
        </p>
      )}
    </div>
  );
}

export default MyApplications;
