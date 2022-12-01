import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Button, Result, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useRoute from "../../../hooks/useRoute";
import { callGetDanhSachUser } from "../../../redux/reducers/danhSachUser";
import { callDeleteUser } from "../../../redux/reducers/userReducer";
import { USER_LOGIN } from "../../../utils/constant";

export default function DanhSachUser() {
  const {
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.has("tuKhoa") ? searchParams.get("tuKhoa") : "";
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const reloadPage = () => {
    window.location.reload(false);
  };
  const [loading, setLoading] = useState(false);
  let danhSachUser = useSelector((state) => state.danhSachUser.danhSachUser);
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      dispatch(callGetDanhSachUser(keyWord));
    }, 1000);
  }, [keyWord]);
  let isLogin = localStorage.getItem(USER_LOGIN);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="col-8">
          {" "}
          {isLogin ? (
            <div className="container">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" role="tab" data-toggle="tab">
                    Danh sách người dùng
                  </a>
                </li>
              </ul>
              <br />
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane in active">
                  <div className="row">
                    <nav className="navbar navbar-light bg-light">
                      <form className="form-inline">
                        <input
                          className="form-control mr-sm-2"
                          placeholder="Nhập tên người dùng"
                          value={keyWord}
                          onChange={(event) => {
                            let { value } = event.target;
                            setSearchParams({ tuKhoa: value });
                          }}
                        />
                      </form>
                    </nav>
                  </div>
                  <div className="clear-fix" />
                  <div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tài khoản</th>
                          <th>Họ tên</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {danhSachUser.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th>{index}</th>
                              <th>{item.taiKhoan}</th>
                              <th>{item.hoTen}</th>
                              <th>{item.email}</th>
                              <th>{item.soDT}</th>
                              <th>
                                <Space>
                                  <EditOutlined
                                    onClick={() => {
                                      setLoading(true);
                                      setTimeout(() => {
                                        setLoading(false);
                                      });
                                      navigate(
                                        `/admin/danhSachUser/editUser/${item.taiKhoan}`
                                      );
                                    }}
                                    style={{
                                      color: "blue",
                                      paddingRight: "2px",
                                      fontSize: "20px",
                                    }}
                                  />
                                </Space>
                                <Space>
                                  <DeleteOutlined
                                    style={{ color: "red", fontSize: "20px" }}
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          `Bạn có chắc muốn xóa tài khoản: ${item.taiKhoan} không`
                                        )
                                      ) {
                                        dispatch(callDeleteUser(item.taiKhoan));
                                        setLoading(true);
                                        setTimeout(() => {
                                          setLoading(false);
                                        });
                                        reloadPage(true);
                                      }
                                    }}
                                  />
                                </Space>
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <br />
                </div>
              </div>
              <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Modal Heading</h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        ×
                      </button>
                    </div>
                    <div className="modal-footer" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Result
              subTitle="Bạn phải đăng nhập để quản lý danh sách người dùng !"
              extra={
                <Button type="dashed">
                  <NavLink className="pb-2" to="/login">
                    Đăng Nhập
                  </NavLink>
                </Button>
              }
            />
          )}
        </div>
      )}
    </>
  );
}
