import React, { useState} from "react";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import RaketFeed from "../components/RaketFeed";
import TopRaketista from "../components/TopRaketista";
import PostRaket from "../components/PostRaket";
import Help from "../components/Help";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";




const ForYou = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = useAuth();
 


  if (loading) return <LoadingSpinner fullScreen />;


  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Fixed Sidebar */}
      <div className={`${collapsed ? "w-20" : "w-64"} h-screen fixed top-0 left-0 z-50 transition-all duration-200`}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>


      {/* Main Content */}
      <div className={`flex-1 relative min-h-screen  overflow-y-auto transition-all duration-200 pb-20 ml-0 md:${
        collapsed ? "ml-20" : "ml-64"
      }`}>
        {/* Top Section */}
        <div className="sticky top-0 z-10 pl-12 md:pl-0 ">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>


        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <PostRaket />
          <Help />
          <TopRaketista />
          <RaketFeed searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};


export default ForYou;