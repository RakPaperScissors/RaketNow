import React, { useState } from "react";

function EmailVerificationModal({ email, onVerify, onClose, onResend }) {
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // will enter numbers only
    if (value.length <= 6) setCode(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We sent a 6-digit verification code to{" "}
          <span className="font-medium">{email}</span>. Please enter it below.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={handleChange}
            placeholder="Enter 6-digit code"
            className="w-full p-3 text-center text-md border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#ff7c2b] mb-4"
          />

          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={onResend}
              className="text-[#ff7c2b] text-sm underline"
            >
              Resend Code
            </button>
            <button
              type="submit"
              disabled={code.length !== 6}
              className="bg-[#ff7c2b] hover:bg-[#ff7c2b]/90 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl font-semibold transition"
            >
              Verify
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EmailVerificationModal;
