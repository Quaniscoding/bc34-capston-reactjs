import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/react.png";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { USER_LOGIN } from "../../utils/constant";
import { Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getStringLocal } from "../../utils/config";

export default function Header() {
  let navigate = useNavigate();
  let [reset, setReset] = useState(0);
  let isLogin = getStringLocal(USER_LOGIN);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [loading, setLoading] = useState(false);
  let timeout = null;
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <nav className=" container navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/trangchu">
        {" "}
        <img width={50} src={logo} alt="" />{" "}
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
          <li className="nav-item active ">
            <NavLink className="nav-link" to="/">
              {" "}
              Liên hệ
            </NavLink>
          </li>
          <li className="nav-item active ">
            <NavLink className="nav-link" to="/">
              {" "}
              Dịch vụ
            </NavLink>
          </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Tooltip title="Tài khoản">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <Space>
                    <UserOutlined />
                  </Space>
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {isLogin ? (
              ""
            ) : (
              <>
                <MenuItem>
                  <Avatar />
                  <NavLink className="nav-link" to="/login">
                    Đăng Nhập
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <Avatar />
                  <NavLink className="nav-link" to="/signup">
                    Đăng ký
                  </NavLink>
                </MenuItem>
              </>
            )}
            <MenuItem>
              <Avatar />
              <NavLink className="nav-link" to="/infousers">
                Thông tin người dùng
              </NavLink>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setReset(reset + 1);
                localStorage.removeItem(USER_LOGIN);
                navigate(`/login`);
                loading(false);
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
