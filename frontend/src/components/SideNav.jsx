import React from "react";
import {
  Home,
  Star,
  TrendingUp,
  HelpCircle,
  Bell,
  MessageSquare,
  LogOut,
  Package,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import SideNavItem from "./SideNavItem";
import SideNavUser from "./SideNavUser";
import logo from "../assets/images/raketnow-blue-logo.png";

function SideNav() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
      {/* TOP SECTION */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-7 px-2">
          <img
            src={logo}
            alt="RaketNow Logo"
            className="w-100 h-15 object-contain"
          />
        </div>

        {/* links */}
        <nav className="space-y-2">
          <SideNavItem to="/home" icon={Home} label="Home" />
          <SideNavItem to="/rakets" icon={Star} label="For You" />
          <SideNavItem
            to="/my-rakets"
            icon={Package}
            label="Current Rakets Rakets"
          />
          <SideNavItem to="/boost" icon={TrendingUp} label="Boost Post" />
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div>
        <div className="space-y-2 mb-4">
          <SideNavItem to="/help" icon={HelpCircle} label="Help" />
          <SideNavItem to="/notifications" icon={Bell} label="Notifications" />
          <SideNavItem to="/messages" icon={MessageSquare} label="Messages" />
        </div>
        <div className="border-t border-gray-200 my-4" />

        <NavLink to="/profile">
          <SideNavUser
            name="Liarrah Lambayao"
            role="Raketista"
            image="https://randomuser.me/api/portraits/lego/6.jpg"
          />
        </NavLink>

        <div className="mt-4">
          <SideNavItem to="/logout" icon={LogOut} label="Logout" />
        </div>
      </div>
    </aside>
  );
}

export default SideNav;
