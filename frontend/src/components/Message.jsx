import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SendHorizontal, Image as ImageIcon, ArrowLeft, View, Plus } from "lucide-react";
import { useMessages } from "../hooks/useMessages";
import { useUser } from "../hooks/useUsers";
import JobInfoBanner from "../components/JobInfoBanner";
import ViewProfileLink from "./ViewProfileLink";
import LoadingSpinner from "./LoadingSpinner";
import BottomNav from "./BottomNav";
import { useLocation, useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "/default_profile.jpg";
const PICTURE_URL = import.meta.env.VITE_PICTURE_URL;
const USER_PROFILE_PIC_BASE_URL =
  `${PICTURE_URL}/raketnow/`; //recheck sa future

function Message() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: currentUser, loading: userLoading } = useUser();
  const {
    conversations,
    selectedConversation,
    messages,
    loading,
    error,
    isTyping,
    hasMoreMessages,
    selectConversation,
    loadMoreMessages,
    sendTextMessage,
    emitTyping,
    searchTerm,
    searchResults,
    searchLoading,
    searchError,
    handleSearch,
    startConversationWithUser,
  } = useMessages();

  const [messageInput, setMessageInput] = useState("");
  const [showChatPanel, setShowChatPanel] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // --- Utility Functions ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getOtherParticipant = useCallback(
    (conv) => {
      if (!currentUser || !conv?.participants) return null;
      // Find the participant whose UID is NOT the current user's UID
      return conv.participants.find((p) => p.uid !== currentUser.uid);
    },
    [currentUser]
  );

  const handleSelectConversation = (conv) => {
    selectConversation(conv);
    handleSearch(''); 
    if (window.innerWidth < 768) {
      setShowChatPanel(true);
    }
  };

  // EFFECTSSSSSSSSSSS
  useEffect(() => {
    if (selectedConversation && !loading) {
      scrollToBottom();
    }
  }, [messages, selectedConversation, loading]);

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
    if (selectedConversation) {
      if (e.target.value.length > 0) {
        emitTyping(true);
      } else {
        emitTyping(false);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation) return;

    await sendTextMessage(messageInput);
    setMessageInput("");
    emitTyping(false);
  };

  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      if (scrollTop < 100 && hasMoreMessages && !loading) {
        loadMoreMessages();
      }
    }
  }, [hasMoreMessages, loading, loadMoreMessages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // useEffect(() => {
  //   if (location.pathname === "/message") {
  //     setSelectedConversation(null);
  //   }
  // }, [location]);

  // --- Loading and Error States ---
  if (userLoading) {
    return (
      <div className="text-center p-4 min-h-screen flex items-center justify-center">
        Loading user data...
      </div>
    );
  }
  if (!currentUser) {
    return (
      <div className="text-center p-4 min-h-screen flex items-center justify-center">
        Please log in to view messages.
      </div>
    );
  }
  if (loading && conversations.length === 0 && !selectedConversation) {
    return (
      <LoadingSpinner  fullScreen/>
    );
  }
  if (error) {
    return (
      <div className="text-center p-4 text-red-500 min-h-screen flex items-center justify-center">
        Error: {error}
      </div>
    );
  }
  const findLastSeenMessageId = () => {
    if (!currentUser || !messages || messages.length === 0) return null;
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.sender.id === currentUser.uid && msg.readAt) {
        return msg.id; // Return the ID of this specific message
      }
    }
    return null;
  };

  const lastSeenMessageId = findLastSeenMessageId();

  const otherParticipant = getOtherParticipant(selectedConversation);

  return (
    <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 min-h-[calc(100vh-5rem)] bg-[#f9fafb]">
      {/* CONVERSATION LIST SIDEBAR */}
      <div
        className={`w-full md:w-1/3 bg-white rounded-2xl shadow p-6 flex flex-col h-[calc(100vh-5rem)] ${
          showChatPanel ? "hidden md:flex" : "flex"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2 text-[#0C2C57]">Messages</h2>
        <input
          type="text"
          placeholder="Search users to start a new chat"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF7C2B]"
        />
        {/* --- Search Results Display --- */}
        {searchTerm.trim() && (
            <div className="mb-4 border-b pb-2">
                {searchLoading ? (
                    <p className="text-center text-sm text-gray-500">Searching...</p>
                ) : searchError ? (
                    <p className="text-center text-sm text-red-500">{searchError}</p>
                ) : searchResults.length > 0 ? (
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-500 mb-1">Search Results:</p>
                        {searchResults.map(user => (
                            <div 
                                key={user.uid} 
                                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-blue-50 rounded-md"
                                onClick={() => startConversationWithUser(user.uid)}
                            >
                                <img 
                                    src={user.profilePicture
                                      ? `${USER_PROFILE_PIC_BASE_URL}${user.profilePicture}`
                                      : DEFAULT_AVATAR
                                    }
                                    onError={(e) => (e.target.src) = DEFAULT_AVATAR}
                                    alt={user.firstName} 
                                    className="w-8 h-8 rounded-full object-cover" 
                                />
                                <div className="flex-1 text-sm font-medium">{user.firstName} {user.lastName}</div>
                                <Plus size={16} className="text-gray-500" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-sm text-gray-500">No users found.</p>
                )}
            </div>
        )}
        
                {/* Existing Conversations List */}
        <div className="overflow-y-auto flex-1">
          <p className="text-xs font-semibold text-gray-500 mb-2">Your Conversations:</p>
          {conversations.length === 0 && !searchLoading ? ( // Only show if no convos AND not searching
            <p className="p-4 text-gray-500">No conversations yet. Start one by searching a user!</p>
          ) : (
            conversations
              .map((conv) => {
                const otherParticipant = getOtherParticipant(conv);
                const otherParticipantProfilePic = otherParticipant?.profilePicture 
                    ? `${USER_PROFILE_PIC_BASE_URL}${otherParticipant.profilePicture}`
                    : DEFAULT_AVATAR;
                return (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`flex items-center gap-3 px-4 py-3 z-50 cursor-pointer transition-all mb-2 rounded-md ${
                      selectedConversation?.id === conv.id
                        ? "bg-[#FFF6F2] border-l-4 border-[#FF7C2B]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={otherParticipantProfilePic}
                        onError={(e) => (e.target.src = DEFAULT_AVATAR)}
                        alt={otherParticipant?.firstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{otherParticipant?.firstName || "Unknown User"}</p>
                      {conv.lastMessage && (
                        <p className="text-xs text-gray-500 truncate w-40">
                          {conv.lastMessage.sender?.uid === currentUser.uid ? 'You: ' : `${conv.lastMessage.sender?.name || 'They'}: `}
                          {conv.lastMessage.text}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* CHAT PANEL */}
      <div
        className={`w-full md:w-2/3 bg-white rounded-2xl shadow flex flex-col h-[calc(100vh-5rem)] ${
          selectedConversation && showChatPanel
            ? "flex"
            : selectedConversation
            ? "hidden md:flex"
            : "hidden"
        }`}
      >
        {selectedConversation ? (
          <>
            {/* CONVERSATION HEADER (includes kausap na name) */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <button
                className="md:hidden text-gray-500"
                onClick={() => {setShowChatPanel(false); navigate(0);}}
              >
                <ArrowLeft size={20} />
              </button>
              <ViewProfileLink userId={getOtherParticipant(selectedConversation)?.uid}>
                <img
                  src={
                    getOtherParticipant(selectedConversation)?.profilePicture
                      ? `${USER_PROFILE_PIC_BASE_URL}${getOtherParticipant(selectedConversation).profilePicture}`
                      : DEFAULT_AVATAR
                  }
                  onError={(e) => (e.target.src = DEFAULT_AVATAR)} 
                  alt={getOtherParticipant(selectedConversation)?.firstName}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
              </ViewProfileLink>
              <div>
                <ViewProfileLink userId={getOtherParticipant(selectedConversation)?.uid}>
                  <p className="font-semibold text-sm cursor-pointer">
                    {getOtherParticipant(selectedConversation)?.firstName || "Chat"}
                  </p>
                </ViewProfileLink>
                {Object.values(isTyping).some((val) => val) &&
                Object.keys(isTyping)
                  .filter((k) => isTyping[k])
                  .some((typingUserId) => {
                    const participant = selectedConversation.participants.find(
                      (p) => p.uid === typingUserId
                    );
                    return participant && participant.uid !== currentUser.uid;
                  }) ? (
                  <p className="font-medium text-xs text-[#ff7c2b]">
                    Typing...
                  </p>
                ) : (
                  <p className="font-medium text-xs text-gray-500">Online</p>
                )}
              </div>
            </div>

            {/* JOB INFO BANNER */}
            {selectedConversation.job && (
              <JobInfoBanner
                title="NEED VIDEO EDITOR"
                description="In need of Video Editor for Wedding Event. SDE and Drone shots..."
                budget={8000}
                onMarkDone={() => alert("Job marked as done!")}
              />
            )}

            {/* MESSAGES DISPLAY AREA */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-6 py-4 flex flex-col custom-scrollbar"
            >
              {hasMoreMessages &&
                (loading ? (
                  <div className="text-center text-blue-500 text-sm mb-2">
                    Loading more messages...
                  </div>
                ) : (
                  <div
                    className="text-center text-blue-500 cursor-pointer text-sm mb-2"
                    onClick={loadMoreMessages}
                  >
                    Load More Messages
                  </div>
                ))}
              {messages.length === 0 && !loading && (
                <p className="text-center text-gray-500 text-sm mt-4">
                  No messages yet. Start the conversation!
                </p>
              )}
              {messages.map((msg) => {
                const isMyMessage =
                  Number(msg.sender.id) === Number(currentUser.uid);
                const senderProfilePic =  msg.sender?.profilePictureUrl 
                  ? `${msg.sender.profilePictureUrl}`
                  : DEFAULT_AVATAR;

                return (
                    <React.Fragment key={msg.id}>
                    <div
                      className={`flex items-start gap-3 mb-1 ${ // Reduced bottom margin
                        isMyMessage ? "flex-row-reverse ml-auto" : "flex-row mr-auto"
                      }`}
                      style={{ maxWidth: "75%" }}
                    >
                    {/* PROFILE PIC */}
                    <ViewProfileLink userId={msg.sender.id}>
                      <img
                        src={senderProfilePic}
                        onError={(e) => {e.target.src = '/default_profile.jpg'}}
                        alt={msg.sender.firstName || msg.sender.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 cursor-pointer"
                      />
                    </ViewProfileLink>
                    
                    {/* MESSAGE BUBBLE */}
                    <div
                      className={`p-3 rounded-2xl text-sm shadow flex-1 break-words whitespace-pre-wrap ${
                        isMyMessage
                          ? "bg-[#FF7C2B] text-white"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      {/* SENDER NAME */}
                      {!isMyMessage && (
                        <ViewProfileLink userId={msg.sender.id}>
                          <p className="font-medium text-xs mb-1 text-gray-600 cursor-pointer">
                            {msg.sender.firstName || msg.sender.name}
                          </p>
                        </ViewProfileLink>
                      )}
                      <p className="break-all whitespace-pre-wrap">{msg.text}</p>
                      {msg.images && msg.images.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {msg.images.map((imgUrl, idx) => (
                            <img
                              key={idx}
                              src={imgUrl}
                              alt="message attachment"
                              className="rounded-md max-w-full h-auto"
                            />
                          ))}
                        </div>
                      )}
                      <span
                        className={`text-[10px] mt-1 block ${
                          isMyMessage
                            ? "text-white text-opacity-75"
                            : "text-gray-500"
                        } text-right`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  {isMyMessage && msg.id === lastSeenMessageId && (
                      <div className="text-xs text-gray-500 text-right w-full pr-12 mb-4"> 
                      Seen at{" "}
                        {(() => {
                          const readAtDate = new Date(msg.readAt);
                          const today = new Date();
                          const yesterday = new Date(today);
                          yesterday.setDate(today.getDate() - 1);
                        if (
                          readAtDate.getDate() === yesterday.getDate() &&
                          readAtDate.getMonth() === yesterday.getMonth() &&
                          readAtDate.getFullYear() === yesterday.getFullYear()
                        ) {
                          return `Yesterday at ${readAtDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          })}`;
                        } else {
                          return `${readAtDate.toLocaleDateString([], {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })} at ${readAtDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`;
                        }})()}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* MESSAGE INPUT AREA */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-gray-200 px-4 py-3 flex items-center gap-2"
            >
              {/* <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                <ImageIcon size={20} />
              </button> */}
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={handleMessageInputChange}
                onBlur={() => emitTyping(false)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF7C2B]"
              />
              <button
                type="submit"
                className="bg-[#FF7C2B] hover:bg-orange-600 text-white p-2 rounded-full"
              >
                <SendHorizontal size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a conversation to start messaging.
          </div>
        )}
      </div>

      {!selectedConversation && <BottomNav />}
    </div>
  );
}

export default Message;
