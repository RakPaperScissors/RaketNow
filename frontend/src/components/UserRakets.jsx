import React from "react";
import { ListFilter, MessageCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { fetchMyRakets, updateRaketStatus, fetchAssignedRakets, requestCompletion, cancelCompletionRequest, deleteRaketById, cancelOngoingRaket, cancelOpenRaket, rejectCompletionRequest, withdrawFromRaket  } from "../api/rakets";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { submitRating } from "../api/ratings";
import DebugPanel from "../components/DebugPanel";
import Modal from "../components/RateModal";

const StarRating = ({ count }) => (
  <div className="flex space-x-1">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">★</span> 
      ))}
  </div>
);

const statusMap = {
  open: "Pending",
  in_progress: "Ongoing",
  pending_confirmation: "Ongoing",
  completed: "Completed",
  cancelled: "Completed",
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


const UserRakets = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const currentUser = useCurrentUser();
  const [rakets, setRakets] = useState([]);
  const [assignedRakets, setAssignedRakets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRaket, setSelectedRaket] = useState(null);
    
  // for fetching data
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
  
      // const handleMarkCompleted = async (raketId) => {
      //     try {
      //     setUpdatingId(raketId);
      //     await requestCompletion(raketId);
      //     await fetchRaketsData();
      //     } catch (err) {
      //     console.error("Failed to mark as completed:", err);
      //     alert("Something went wrong. Try again.");
      //     } finally {
      //     setUpdatingId(null);
      //     }
      // };
  
      // const handleCancelConfirmation = async (raketId) => {
      //     try {
      //     setUpdatingId(raketId);
      //     await cancelCompletionRequest(raketId);
      //     await fetchRaketsData();
      //     } catch (err) {
      //     console.error("Failed to cancel confirmation:", err);
      //     alert("Something went wrong. Try again.");
      //     } finally {
      //     setUpdatingId(null);
      //     }
      // };
  
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
  
      const handleDelete = async (raketId) => {
        const confirmDelete = confirm("Are you sure you want to permanently delete this raket?");
        if (!confirmDelete) return;

        try {
          await deleteRaketById(raketId);
          setRakets(prev => prev.filter(r => r.id !== raketId));
        } catch (err) {
          console.error("Failed to delete raket:", err);
          alert("Something went wrong while deleting.");
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

      const handleCancelOpen = async (raketId) => {
        const confirmCancel = confirm("Cancel this open raket? Applicants will be notified.");
        if (!confirmCancel) return;

        try {
          await cancelOpenRaket(raketId);
          setRakets(prev => prev.filter(r => r.id !== raketId));
          await fetchRaketsData();
        } catch (err) {
          console.error("Failed to cancel raket:", err);
          alert("Something went wrong while cancelling.");
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

      const handleRate = async (raket) => {
        if (!currentUser) {
          alert("You must be logged in to rate.");
          return;
        }

        try {
          const selectedScore = prompt("Enter your rating from 1 to 5:");
          if (!selectedScore || isNaN(selectedScore)) return;

          const score = parseInt(selectedScore);
          if (score < 1 || score > 5) {
            alert("Score must be between 1 and 5.");
            return;
          }

          await submitRating(currentUser.userId, raket.acceptedRaketista.userId, score);
          alert("Rating submitted!");
        } catch (err) {
          console.error("Rating failed:", err);
          alert("Failed to submit rating.");
        }
      };

  
      // const handleWithdraw = async (raketId) => {
      //     const confirm = window.confirm("Are you sure you want to withdraw? The raket will return to open status.");
      //     if (!confirm) return;
  
      //     try {
      //     setUpdatingId(raketId);
      //     await withdrawFromRaket(raketId);
      //     await fetchRaketsData();
      //     } catch (err) {
      //     console.error("Failed to withdraw:", err);
      //     alert("Failed to withdraw from raket.");
      //     } finally {
      //     setUpdatingId(null);
      //     }
      // };
      // format
      // const formatStatus = (status) =>
      //     status
      //     .replace(/_/g, " ")
      //     .replace(/\b\w/g, (c) => c.toUpperCase());

  // for filtering
  const filteredRakets =
  statusFilter === "All"
    ? rakets
    : rakets.filter((r) => mapStatusToLabel(r.status) === statusFilter);

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setShowDropdown(false);
  };

  const statuses = ["All", "Completed", "Ongoing", "Pending"];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-[#0C2C57]">My Rakets</h1>
      </div>

      {/* Filters Section */}
      <div className="bg-[#F9FAFB] p-4 rounded-md mb-6 relative">
        <div className="flex items-center gap-4 flex-wrap mb-3">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white text-sm text-[#0C2C57] hover:bg-gray-100 transition"
            >
              <ListFilter className="w-4 h-4" />
              Filters
            </button>

            {showDropdown && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1 text-sm text-gray-700">
                  {statuses.map((status) => (
                    <li key={status}>
                      <button
                        onClick={() => handleFilterChange(status)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          statusFilter === status ? "bg-gray-100 font-semibold" : ""
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

          {statusFilter !== "All" && (
            <button
              onClick={() => setStatusFilter("All")}
              className="text-sm text-red-500 hover:bg-gray-100 px-4 py-2 rounded-full"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Raket Cards */}
      {filteredRakets.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No rakets found.</p>
      ) : (
        <div className="space-y-4">
          {filteredRakets.map((raket) => (
            <div
              key={raket.raketId}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold text-[#0C2C57] mb-1">{raket.title}</h2>
              {/* RAKETISTA ASSIGNED */}
              {raket.acceptedRaketista && (
                <p>
                  Assigned to: {raket.acceptedRaketista.firstName}{" "}
                  {raket.acceptedRaketista.lastName}
                </p>
              )}

              <div className="border-b border-gray-200 mb-3" />

              {/* Description */}
              <p className="text-gray-700 text-sm mb-3">{raket.description}</p>
              <div className="text-sm text-gray-500 mb-2">{(() => {
                const { formattedDate, formattedTime } = formatDateTime(raket.dateCreated);
                return (
                  <div className="text-sm text-gray-500 mb-2">
                    <div>Date Posted: {formattedDate}</div>
                    <div>Time Posted: {formattedTime}</div>
                  </div>
                );
              })()}</div>

              {/* Budget + Status */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#FF7C2B] font-semibold">PHP {raket.budget}</span>

                {raket.status === "in_progress" && (
                <div className="flex items-center gap-2">
                  <select
                    value={raket.status}
                    onChange={(e) => handleStatusChange(raket.raketId, e.target.value)}
                    disabled={updatingId === raket.raketId}
                    className={`text-xs h-7 leading-none rounded-full px-2 font-medium border ${getStatusStyle(
                      mapStatusToLabel(raket.status)
                    )}`}
                  >
                    <option value="in_progress">Ongoing</option>
                    <option value="completed">Done</option>
                  </select>
                  <button
                    onClick={() => handleCancel(raket.raketId)}
                    disabled={updatingId === raket.raketId}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-md text-xs hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {raket.status === "pending_confirmation" && (
                <div className="flex gap-2 items-center">
                  <button
                    disabled={updatingId === raket.raketId}
                    onClick={() => handleClientConfirmCompleted(raket.raketId)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                  >
                    Confirm Completion
                  </button>
                  <button
                    disabled={updatingId === raket.raketId}
                    onClick={() => handleRejectCompletionRequest(raket.raketId)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Reject Completion
                  </button>
                </div>
              )}


                {/* COMPLETED */}
                {raket.status === "completed" && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs h-7 leading-none rounded-full px-2 font-medium border ${getStatusStyle(
                        mapStatusToLabel(raket.status)
                      )}`}
                    >
                      Completed
                    </span>
                    <button
                      className="text-xs px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      onClick={() => handleRate(raket)}
                    >
                      Rate
                    </button>
                  </div>
                )}
                {/* Action Buttons (for cancelled rakets) */}
                {raket.status === 'cancelled' && (
                  <div className="flex gap-2 items-center">
                    <span className="text-red-500 font-semibold">Cancelled</span>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(raket.raketId)}
                    >
                      Delete
                    </button>
                  </div>
                )}


                {/* Action Buttons (for open rakets) */}
                {raket.status === "open" && (
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => navigate(`/raket/${raket.raketId}/applications`)}
                      className="text-sm px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                      View Applications
                    </button>
                    <button
                      disabled={updatingId === raket.raketId}
                      onClick={() => handleCancelOpen(raket.raketId)}
                      className="text-sm px-2 py-1 rounded-full font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Withdraw
                    </button>
                  </div>
                )}

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
};

export default UserRakets;
