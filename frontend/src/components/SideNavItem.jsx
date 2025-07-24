import React from "react";
import { NavLink } from "react-router-dom";

const SideNavItem = ({ icon: Icon, label, to }) => {
  return (
    <NavLink
      to={to}
      end // ensures exact match
      className={({ isActive }) =>
        `flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${
          isActive ? "bg-[#0C2C57]/10 font-semibold" : "hover:bg-[#0C2C57]/10"
        }`
      }
    >
      <Icon className="w-5 h-5 text-[#0C2C57]" />
      <span className="text-sm text-[#0C2C57]">{label}</span>
    </NavLink>
  );
};

export default SideNavItem;
