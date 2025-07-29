import React, { useState, useEffect, useRef } from "react";
import { SendHorizontal, Image as ImageIcon, ArrowLeft } from "lucide-react";

// sample lang sa messages and unsaon sya pag gawas
const messagesData = [
  {
    id: 1,
    name: "Gordon Ramsay",
    message: "Just sent you the design files...",
    avatar: "https://randomuser.me/api/portraits/lego/8.jpg",
    online: true,
    replies: [
      {
        id: 1,
        fromMe: false,
        text: "This isn't a pizza, this is a mistake. This is an Italian tragedy.",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        fromMe: true,
        text: "Sorry chef. I’ll fix it right away.",
        timestamp: "10:45 AM",
      },
      {
        id: 3,
        fromMe: false,
        text: "Ikaw nanaman?! Ikaw nanaman!? Sino ka ba!? 니가 알아서 한다고요? 그게 무슨 말이야? 당신 누구야? 어, 나 한국어 너무 잘하거든요.",
        timestamp: "11:15 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Jeon Jungkook",
    message: "Can we schedule a meeting for...",
    avatar: "https://randomuser.me/api/portraits/lego/3.jpg",
    online: false,
    replies: [],
  },
];

function Message() {
  const [messages, setMessages] = useState(messagesData);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showChatPanel, setShowChatPanel] = useState(false);
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
      setShowChatPanel(true);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const updatedMessages = messages.map((m) =>
      m.id === selected.id
        ? {
            ...m,
            replies: [
              ...m.replies,
              {
                id: Date.now(),
                fromMe: true,
                text: message,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
          }
        : m
    );
    setMessages(updatedMessages);
    setSelected(updatedMessages.find((m) => m.id === selected.id));
    setMessage("");
    scrollToBottom();
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 min-h-[calc(100vh-5rem)] bg-[#f9fafb]">
      {/* MESSAGE LIST! */}
      <div
        className={`w-full md:w-1/3 bg-white rounded-2xl shadow p-4 flex flex-col h-[calc(100vh-7rem)] ${
          showChatPanel ? "hidden md:flex" : "flex"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2 text-[#0C2C57]">Messages</h2>
        {/* SEARCH BAR SA MESSAGES PERO PWEDE PD SEARCH USER NLNG */}
        <input
          type="text"
          placeholder="Search messages"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF7C2B]"
        />
        <div className="overflow-y-auto flex-1">
          {messages
            .filter((msg) =>
              msg.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((msg) => (
              // if selected si user
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all mb-2 rounded-md ${
                  selected?.id === msg.id
                    ? "bg-[#FFF6F2] border-l-4 border-[#FF7C2B]"
                    : "hover:bg-gray-100"
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
                  <p className="text-xs text-gray-500 truncate w-40">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* CHATS */}
      <div
        className={`w-full md:w-2/3 bg-white rounded-2xl shadow flex flex-col h-[calc(100vh-7rem)] ${
          selected && showChatPanel
            ? "flex"
            : selected
            ? "hidden md:flex"
            : "hidden"
        }`}
      >
        {selected ? (
          <>
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
                  <p className="font-medium text-xs text-[#ff7c2b]">Online</p>
                )}
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 bg-[#f3f4f6]">
              {selected.replies.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                    msg.fromMe
                      ? "ml-auto bg-[#FF7C2B] text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[10px] text-right text-gray-400">
                    {msg.timestamp}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT / MESSAGING NA  */}
            <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-700">
                <ImageIcon size={20} />
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF7C2B]"
              />
              <button
                className="bg-[#FF7C2B] hover:bg-orange-600 text-white p-2 rounded-full"
                onClick={handleSendMessage}
              >
                <SendHorizontal size={20} />
              </button>
            </div>
          </>
        ) : (
          // random rani
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a user to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
