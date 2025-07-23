import React, { useState, useEffect } from "react";

const mockNotifications = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    message: "Juan Dela Cruz has applied to your raket",
    timestamp: "July 22, 2025",
    profilePic: "https://i.pravatar.cc/150?img=1",
    status: "Unread",
  },
  {
    id: 2,
    name: "Jane Smith",
    message: "Jane Smith has sent you a message",
    timestamp: "July 21, 2025",
    profilePic: "https://i.pravatar.cc/150?img=2",
    status: "Read",
  },
  {
    id: 3,
    name: "System",
    message: "Your profile was successfully verified",
    timestamp: "July 20, 2025",
    profilePic: "https://i.pravatar.cc/150?img=3",
    status: "Read",
  },
];

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("Unread");

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const filtered = notifications.filter((n) =>
    activeTab === "All" ? true : n.status === activeTab
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0C2C57]">Notifications</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["Unread", "Read", "All"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-[#FF7C2B] text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No {activeTab.toLowerCase()} notifications.
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg shadow flex space-x-4 items-start transition ${
                notif.status === "Unread"
                  ? "bg-[#F4F7FE] border border-blue-200"
                  : "bg-white"
              }`}
            >
              {/* Profile Picture */}
              <img
                src={notif.profilePic}
                alt={notif.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Content */}
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    notif.status === "Unread" ? "text-[#0C2C57]" : "text-gray-800"
                  }`}
                >
                  {notif.name}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                   {notif.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
              </div>

              {/* Badge */}
              {notif.status === "Unread" && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
                  Unread
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNotifications;
