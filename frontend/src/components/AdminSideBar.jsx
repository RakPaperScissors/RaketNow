import React from "react";
import {
  LayoutDashboard,
  Users,
  LogOut,
} from "lucide-react";
import SideNavItem from "./SideNavItem";
import SideNavUser from "./SideNavUser";
import logo from "../assets/images/raketnow-blue-logo.png";

function AdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
      {/* TOP SECTION */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-7 px-2">
          <img src={logo} alt="RaketNow Logo" className="w-100 h-15 object-contain" />
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-2">
          <SideNavItem to="/admin-dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SideNavItem to="/admin/users" icon={Users} label="Users" />
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div>
        <div className="border-t border-gray-200 my-4" />
        
        {/* Admin Profile (non-clickable) */}
        <div className="flex items-center gap-3 p-2 rounded">
          <img
            src="https://randomuser.me/api/portraits/lego/1.jpg"
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-4">
          <SideNavItem to="/logout" icon={LogOut} label="Logout" />
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
