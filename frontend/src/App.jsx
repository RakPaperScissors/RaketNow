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
import MyRakets from "./pages/MyRakets";
import Boost from "./pages/Boost";
import Message from "./pages/Message";

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
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/rakets" element={<ForYou />} />
        <Route path="/my-rakets" element={<MyRakets />} />
        <Route path="/boost" element={<Boost />} />
        <Route path="/message" element={<Message />} />
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