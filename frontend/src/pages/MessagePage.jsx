import React, { useState } from "react";
import SideNav from "../components/SideNav";
import Message from "../components/Message";

const MessagePage = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* SIDENAV */}
      <div className={`${collapsed ? "w-20" : "w-64"} h-screen fixed top-0 left-0 z-50 transition-all duration-200`}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* MAIN */}
      <div className={`flex-1 relative min-h-screen  overflow-y-auto transition-all duration-200 ${
        collapsed ? "md:ml-20" : "md:ml-64"
      } ml-20`}>
        <div className="flex-1 overflow-y-auto p-6">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
