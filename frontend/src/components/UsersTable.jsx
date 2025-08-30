import React, { useState } from "react";
import {
  Trash2,
  Filter,
  Search,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Eye,
} from "lucide-react";
import { useUsers } from "../hooks/useAdmin";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const { users, loading: userLoading, error: userError } = useUsers();
  // const { handleDelete, loading: deleteLoading, error: errorLoading, success } = useDeleteUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  // const [deleteTarget, setDeleteTarget] = useState(null); // user to delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileTarget, setProfileTarget] = useState(null);

  // const handleDelete = (id) => {
  //   // setUsers((prev) => prev.filter((u) => u.id !== id));
  //   closeModal();
  // };

  const viewProfile = (user) => {
    setProfileTarget(user);
  };

  const closeProfileModal = () => {
    setProfileTarget(null);
  }

  const openModal = (user) => {
    setDeleteTarget(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setDeleteTarget(null);
    setIsModalOpen(false);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (userLoading) return <LoadingSpinner />;
  if (userError) return <p className="text-red-600">Error loading users.</p>;

  let filteredUsers = users || [];
  if (sortOption === "client")
    filteredUsers = filteredUsers.filter((u) => u.role === "client");
  if (sortOption === "raketista")
    filteredUsers = filteredUsers.filter((u) => u.role === "raketista");
  if (sortOption === "organization")
    filteredUsers = filteredUsers.filter((u) => u.role === "organization");
  if (sortOption === "newest")
    filteredUsers = [...filteredUsers].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  if (sortOption === "oldest")
    filteredUsers = [...filteredUsers].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

  filteredUsers = filteredUsers.filter((user) => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      const email = user.email || "";
      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  );

  return (
    <div>
      {/* TOP BARS: SEARCH AND FILTERZ */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-semibold text-[#0c2c57]">
          User Management
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          {/* SEARCH BAR */}
          <div className="relative w-[200px] sm:w-[250px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 text-sm rounded-full focus:ring-1 focus:ring-[#ff7c2b] focus:outline-none transition duration-200"
            />
          </div>

          {/* SORT/FILTER */}
          <div className="relative w-[180px]">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="appearance-none w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#ff7c2b]/50 transition"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="client">Filter: Client</option>
              <option value="raketista">Filter: Raketista</option>
              <option value="organization">Filter: Organization</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* actual TABLE */}
      <div className="overflow-x-auto bg-white shadow border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#0c2c57] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.type === "Organization" 
                    ? user.orgName 
                    : `${user.firstName || ""} ${user.lastName || ""}`
                  }
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      user.type === "Users"
                        ? "bg-[#ff7c2b]/10 text-[#ff7c2b]"
                        : user.type === "Raketista"
                        ? "bg-blue-100 text-blue-600"
                        : user.type === "Organization"
                        ? "bg-purple-100 text-purple-600"
                        : user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role === "admin"
                    ? "Admin"
                    : user.type === "Users"
                    ? "Client"
                    : user.type === "raketista"
                    ? "Raketista"
                    : user.type === "organization"
                    ? "Org"
                    : user.type}
                  </span>
                  {user.roles.includes("client") && user.roles.includes("raketista") && (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-500">
                      Was Client
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    {/* <button
                      onClick={() => openModal(user)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button> */}
                    <button
                      onClick={() => viewProfile(user)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Eye className="h-5 w-5"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal
      {isModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="flex items-center gap-2 text-[#0c2c57] mb-3">
              <AlertTriangle className="h-5 w-5 text-[#ff7c2b]" />
              <h2 className="text-lg font-semibold">Delete Confirmation</h2>
            </div>
            <p className="text-sm text-gray-700 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deleteTarget.type === "Organization"
                ? deleteTarget.orgName
                : `${deleteTarget.firstName || ""} ${deleteTarget.lastName || ""}`}
              </span>
              ? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              >
                <XCircle className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDelete(deleteTarget.uid || deleteTarget.id);
                  closeModal();
                }}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
                {deleteLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Profile Modal */}
      {profileTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            {/* Header */}
            <h2 className="text-lg font-semibold mb-4 text-[#0c2c57] border-b pb-3">
              User Profile
            </h2>

            {/* Profile Info */}
            <div className="space-y-3">
              <p><span className="font-semibold text-gray-900">Name:</span>{" "} 
                {profileTarget.firstName} {profileTarget.lastName}
              </p>
            </div>
            
            {profileTarget.type === "Organization" && (
              <p>
                <span className="font-semibold text-gray-900">
                  Organization Name:
                </span> {" "}
                {profileTarget.orgName}
              </p>
            )}


            <p>
              <span className="font-semibold text-gray-900">Email:</span>{" "} 
              {profileTarget.email}
            </p>
            
            {/* Roles Section */}
            <div>
              <span className="font-semibold text-gray-900">Roles:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileTarget.roles?.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 text-xs font-medium rounded-full 
                                bg-blue-100 text-blue-600"
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                  ))}

                  {/* Example "Was Client" badge if they switched */}
                  {profileTarget.roles.includes("client") &&
                    profileTarget.roles.includes("raketista") && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full 
                                      bg-gray-200 text-gray-600">
                        Was Client
                      </span>
                    )}
                </div>
            </div>

            <p>
              <span className="font-semibold text-gray-900">Joined:</span>{" "} 
              {new Date(profileTarget.createdAt).toLocaleDateString()}
            </p>

             {/* Footer */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeProfileModal}
                  className="px-5 py-2 text-sm font-medium bg-gray-100 
                            rounded-full hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTable;
