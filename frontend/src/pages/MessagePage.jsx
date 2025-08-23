import React from "react";
import SideNav from "../components/SideNav";
import Message from "../components/Message";

const MessagePage = () => {
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* SIDENAV */}
      <div className="fixed inset-y-0 left-0 z-20">
        <SideNav />
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* diri tong main page oo sige */}
        <div className="flex-1 overflow-y-auto p-6">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
