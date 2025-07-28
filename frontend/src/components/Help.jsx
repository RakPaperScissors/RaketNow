import React from "react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/Faqs")}
      className="fixed bottom-24 right-9 z-[50] bg-[#FFF4ED] text-[#0C2C57] p-2 rounded-full shadow-lg transition-all duration-200 group"
      aria-label="Help"
    >
      <HelpCircle className="w-5 h-5" />
      <span className="absolute bottom-14 right-0 text-sm text-white bg-gray-800 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition">
        Help
      </span>
    </button>
  );
}