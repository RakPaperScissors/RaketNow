import React from "react";

const LoadingSpinner = ({ fullScreen = false, size = 60, className = "", bgColor = "bg-[#F9FAFB]" }) => {
  return (
    <div 
      className={`${fullScreen
        ? `flex justify-center items-center min-h-screen ${bgColor}`
        : "inline-flex justify-center items-center"
        } ${className}`}>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="spinnerGradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff7c2b" />
            <stop offset="100%" stopColor="#0c2c72" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#spinnerGradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset="100"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
