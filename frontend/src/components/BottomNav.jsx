import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Star, Package, Bell, MessageSquare } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/rakets", icon: Star, label: "For You" },
    { to: "/my-rakets", icon: Package, label: "Current Rakets" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/message", icon: MessageSquare, label: "Messages" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-[#0C2C57] bg-[#0C2C57]/10"
                  : "text-gray-600 hover:text-[#0C2C57] hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;