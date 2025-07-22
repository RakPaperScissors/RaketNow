import React, { useEffect, useState } from "react";
import { ListFilter, MessageCircle } from "lucide-react";

// to be replaced
const mockMyRakets = [
  {
    id: 1,
    title: "E-commerce Website Redesign",
    description: "Redesigned UI/UX of an e-commerce platform.",
    status: "Completed",
    date: "June 15, 2024",
    price: "₱15,000",
    rating: 5,
    author: "John Doe",
  },
  {
    id: 2,
    title: "React.js Dashboard Development",
    description: "Developed an admin dashboard with data visualization.",
    status: "Ongoing",
    date: "July 10, 2025",
    price: "₱22,500",
    rating: 4,
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Mobile App UI Design",
    description: "Designed UI for a mobile fitness app.",
    status: "Pending",
    date: "July 22, 2025",
    price: "₱8,500",
    author: "Alex Cruz",
  },
];

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

const StarRating = ({ count }) => (
  <div className="flex space-x-1">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">★</span> 
      ))}
  </div>
);


const UserRakets = () => {
  const [rakets, setRakets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setRakets(mockMyRakets);
  }, []);

  const filteredRakets =
    statusFilter === "All"
      ? rakets
      : rakets.filter((r) => r.status === statusFilter);

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
    {raket.status === "Completed" && raket.rating && (
      <div className="mb-2">
        <StarRating count={raket.rating} />
      </div>
    )}

    {/* Description and Date */}
    <p className="text-gray-700 text-sm mb-1">{raket.description}</p>
    <div className="text-sm text-gray-500 mb-2">{raket.date}</div>

    {/* Price + Status */}
    <div className="flex justify-between items-center mt-3">
      <p className="text-[#FF7C2B] font-semibold">{raket.price}</p>
      <span
        className={`text-sm px-2 py-1 rounded-full font-medium ${getStatusStyle(
          raket.status
        )}`}
      >
        {raket.status}
      </span>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default UserRakets;
