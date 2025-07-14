// Previously named "HOME" page, now renamed to "Landing" for clarity

import React from "react";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import AppWorks from "../components/AppWorks";
import KeyFeatures from "../components/KeyFeatures";
import Faqs from "../components/Faqs";
import AdBanner from "../components/AdBanner";

function Landing() {
  return (
    <div>
      <Hero />
      {/* <main className="py-10 px-4 bg-gray-50 min-h-[80vh]"> */}
      <CardList />
      <AppWorks />
      <KeyFeatures />
      <Faqs />
      <AdBanner />
      {/* </main> */}
    </div>
  );
}

export default Landing;
