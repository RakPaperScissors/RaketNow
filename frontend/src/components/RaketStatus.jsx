import React, { useState } from "react";
import { Star, MessageCircle, ListFilter } from "lucide-react";

const initialRakets = [
  {
    id: 1,
    title: "Logo Design for Startup",
    description: "Created a brand identity and logo design.",
    status: "Completed",
    date: "June 1, 2025",
    price: "₱3,500",
    rating: 4,
    author: "Sarah Lopez",
  },
  {
    id: 2,
    title: "Home Plumbing Repair",
    description: "Fixed kitchen sink leakage and replaced pipe.",
    status: "Ongoing",
    date: "July 15, 2025",
    price: "₱1,200",
    rating: 0,
    author: "Mark Dela Cruz",
  },
  {
    id: 3,
    title: "Private Math Tutoring",
    description: "Tutored Grade 10 student for quarterly exam.",
    status: "Pending",
    date: "July 20, 2025",
    price: "₱500",
    rating: 0,
    author: "Aimee Santos",
  },
];

const statuses = ["All", "Pending", "Ongoing", "Completed"];

const getStatusStyle = (status) => {
  switch (status) {
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

const StarRating = ({ value, onRate }) => (
  <div className="flex gap-1 mt-2">
    {[...Array(5)].map((_, i) => (
      <button key={i} onClick={() => onRate(i + 1)} type="button">
        <Star
          className={`w-5 h-5 ${
            i < value ? "fill-yellow-400 text-yellow-400" : "stroke-yellow-400"
          }`}
        />
      </button>
    ))}
  </div>
);

const RaketStatus = () => {
  const [rakets, setRakets] = useState(initialRakets);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setRakets((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              rating: newStatus === "Completed" ? r.rating : 0,
            }
          : r
      )
    );
  };

  const handleRate = (id, rating) => {
    setRakets((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating, status: "Completed" } : r))
    );
  };

  const filteredRakets =
    statusFilter === "All"
      ? rakets
      : rakets.filter((r) => r.status === statusFilter);

  return (
    <div className="p-6">
      {/* Title and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-[#0C2C57]">Raket Status (Show if Client)</h1>
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
                        onClick={() => {
                          setStatusFilter(status);
                          setShowDropdown(false);
                        }}
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
              key={raket.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Title + Author + Message Icon */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-[#0C2C57]">{raket.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>by {raket.author}</span>
                  <button
                    title={`Message ${raket.author}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-b border-gray-200 mb-3" />

              {/* Star Rating (if Completed) */}
              {raket.status === "Completed" && raket.rating > 0 && (
                <div className="mb-2">
                  <StarRating value={raket.rating} onRate={() => {}} />
                </div>
              )}
              {raket.status === "Completed" && raket.rating === 0 && (
                <div className="mb-2">
                  <StarRating value={0} onRate={(rating) => handleRate(raket.id, rating)} />
                </div>
              )}

              {/* Description and Date */}
              <p className="text-gray-700 text-sm mb-1">{raket.description}</p>
              <div className="text-sm text-gray-500 mb-2">{raket.date}</div>

              {/* Price + Status */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-[#FF7C2B] font-semibold">{raket.price}</p>
                <select
                  value={raket.status}
                  onChange={(e) => handleStatusChange(raket.id, e.target.value)}
                  className={`text-sm rounded-full px-3 py-1 font-medium border ${getStatusStyle(
                    raket.status
                  )}`}
                >
                  {statuses
                    .filter((s) => s !== "All")
                    .map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RaketStatus;
