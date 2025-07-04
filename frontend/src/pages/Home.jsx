import React from "react";
import CardList from "../components/CardList";
import AppWorks from "../components/AppWorks";
import Hero from "../components/Hero";
import AdBanner from "../components/AdBanner";

function Home() {
  return (
    <div>
      <Hero />
      {/* <main className="py-10 px-4 bg-gray-50 min-h-[80vh]"> */}
      {/* wait lang nalibog ko if si hero is naa sa sulod ani orrr huhu*/}
      {/* Yes yess ang nasa loob ng hero kay yung components mismo na makita nya na unique sa hero section lang */}
      <CardList />
      <AppWorks />
      <AdBanner />
      {/* </main> */}
    </div>
  );
}

export default Home;
