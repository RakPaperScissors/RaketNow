import React from "react";
import { NavLink } from "react-router-dom";

const SideNavItem = ({ icon: Icon, label, to, onClick, noActiveBg, collapsed }) => {
  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-[#0C2C57]/10";

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        <Icon className="w-5 h-5 text-[#0C2C57]" />
        {!collapsed && <span className="text-sm text-[#0C2C57] truncate">{label}</span>}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        noActiveBg
          ? baseClasses
          : `${baseClasses} ${isActive ? "bg-[#0C2C57]/10 font-semibold" : ""}`
      }
    >
      <Icon className="w-5 h-5 text-[#0C2C57]" />
      {!collapsed && <span className="text-sm text-[#0C2C57] truncate">{label}</span>}
    </NavLink>
  );
};

export default SideNavItem;
