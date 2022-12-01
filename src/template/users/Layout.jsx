import React from "react";
import { Outlet } from "react-router-dom";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  let isLogin = getStringLocal(USER_LOGIN);

  return (
    <div
      style={{
        background:
          "linear-gradient(to top,rgb(255 222 222), transparent 100%)",
      }}
    >
      <Header />
      <Outlet />
      {isLogin ? <Footer /> : ""}
    </div>
  );
}
