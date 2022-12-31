import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to top,rgb(255 222 222), transparent 100%)",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
