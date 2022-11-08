import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/imgs/react.png";
import ModalUser from "../../hoc/ModalUser";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
export default function Header() {
  return (
    <nav className=" container navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/">
        {" "}
        <img width={50} src={logo} />{" "}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li>
            <ModalUser lbButton="Đăng nhập" Component={<LogIn />} />
          </li>
          <li>
            <ModalUser lbButton="Đăng ký" Component={<SignUp />} />
          </li>
          <li className="nav-item active ">
            <NavLink className="nav-link" to="/trangchu">
              {" "}
              Trang chủ{" "}
            </NavLink>
          </li>
          <li className="nav-item active ">
            <NavLink className="nav-link" to="/phimdangchieu">
              {" "}
              Phim đang chiếu
            </NavLink>
          </li>
          <li className="nav-item active ">
            <NavLink className="nav-link" to="/phimsapchieu">
              {" "}
              Phim sắp chiếu
            </NavLink>
          </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}
