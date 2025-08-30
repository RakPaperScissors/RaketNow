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
import { fetchNotifications } from "../api/notifications";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import SideNavItem from "./SideNavItem";
import SideNavUser from "./SideNavUser";
import logo from "../assets/images/raketnow-blue-logo.png";
import { useAuth } from "../context/AuthContext";


function SideNav({ collapsed, setCollapsed, hideHamburger = false }) {
  const { user, loading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    const getUnreadNotifications = async () => {
      try {
        const notifications = await fetchNotifications();
        const unread = notifications.filter(n => !n.isRead).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };

    getUnreadNotifications();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);


  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    window.location.href = "/";
    setIsLoggingOut(false);
  };


  if (loading) return <LoadingSpinner fullScreen />;
  if (isLoggingOut) return <LoadingSpinner fullScreen />;
  if (!user) return <p>You are not logged in.</p>;


  const userType = user.type === "Users" ? "Client" : user.type;
  const canApplyAsRaketista = userType === "Client";


  return (
    <>
      {/* Mobile: Hamburger toggle button (hidden when requested) */}
      {!hideHamburger && (
        <button
          className="md:hidden fixed top-4 left-3 z-[60] flex items-center justify-center w-8 h-8 rounded-md "
          onClick={() => setMobileOpen(prev => { const next = !prev; if (next) setCollapsed(false); return next; })}
          aria-label="Toggle sidebar"
        >
          <AlignJustify className="w-5 h-5 text-[#0C2C57]" />
        </button>
      )}


      {/* Mobile: Off-canvas sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />


        {/* Drawer */}
        <aside
          className={`absolute top-0 left-0 h-full ${collapsed ? "w-20" : "w-64"} bg-white border-r border-gray-200 shadow-lg py-6 px-4 transform transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Logo */}
          {!collapsed && (
            <div className="flex items-center gap-3 mt-10 mb-7 px-6">
              <img
                src={logo}
                alt="RaketNow Logo"
                className="object-contain w-40 h-auto"
              />
            </div>
          )}


          {/* Profile on top (mobile) */}
          <NavLink to="/profile" onClick={() => setMobileOpen(false)}>
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
            <NavLink
              to="/boost"
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-[#0C2C57]/10"
              onClick={() => setMobileOpen(false)}
            >
              <TrendingUp className="w-5 h-5 text-[#0C2C57]" />
              {!collapsed && <span className="text-sm text-[#0C2C58] truncate">Boost Post</span>}
            </NavLink>
            <NavLink
              to="/faqs"
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-[#0C2C57]/10"
              onClick={() => setMobileOpen(false)}
            >
              <Users className="w-5 h-5 text-[#0C2C57]"/>
              {!collapsed && <span className="text-sm text-[#0C2C57] tructate">Help / FAQs</span>}
            </NavLink>
            <NavLink 
              to="/become-raketista"
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-[#0C2C57]/10"
              onClick={() => setMobileOpen(false)}
            >
              <Users className="w-5 h-5 text-[#0C2C57]" />
              {!collapsed && <span className="text-sm text-[#0C2C57] tructate">Become a Raketista</span>}
            </NavLink>
          </nav>


          {/* Logout at bottom (mobile) */}
          <div className="mt-6">
            <div onClick={async () => { setMobileOpen(false); await handleLogout(); }} style={{ cursor: "pointer" }}>
              <SideNavItem
                to="#"
                icon={LogOut}
                label="Logout"
                noActiveBg
                collapsed={collapsed}
              />
            </div>
          </div>
        </aside>
      </div>


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
            <SideNavItem
              to="/faqs"
              icon={Users}
              label="Help / FAQs"
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
              badge={unreadCount > 0}
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