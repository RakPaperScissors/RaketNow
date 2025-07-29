import React from "react";
import logo from "../assets/images/raketnow-logo.png";

// edit if connected to backend
function RaketistaModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-6 text-center">
        <div className="mb-4">
          <img src={logo} alt="Icon" className="mx-auto h-12 w-12" />
        </div>

        <h2 className="text-[#0c2c57] font-bold text-lg mb-2">
          Become a Raketista!
        </h2>

        <p className="text-gray-600 mb-6 text-sm">
          Join us and book Rakets and become RaketNow’s top Raketista!
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            Not Now
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-[#ff7c2b] text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-500 transition"
          >
            Let’s Go!
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaketistaModal;
