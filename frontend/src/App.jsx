import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

import { AuthProvider } from "./context/AuthContext";

// Pages
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Faqs from "./pages/Faqs";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import ProfilePage from "./pages/ProfilePage";
import MessagePage from "./pages/MessagePage";
import UserNotifications from "./pages/Notifications";
import BecomeRaketista from "./pages/BecomeRaketista";
import UserRakets from "./pages/MyRakets";
import BoostPost from "./pages/Boost";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/Applications";
import Raket from "./pages/test_api_pages/Raket";
import AdminUsersTable from "./pages/AdminUsersTable";

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  // will see header on these pages
  const showHeader = ["/", "/about", "/faqs", "/login", "/signup"].includes(
    currentPath
  );

  // will see footer on these pages
  const showFooter = ["/", "/about", "/faqs"].includes(currentPath);

  return (
    <>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        {showHeader && <Header />}

        <Routes>
          {/* public pages -- LANDING */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* authenticated pages -- AFTER LOG IN */}
          <Route path="/home" element={<Home />} />
          <Route path="/rakets" element={<ForYou />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/notifications" element={<UserNotifications />} />
          <Route path="/become-raketista" element={<BecomeRaketista />} />
          <Route path="/my-rakets" element={<UserRakets />} />
          <Route path="/boost" element={<BoostPost />} />
          <Route path="/raket/:raketId/applications" element={<MyApplications />} />
          <Route path="/rakets/:id" element={<Raket />} />

          {/* admin page */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users-table" element={<AdminUsersTable />} />
        </Routes>

        {showFooter && <Footer />}
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;