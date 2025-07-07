// Previously named "HOME" page, now renamed to "Landing" for clarity

import React from "react";
import CardList from "../components/CardList";
import AppWorks from "../components/AppWorks";
import Hero from "../components/Hero";
import AdBanner from "../components/AdBanner";
import Faqs from "../components/Faqs";

function Landing() {
  return (
    <div>
      <Hero />
      {/* <main className="py-10 px-4 bg-gray-50 min-h-[80vh]"> */}
      <CardList />
      <AppWorks />
      <Faqs />
      <AdBanner />
      {/* </main> */}
    </div>
  );
}

export default Landing;
