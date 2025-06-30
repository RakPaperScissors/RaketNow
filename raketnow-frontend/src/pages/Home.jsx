import React from "react";
import CardList from "../components/CardList";
import Hero from "../components/Hero";

function Home() {
  return (
    <div>
      <Hero />
      <main className="py-10 px-4 bg-gray-50 min-h-[80vh]"> {/* wait lang nalibog ko if si hero is naa sa sulod ani orrr huhu*/}
        <CardList />
      </main>
    </div>
  );
}

export default Home;
