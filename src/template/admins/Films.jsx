import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Result, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetDanhSachPhim } from "../../redux/reducers/danhSachPhimSearch";
import { USER_LOGIN } from "../../utils/constant";
import useRoute from "../../hooks/useRoute";
import { removeLocal } from "../../utils/config";
import { NavLink, useNavigate } from "react-router-dom";
import { callDeletePhim } from "../../redux/reducers/userReducer";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export default function Films() {
  const {
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.has("tenPhim")
    ? searchParams.get("tenPhim")
    : "";
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let timeout = null;
  let isLogin = localStorage.getItem(USER_LOGIN);
  let danhSachPhim = useSelector(
    (state) => state.danhSachPhimReducer.danhSachPhim
  );
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const getPhim = async () => {
    dispatch(callGetDanhSachPhim(keyWord));
  };
  useEffect(() => {
    timeout = setTimeout(() => {
      getPhim();
    }, 500);
  }, [keyWord]);
  return (
    <div className="col-9">
      {isLogin ? (
        <div className="container">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" role="tab" data-toggle="tab">
                Danh sách chi tiết phim
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
                      placeholder="Nhập tên phim"
                      value={keyWord}
                      onChange={(event) => {
                        let { value } = event.target;
                        setSearchParams({ tenPhim: value });
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
                      <th>Mã Phim</th>
                      <th>Hình Ảnh</th>
                      <th>Tên Phim</th>
                      <th>Mô Tả</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachPhim.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th>{item.maPhim}</th>
                          <th>
                            <img
                              src={item.hinhAnh}
                              alt=""
                              style={{ width: "80px" }}
                            />
                          </th>
                          <th>{item.tenPhim}</th>
                          <th>{item.moTa}</th>
                          <th>
                            <button
                              onClick={() => {
                                navigate(
                                  `/admin/films/capnhatphim/${item.maPhim}`
                                );
                              }}
                            >
                              <Space>
                                <EditOutlined />
                              </Space>
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Bạn có chắc muốn xóa phim ${item.tenPhim} hay không`
                                  )
                                ) {
                                  dispatch(callDeletePhim(item.maPhim));
                                }
                              }}
                            >
                              <Space>
                                <DeleteOutlined />
                              </Space>
                            </button>
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
                  <button type="button" className="close" data-dismiss="modal">
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
          subTitle="Bạn phải đăng nhập để quản lý danh sách phim !"
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
  );
}
