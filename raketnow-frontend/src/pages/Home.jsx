import React from "react";
import CardList from "../components/CardList";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <main className="py-10 px-4 bg-gray-50 min-h-[80vh]">
        <CardList />
      </main>
    </div>
  );
}

export default Home;
