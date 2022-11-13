import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { USER_LOGIN } from "../../utils/constant";

export default function HeaderAdmin() {
  let navigate = useNavigate();
  let [reset, setReset] = useState(0);
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("User", "1", <PieChartOutlined />, [
      getItem(
        "Đăng nhập",
        "1a",
        <MenuItem>
          <NavLink className="nav-link" to="/login">
            Đăng Nhập
          </NavLink>
        </MenuItem>
      ),
      getItem(
        "Đăng ký",
        "1b",
        <MenuItem>
          <NavLink className="nav-link" to="/signup">
            Đăng ký
          </NavLink>
        </MenuItem>
      ),
      getItem(
        "Đăng xuất",
        "1c",
        <MenuItem>
          <NavLink
            className="nav-link"
            onClick={() => {
              setReset(reset + 1);
              localStorage.removeItem(USER_LOGIN);
              navigate(`/admin`);
            }}
          >
            Đăng xuất
          </NavLink>
        </MenuItem>
      ),
    ]),
    getItem("Films", "sub1", <MailOutlined />, [
      getItem(
        "Danh sách phim",
        "sub1a",
        <NavLink className="nav-link" to="/admin/films"></NavLink>
      ),
      getItem(
        "Thêm phim",
        "sub1b",
        <NavLink className="nav-link" to="/admin/films/themphim"></NavLink>
      ),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 9", "9"),
    ]),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="col-2">
      <div
        style={{
          width: "256px",
        }}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </div>
  );
}
