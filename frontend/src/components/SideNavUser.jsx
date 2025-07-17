// components/SideNavUser.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const SideNavUser = ({ name, role, image }) => {
  return (
    <NavLink
      to="/profile"
      className="flex items-center gap-3 px-2 mt-6 hover:bg-[#0C2C57]/10 rounded-md py-2 transition-colors"
    >
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="text-sm font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </NavLink>
  );
};

export default SideNavUser;
