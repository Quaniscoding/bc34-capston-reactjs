import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div style={{ backgroundColor: "#fdfcf0" }}>
      <Header />
      {/* left  */}
      {/* hiện thị content của pages */}
      <Outlet />
      {/* right */}
      <Footer />
    </div>
  );
}
