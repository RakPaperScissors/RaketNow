import React from "react";
import { X, Lock, FileText, AlertCircle } from "lucide-react";

function ErrorModal({ title = "Notice", message, onClose }) {
  const isPasswordError = message?.includes("Password must");
  const isTOSError = message?.toLowerCase().includes("terms");

  const rules = [
    "Be at least 4 characters",
    "Include at least one number",
    "Include at least one special character",
  ];

  // Choose icon based on type
  let Icon = AlertCircle;
  if (isPasswordError) Icon = Lock;
  else if (isTOSError) Icon = FileText;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-[#0c2c57]"
        >
          <X size={20} />
        </button>

        {/* Title + Icon */}
        <div className="flex items-center gap-2 mb-3">
          <Icon className="text-[#ff7c2b]" size={22} />
          <h2 className="text-lg font-bold text-[#0c2c57]">{title}</h2>
        </div>

        {/* Message */}
        {isPasswordError ? (
          <div>
            <p className="text-gray-700 mb-2">Password must:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre-line">{message}</p>
        )}

        {/* OK Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#ff7c2b] hover:bg-[#ff7c2b]/90 text-white px-4 py-2 rounded-xl font-semibold transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
