// Previously named "HOME" page, now renamed to "Landing" for clarity

import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import AppWorks from "../components/AppWorks";
import KeyFeatures from "../components/KeyFeatures";
import Faqs from "../components/Faqs";
import AdBanner from "../components/AdBanner";
import { useLocation } from "react-router-dom";

function Landing() {
  const cardListRef = useRef(null);
  const location = useLocation();

  const handleCategoriesClick = () => {
    cardListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollToCategories) {
      cardListRef.current?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div>
      <Header onCategoriesClick={handleCategoriesClick} />
      <Hero />
      {/* <main className="py-10 px-4 bg-gray-50 min-h-[80vh]"> */}
      <div ref={cardListRef}>
        <CardList />
      </div>
      <AppWorks />
      <KeyFeatures />
      <Faqs />
      <AdBanner />
      {/* </main> */}
    </div>
  );
}

export default Landing;
