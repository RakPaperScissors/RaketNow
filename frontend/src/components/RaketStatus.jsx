// ############################################################
// ASSIGNED RAKETS STATUS COMPONENT
// ############################################################

import React, { useState } from "react";
import { ListFilter, MessageCircle } from "lucide-react";
import { useEffect, useCallback } from "react";
import {
  updateRaketStatus,
  fetchAssignedRakets,
  requestCompletion,
  cancelCompletionRequest,
  deleteRaketById,
  cancelOngoingRaket,
  cancelOpenRaket,
  rejectCompletionRequest,
  withdrawFromRaket,
} from "../api/rakets";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
// import { Star } from "lucide-react";
import StarRating from "../components/Rating";

// const StarRating = ({ count }) => (
//   <div className="flex space-x-1">
//     {Array(count)
//       .fill(0)
//       .map((_, i) => (
//         <span key={i} className="text-yellow-400 text-xl">★</span>
//       ))}
//   </div>
// );

const statusMap = {
  open: "Pending",
  in_progress: "Ongoing",
  pending_confirmation: "Ongoing", // treat this same as in_progress
  completed: "Completed",
  cancelled: "Completed", // show this in Completed list with a tag
};

const mapStatusToLabel = (status) => statusMap[status] || "Other";
const getStatusStyle = (label) => {
  switch (label) {
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Ongoing":
      return "bg-blue-100 text-blue-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const formatDateTime = (timestamp) => {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { formattedDate, formattedTime };
};

const RaketStatus = () => {
  // const [rakets, setRakets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const currentUser = useCurrentUser();
  const [rakets, setRakets] = useState([]);
  const [assignedRakets, setAssignedRakets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();
  const statuses = ["All", "Completed", "Ongoing"];

  // for fetching data
  const fetchRaketsData = useCallback(async () => {
    try {
      const rakets = await fetchAssignedRakets();
      setAssignedRakets(rakets);
      return rakets;
      // const assignedRaketsData = await fetchAssignedRakets();
      // setAssignedRakets(assignedRaketsData);
    } catch (err) {
      console.error("Error fetching assigned rakets:", err);
      setError("Failed to fetch assigned rakets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRaketsData();
  }, [fetchRaketsData]);

  // raket button functions (CRUD)
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

  // const handleClientConfirmCompleted = async (raketId) => {
  //     try {
  //     setUpdatingId(raketId);
  //     await updateRaketStatus(raketId, "completed");
  //     await fetchRaketsData();
  //     } catch (err) {
  //     console.error("Failed to confirm completion:", err);
  //     alert("Something went wrong. Try again.");
  //     } finally {
  //     setUpdatingId(null);
  //     }
  // };

  // const handleDelete = async (raketId) => {
  //   const confirmDelete = confirm("Are you sure you want to permanently delete this raket?");
  //   if (!confirmDelete) return;

  //   try {
  //     await deleteRaketById(raketId);
  //     setRakets(prev => prev.filter(r => r.id !== raketId));
  //   } catch (err) {
  //     console.error("Failed to delete raket:", err);
  //     alert("Something went wrong while deleting.");
  //   }
  // };

  // const handleCancel = async (raketId) => {
  //     const confirmCancel = window.confirm("Are you sure you want to cancel this ongoing raket?");
  //     if (!confirmCancel) return;

  //     try {
  //     setUpdatingId(raketId);
  //     await cancelOngoingRaket(raketId);
  //     await fetchRaketsData();
  //     } catch (err) {
  //     console.error("Failed to cancel raket:", err);
  //     alert("Failed to cancel raket. Please try again.");
  //     } finally {
  //     setUpdatingId(null);
  //     }
  // };

  // const handleCancelOpen = async (raketId) => {
  //   const confirmCancel = confirm("Cancel this open raket? Applicants will be notified.");
  //   if (!confirmCancel) return;

  //   try {
  //     await cancelOpenRaket(raketId);
  //     setRakets(prev => prev.filter(r => r.id !== raketId));
  //     await fetchRaketsData();
  //   } catch (err) {
  //     console.error("Failed to cancel raket:", err);
  //     alert("Something went wrong while cancelling.");
  //   }
  // };

  // const handleRejectCompletionRequest = async (raketId) => {
  //     const confirmReject = window.confirm("Are you sure you want to reject the completion request?");
  //     if (!confirmReject) return;

  //     try {
  //     setUpdatingId(raketId);
  //     await rejectCompletionRequest(raketId);
  //     await fetchRaketsData();
  //     } catch (err) {
  //     console.error("Failed to reject completion request:", err);
  //     alert("Something went wrong. Try again.");
  //     } finally {
  //     setUpdatingId(null);
  //     }
  // };

  const handleWithdraw = async (raketId) => {
    const confirm = window.confirm(
      "Are you sure you want to withdraw? The raket will return to open status."
    );
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
  // format
  const formatStatus = (status) =>
    status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const filteredRakets =
    statusFilter === "All"
      ? assignedRakets
      : assignedRakets.filter(
          (r) => mapStatusToLabel(r.status) === statusFilter
        );

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setShowDropdown(false);
  };

  const handleRate = (id, rating) => {
    setRakets((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating, status: "Completed" } : r))
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      {/* Title + Filters inline */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-[#0C2C57]">Assigned Rakets</h1>

        {/* Filters Section (moved here) */}
        <div className="flex items-center gap-3">
          {statusFilter !== "All" && (
            <button
              onClick={() => setStatusFilter("All")}
              className="text-sm text-red-500 hover:bg-gray-100 px-4 py-2 rounded-full"
            >
              Clear Filter
            </button>
          )}

          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white text-sm text-[#0C2C57] hover:bg-gray-100 transition"
            >
              <ListFilter className="w-4 h-4" />
              Filters
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1 text-sm text-gray-700">
                  {statuses.map((status) => (
                    <li key={status}>
                      <button
                        onClick={() => {
                          setStatusFilter(status);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          statusFilter === status
                            ? "bg-gray-100 font-semibold"
                            : ""
                        }`}
                      >
                        {status}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Raket Cards */}
      {currentUser?.type === "Raketista" && (
        <div>
          {loading ? (
            <p className="text-gray-500">Loading assigned rakets...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : assignedRakets.length === 0 ? (
            <p className="text-gray-500">
              No rakets have been assigned to you yet.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredRakets.map((raket) => {
                return (
                  <div
                    key={raket.raketId}
                    className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
                  >
                    {/* Title + Status */}
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold text-[#0C2C57]">
                        {raket.title}
                      </h2>
                      <p
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          mapStatusToLabel(raket.status)
                        )}`}
                      >
                        {mapStatusToLabel(raket.status)}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      Client: {raket.clientName || "Unknown"}
                    </p>

                    <div className="border-b border-gray-200 mb-3" />

                    {/* Job Description */}
                    <p className="text-gray-700 text-sm mb-4">
                      {raket.description || ""}
                    </p>

                    {/* Actions / Rating depending on status */}
                    {raket.status === "in_progress" && (
                      <div className="mt-3 flex justify-end items-center space-x-3">
                        <button
                          onClick={() => handleMarkCompleted(raket.raketId)}
                          className="bg-[#0C2C57] text-white px-4 py-2 rounded-md hover:bg-[#123870] transition text-sm"
                          disabled={updatingId === raket.raketId}
                        >
                          {updatingId === raket.raketId
                            ? "Processing..."
                            : "Mark as Completed"}
                        </button>
                        <button
                          onClick={() => handleWithdraw(raket.raketId)}
                          className="bg-[#ff7c2b] text-white px-4 py-2 rounded-md hover:bg-[#ff914d] transition text-sm"
                          disabled={updatingId === raket.raketId}
                        >
                          Withdraw
                        </button>
                      </div>
                    )}

                    {raket.status === "pending_confirmation" && (
                      <div className="mt-3 flex justify-end items-center space-x-3">
                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-md text-sm">
                          Pending Client Confirmation
                        </span>
                        <button
                          onClick={() =>
                            handleCancelConfirmation(raket.raketId)
                          }
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm"
                          disabled={updatingId === raket.raketId}
                        >
                          {updatingId === raket.raketId
                            ? "Processing..."
                            : "Cancel Request"}
                        </button>
                      </div>
                    )}

                    {/* completed */}
                    {raket.status === "completed" &&
                      (raket.rating ? (
                        <div className="mt-3 flex justify-end items-center gap-2">
                          <span className="text-sm text-gray-600">Rating:</span>
                          <StarRating
                            initialRating={raket.rating}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        currentUser?.type === "Users" && (
                          <StarRating
                            raketId={raket.raketId}
                            initialRating={0}
                            alreadyRated={false}
                          />
                        )
                      ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RaketStatus;
