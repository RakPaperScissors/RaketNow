import React from "react";
import logo from "../assets/images/raketnow-logo.png";

function UserTypeSelector({ setUserType, onNext }) {
  const handleSelect = (type) => {
    setUserType(type);
    onNext();
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">
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
            className="py-2 px-4 bg-[#0C2C57] text-white rounded-xl hover:scale-105 duration-300"
          >
            Raketista
          </button>
          <button
            onClick={() => handleSelect("client")}
            className="py-2 px-4 bg-[#0C2C57] text-white rounded-xl hover:scale-105 duration-300"
          >
            Client
          </button>
          <button
            onClick={() => handleSelect("organization")}
            className="py-2 px-4 bg-[#0C2C57] text-white rounded-xl hover:scale-105 duration-300"
          >
            Organization
          </button>
        </div>
      </div>
    </section>
  );
}

export default UserTypeSelector;
