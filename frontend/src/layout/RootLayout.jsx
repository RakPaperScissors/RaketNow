// FILE CURRENTLY NOT BEING USED KASI LIBOG HAHAHAHAHA

import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;
