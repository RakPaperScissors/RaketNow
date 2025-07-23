import React, { useState, useEffect, useRef } from "react";
import { SendHorizontal, Image as ImageIcon, ArrowLeft } from "lucide-react";

const messagesData = [
  {
    id: 1,
    name: "Jungkook",
    message: "Kelan ka available?",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    online: true,
    replies: [
      { id: 1, fromMe: true, text: "Hi! Interested po kayo?" },
      { id: 2, fromMe: false, text: "Yes! Kelan ka available?" },
      { id: 3, fromMe: true, text: "Free ako this weekend." },
    ],
  },
  {
    id: 2,
    name: "Jimin",
    message: "Thank you po!",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    online: false,
    replies: [],
  },
];

export default function Messaging() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showChatPanel, setShowChatPanel] = useState(false); // 👈 Mobile-only logic
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selected]);

  const handleSelectMessage = (msg) => {
    setSelected(msg);
    if (window.innerWidth < 768) {
      setShowChatPanel(true); // Show chat panel only on mobile
    }
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 min-h-[calc(100vh-5rem)] bg-[#f9fafb]">
      {/* Message List */}
      <div
        className={`w-full md:w-1/3 bg-white rounded-2xl shadow p-4 flex flex-col h-[calc(100vh-7rem)] ${
          showChatPanel ? "hidden md:flex" : "flex"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">Messages</h2>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <div className="overflow-y-auto flex-1">
          {messagesData
            .filter((msg) =>
              msg.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors mb-2 hover:bg-gray-100 ${
                  selected?.id === msg.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {msg.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{msg.name}</p>
                  <p className="text-xs text-gray-500 truncate w-40">{msg.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Panel */}
      {selected && (
        <div
          className={`w-full md:w-2/3 bg-white rounded-2xl shadow flex flex-col h-[calc(100vh-7rem)] ${
            showChatPanel ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Header with back button on mobile */}
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <button
              className="md:hidden text-gray-500"
              onClick={() => setShowChatPanel(false)}
            >
              <ArrowLeft size={20} />
            </button>
            <img
              src={selected.avatar}
              alt={selected.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{selected.name}</p>
              {selected.online && (
                <p className="text-xs text-green-500">Online</p>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 bg-[#f3f4f6]">
            {selected.replies.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                  msg.fromMe
                    ? "ml-auto bg-[#0C2C57] text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-2">
            <button className="text-gray-500 hover:text-gray-700">
              <ImageIcon size={20} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <button
              className="bg-[#FF7C2B] hover:bg-orange-600 text-white p-2 rounded-full"
              onClick={() => {
                if (!message.trim()) return;
                const updated = {
                  ...selected,
                  replies: [
                    ...selected.replies,
                    { id: Date.now(), fromMe: true, text: message },
                  ],
                };
                setSelected(updated);
                setMessage("");
                scrollToBottom();
              }}
            >
              <SendHorizontal size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
