import React from "react";
import { NavLink } from "react-router-dom";

const SideNavItem = ({ icon: Icon, label, to, onClick, noActiveBg, collapsed, badge }) => {
  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-[#0C2C57]/10";

  const content = (
    <div className="flex items-center gap-3">
      {/* for unread notifications */}
      <div className="relative">
        <Icon className="w-5 h-5 text-[#0C2C57]" />
        {badge && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
      </div>
      {!collapsed && <span className="text-sm text-[#0C2C57] truncate">{label}</span>}
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {content}
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
      {content}
    </NavLink>
  );
};

export default SideNavItem;
