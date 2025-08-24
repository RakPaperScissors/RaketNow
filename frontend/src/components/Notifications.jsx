import React, { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { useNavigate } from "react-router-dom";
import System from "../assets/images/raketnow-logo.png";

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("Unread");
  const navigate = useNavigate();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(
          data.map((n) => ({
            id: n.id,
            name: "System",
            message: n.message,
            timestamp: new Date(n.createdAt).toLocaleDateString("en-PH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            profilePic: System,
            isRead: n.isRead,
            actionable: n.actionable,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    getNotifications();
  }, []);

  const filtered = notifications.filter((notif) => {
    if (activeTab === "Unread") return notif.isRead === false;
    if (activeTab === "Read") return notif.isRead === true;
    return true;
  });

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await fetch(`http://localhost:3000/notification/${notif.id}/read`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
        );
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
    navigate("/my-rakets");
  };

  return (
    <div className="p-4">
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
                ? "bg-[#FF7C2B] text-white shadow-md"
                : "bg-gray-100 text-gray-600 shadow-md hover:bg-gray-200"
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
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 rounded-lg shadow flex space-x-4 items-start transition ${
                !notif.isRead
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
                    !notif.isRead ? "text-[#0C2C57]" : "text-gray-800"
                  }`}
                >
                  {notif.name}
                </p>
                <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
              </div>

              {/* Badge */}
              {!notif.isRead && (
                <span className="bg-orange-100 text-[#ff7c2b] text-xs px-2 py-0.5 rounded-full font-medium">
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
