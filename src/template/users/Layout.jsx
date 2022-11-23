import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgb(10, 32, 41), transparent 100%)",
      }}
    >
      <Header />
      {/* left  */}
      {/* hiện thị content của pages */}
      <Outlet />
      {/* right */}
      <Footer />
    </div>
  );
}
