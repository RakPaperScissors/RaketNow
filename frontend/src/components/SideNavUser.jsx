import React from "react";
import { NavLink } from "react-router-dom";

const SideNavUser = ({ name, role, image, collapsed }) => {
  const isLongName = name && name.length > 15;

  return (
    <NavLink
      to="/profile"
      className={`flex items-center gap-3 px-2 mt-6 hover:bg-[#0C2C57]/10 rounded-md py-2 transition-colors ${
        collapsed ? "justify-center" : ""
      }`}
    >
      {/* Profile Picture */}
      <img
        src={image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default_profile.jpg";
        }}
        alt={name}
        className={`rounded-full object-cover transition-all duration-200 ${
          collapsed ? "w-8 h-8" : "w-10 h-10"
        }`}
      />

      {/* dont show user name if collapsed */}
      {!collapsed && (
        <div className="min-w-0">
          <p
            className={`text-gray-800 font-medium truncate transition-all duration-300 max-w-[120px] ${
              isLongName ? "text-xs" : "text-sm"
            }`}
            title={name}
          >
            {name}
          </p>
          <p className="text-xs text-gray-500 truncate">{role}</p>
        </div>
      )}
    </NavLink>
  );
};

export default SideNavUser;
