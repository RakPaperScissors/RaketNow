import React from "react";
import {
  Home,
  Star,
  TrendingUp,
  Bell,
  MessageSquare,
  LogOut,
  Package,
  Users,
  AlignJustify,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import SideNavItem from "./SideNavItem";
import SideNavUser from "./SideNavUser";
import logo from "../assets/images/raketnow-blue-logo.png";
import { useAuth } from "../context/AuthContext";


function SideNav({ collapsed, setCollapsed }) {
  const { user, loading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);


  React.useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);


  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    window.location.href = "/login";
    setIsLoggingOut(false);
  };


  if (loading) return <LoadingSpinner fullScreen />;
  if (isLoggingOut) return <LoadingSpinner fullScreen />;
  if (!user) return <p>You are not logged in.</p>;


  const userType = user.type === "Users" ? "Client" : user.type;
  const canApplyAsRaketista = userType === "Client";


  return (
    <>
      {/* Mobile-only sidebar: logo, profile, boost, logout */}
      <aside
        className={`h-screen md:hidden ${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between pt-6 pb-24 px-4 transition-all duration-200 overflow-y-auto`}
      >
        <div>
          {/* Collapse Button (mobile) */}
          <button
            className="ml-3 mb-5 flex items-center justify-center w-5 h-6 rounded-md hover:bg-gray-100"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <AlignJustify className="w-6 h-6 text-[#0C2C57]" />
          </button>


          {/* Logo */}
          {!collapsed && (
            <div className="flex items-center gap-3 mb-7 px-6">
              <img
                src={logo}
                alt="RaketNow Logo"
                className="object-contain w-40 h-auto"
              />
            </div>
          )}


          {/* Profile on top (mobile) */}
          <NavLink to="/profile">
            <SideNavUser
              name={`${user.firstName} ${user.lastName}`}
              role={userType}
              image={user?.profilePicture}
              collapsed={collapsed}
            />
          </NavLink>


          <div className="border-t border-gray-200 my-4" />


          {/* Boost below profile (mobile) */}
          <nav className="space-y-2">
            <SideNavItem
              to="/boost"
              icon={TrendingUp}
              label="Boost Post"
              collapsed={collapsed}
            />
          </nav>
        </div>


        {/* Logout stays at bottom (mobile) */}
        <div>
          <div className="mt-4">
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              <SideNavItem
                to="#"
                icon={LogOut}
                label="Logout"
                noActiveBg
                collapsed={collapsed}
              />
            </div>
          </div>
          {/* Spacer to avoid overlap with BottomNav */}
          <div className="h-6" />
        </div>
      </aside>


      {/* Desktop sidebar (unchanged) */}
      <aside
        className={`h-screen hidden md:flex ${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 shadow-sm flex-col justify-between py-6 px-4 transition-all duration-200`}
      >
        {/* TOP SECTION */}
        <div>
          {/* Collapse Button */}
          <button
            className="ml-3 mb-5 flex items-center justify-center w-5 h-6 rounded-md hover:bg-gray-100"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <AlignJustify className="w-6 h-6 text-[#0C2C57]" />
          </button>


          {/* LOGO (hide when collapsed) */}
          {!collapsed && (
            <div className="flex items-center gap-3 mb-7 px-6">
              <img
                src={logo}
                alt="RaketNow Logo"
                className="object-contain w-40 h-auto"
              />
            </div>
          )}


          {/* Main Navigation Links - Hidden on mobile */}
          <nav className="space-y-2 hidden md:block">
            <SideNavItem to="/home" icon={Home} label="Home" collapsed={collapsed} />
            <SideNavItem to="/rakets" icon={Star} label="For You" collapsed={collapsed} />
            <SideNavItem
              to="/my-rakets"
              icon={Package}
              label="Current Rakets"
              collapsed={collapsed}
            />
            <SideNavItem
              to="/boost"
              icon={TrendingUp}
              label="Boost Post"
              collapsed={collapsed}
            />
          </nav>
        </div>


        {/* BOTTOM SECTION */}
        <div>
          <div className="space-y-2 mb-4">
            {canApplyAsRaketista && (
              <SideNavItem
                to="/become-raketista"
                icon={Users}
                label="Become a Raketista"
                collapsed={collapsed}
              />
            )}


            {/* Secondary Navigation - Always visible in sidebar */}
            <SideNavItem
              to="/notifications"
              icon={Bell}
              label="Notifications"
              collapsed={collapsed}
            />
            <SideNavItem
              to="/message"
              icon={MessageSquare}
              label="Messages"
              collapsed={collapsed}
            />
          </div>


          <div className="border-t border-gray-200 my-4" />


          {/* USER PROFILE */}
          {loading ? (
            <p>Loading user...</p>
          ) : user ? (
            <NavLink to="/profile">
              <SideNavUser
                name={`${user.firstName} ${user.lastName}`}
                role={userType}
                image={user?.profilePicture}
                collapsed={collapsed}
              />
            </NavLink>
          ) : (
            <p>Not logged in.</p>
          )}


          {/* Logout */}
          <div className="mt-4">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                <SideNavItem
                  to="#"
                  icon={LogOut}
                  label="Logout"
                  noActiveBg
                  collapsed={collapsed}
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}


export default SideNav;