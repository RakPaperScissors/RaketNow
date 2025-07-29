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
import { useAuth } from "../context/AuthContext";

function SideNav() {
  const { user, loading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    window.location.href = "/login";
  };

  if (loading) return <p>Loading...</p>
  if (!user && !isLoggingOut) return <p>You are not logged in.</p>

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
          <SideNavItem to="/my-rakets" icon={Package} label="Current Rakets" />
          <SideNavItem to="/boost" icon={TrendingUp} label="Boost Post" />
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div>
        <div className="space-y-2 mb-4">
          <SideNavItem to="/help" icon={HelpCircle} label="Help" />
          <SideNavItem to="/notifications" icon={Bell} label="Notifications" />
          <SideNavItem to="/message" icon={MessageSquare} label="Messages" />
        </div>
        <div className="border-t border-gray-200 my-4" />

        {/* Conditionally render the user info */}
        {loading ? (
          <p>Loading user...</p>
        ) : user ? (
          <NavLink to="/profile">
            <SideNavUser
              name={`${user.firstName} ${user.lastName}`}
              role={user.type}
              image={user?.profilePicture} // Fallback image
            />
          </NavLink>
        ) : (
          <p>Not logged in.</p>
        )}

        <div className="mt-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-1" />
              <p className="text-sm">Logging out...</p>
            </div>
          ) : (
            <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <SideNavItem to="#" icon={LogOut} label="Logout" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SideNav;
