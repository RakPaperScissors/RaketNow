import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import UserRakets from "../components/UserRakets";
import RaketStatus from "../components/RaketStatus";
import MyApplications from "../components/MyApplications";
import { useCurrentUser } from "../hooks/useCurrentUser";

const MyRakets = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = useCurrentUser();
  const [activeTab, setActiveTab] = useState("userRakets"); // default tab
  const contentRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => setIsScrolled(el.scrollTop > 4);
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* SIDENAV */}
      <div className={`${collapsed ? "w-20" : ""} h-screen fixed top-0 left-0 z-50 transition-all duration-200`}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} hideHamburger={isScrolled} />
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentRef} className={`flex-1 relative min-h-screen  overflow-y-auto transition-all duration-200 ${collapsed ? "md:ml-20" : "md:ml-64"
        } ml-0`}>
        {/* Search Bar (hidden when scrolled) */}
        {!isScrolled && (
          <div className=" pl-12 md:pl-0">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </div>
        )}

        {/* TAB SECTION - fully sticks to top when scrolled */}
        <div className={`sticky top-0 z-20 flex justify-center pb-2 ${isScrolled ? "bg-white/70 " : ""}`}>
          <div className="flex space-x-6 bg-white shadow-md rounded-xl px-3 py-2">
            {/* My Rakets */}
            <button
              className={`px-2 py-1 font-medium transition sm:text-sm md:text-base ${activeTab === "userRakets"
                  ? "text-[#0C2C57] border-b-2 border-[#FF7C2B]"
                  : "text-gray-500 hover:text-[#0C2C57]"
                }`}
              onClick={() => setActiveTab("userRakets")}
            >
              My Rakets
            </button>


          {/* Raket Status (only if raketista) */}
          {currentUser?.role === "raketista" && (
            <button
              className={`px-2 py-1 font-medium transition sm:text-sm md:text-base ${activeTab === "raketStatus"
                ? "text-[#0C2C57] border-b-2 border-[#FF7C2B]"
                : "text-gray-500 hover:text-[#0C2C57]"
                }`}
              onClick={() => setActiveTab("raketStatus")}
            >
              Raket Status
            </button>
          )}

          {/* My Applications */}
          <button
            className={`px-2 py-1 font-medium transition  sm:text-sm md:text-base ${activeTab === "myApplications"
              ? "text-[#0C2C57] border-b-2 border-[#FF7C2B]"
              : "text-gray-500 hover:text-[#0C2C57]"
              }`}
            onClick={() => setActiveTab("myApplications")}
          >
            My Applications
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-8 py-6 space-y-6">
        {activeTab === "userRakets" && <UserRakets searchTerm={searchTerm} />}
        {activeTab === "raketStatus" && currentUser?.type === "Raketista" && (
          <RaketStatus searchTerm={searchTerm}/>
        )}
        {activeTab === "myApplications" && <MyApplications searchTerm={searchTerm} />}
      </div>
    </div>
    </div >
  );
};

export default MyRakets;
