import React from "react";
import { NavLink } from "react-router-dom";

const SideNavItem = ({ icon: Icon, label, to, onClick, noActiveBg }) => {
  const baseClasses =
    "flex items-center gap-3 px-2 py-2 rounded-md transition-colors hover:bg-[#0C2C57]/10";

  // to handle onClick events
  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        <Icon className="w-5 h-5 text-[#0C2C57]" />
        <span className="text-sm text-[#0C2C57]">{label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        noActiveBg
          ? baseClasses // do not apply bg even if active
          : `${baseClasses} ${isActive ? "bg-[#0C2C57]/10 font-semibold" : ""}`
      }
    >
      <Icon className="w-5 h-5 text-[#0C2C57]" />
      <span className="text-sm text-[#0C2C57]">{label}</span>
    </NavLink>
  );
};

export default SideNavItem;
