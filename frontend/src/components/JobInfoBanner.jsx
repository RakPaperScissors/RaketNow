import React from "react";

function JobInfoBanner({ title, description, budget, onMarkDone }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200">
      <div className="flex flex-col">
        <p className="font-semibold text-sm text-gray-700">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm font-medium text-[#0C2C57] mt-1">
          Php {budget.toLocaleString()}
        </p>
      </div>
      <button
        onClick={onMarkDone}
        className="bg-[#0C2C57] hover:bg-[#0a2347] text-white text-sm px-4 py-2 rounded-lg transition"
      >
        Raket Done
      </button>
    </div>
  );
}

export default JobInfoBanner;
