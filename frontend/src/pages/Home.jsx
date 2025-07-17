// ito na yung home/landing page na magamit if "logged in" na si user

import React from "react";
import SideNav from "../components/SideNav";

const Home = () => {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold">Homeeee</h1>
        {/* Here ilagay ang content and shananigans */}
      </main>
    </div>
  );
};

export default Home;
