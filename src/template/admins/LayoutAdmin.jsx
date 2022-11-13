import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  return (
    <div className="row">
      <HeaderAdmin />
      <Outlet />
    </div>
  );
}
