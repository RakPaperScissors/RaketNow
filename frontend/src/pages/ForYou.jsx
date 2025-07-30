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
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 z-20 bg-white border-r">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Section */}
        <div className="sticky top-0 z-10 bg-white ">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
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
