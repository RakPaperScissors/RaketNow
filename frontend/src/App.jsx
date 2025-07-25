// changed some format coz deins ko gets pano naga work yung root layout HASHDHASD

import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Faqs from "./pages/Faqs";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import ProfilePage from "./pages/ProfilePage";
import Message from "./pages/Message";
import UserNotifications from "./pages/Notifications";
import UserRakets from "./pages/MyRakets";
import BoostPost from "./pages/Boost";

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
        <Route path="/message" element={<Message />} />
        <Route path="/notifications" element={<UserNotifications />} />
        <Route path="/my-rakets" element={<UserRakets />} />
        <Route path="/boost" element={<BoostPost />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
