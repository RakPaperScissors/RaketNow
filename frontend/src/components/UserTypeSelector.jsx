import React from "react";
import { ArrowLeft } from "lucide-react"; // ⬅️ Lucide return icon
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/raketnow-logo.png";

function UserTypeSelector({ setUserType, onNext }) {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setUserType(type);
    onNext(type);
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
        {/* Return Icon Button (top-left inside card) */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#0C2C57]" />
        </button>

        <div className="flex justify-center mb-1">
          <img
            src={logo}
            alt="RaketNow Logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </div>
        <h2 className="font-bold text-2xl text-[#FF7C2B] text-center">
          Choose Account Type
        </h2>
        <p className="text-xs mt-2 text-[#000000] text-center">
          Select your role to get started
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => handleSelect("raketista")}
            className="py-2 px-4 bg-[#0C2C57] text-white rounded-xl hover:bg-[#0C2C57]/90 transition-colors duration-300"
          >
            Raketista
          </button>
          <button
            onClick={() => handleSelect("client")}
            className="py-2 px-4 bg-[#0C2C57] text-white rounded-xl hover:bg-[#0C2C57]/90 transition-colors duration-300"
          >
            Client
          </button>
          <button
            onClick={() => handleSelect("organization")}
            className="py-2 px-4 bg-[#0C2C57] text-white rounded-xl hover:bg-[#0C2C57]/90 transition-colors duration-300"
          >
            Organization
          </button>
        </div>
      </div>
    </section>
  );
}

export default UserTypeSelector;
