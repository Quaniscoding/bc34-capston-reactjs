import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callGetDanhSachPhim } from "../../redux/reducers/danhSachPhimReducer";
import { USER_LOGIN } from "../../utils/constant";
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
  const navigate = useNavigate();

  let ditpatch = useDispatch();
  let timeout = null;
  let isLogin = localStorage.getItem(USER_LOGIN);
  let danhSachPhim = useSelector(
    (state) => state.danhSachPhimReducer.danhSachPhim
  );
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      ditpatch(callGetDanhSachPhim);
    }, 1000);
  }, []);
  return (
    <div>
      {isLogin ? (
        <div className="container">
          <nav className="navbar navbar-expand-sm navbar-dark">
            <a className="navbar-brand" href="#">
              Quản lý
            </a>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href="user">
                    User
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdownId"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Films
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <li className="nav-item active">
                      <a className="nav-link" href="films">
                        Film
                      </a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="films/addnews">
                        Add Film
                      </a>
                    </li>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <header className="display-4 my-4">Quản lý phim</header>
          {/* Phan tab menu */}
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#DanhSachNguoiDung"
                role="tab"
                data-toggle="tab"
              >
                Danh sách người dùng
              </a>
            </li>
          </ul>
          <br />
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane in active">
              <div className="row">
                <button
                  className="btn btn-success col-2"
                  onClick={() => {
                    navigate("/user/addnews");
                  }}
                >
                  <i className="fa fa-plus mr-1" />
                  Thêm phim
                </button>
                <div className="col-12">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập từ khóa"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">
                        <i className="fa fa-search" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear-fix" />
              <div className="tblNguoiDung" id="tblNguoiDung">
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
                            <button>
                              <Space>
                                <EditOutlined />
                              </Space>
                            </button>
                            <button>
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
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">Modal Heading</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                </div>
                {/* Modal body */}

                {/* Modal footer */}
                <div className="modal-footer" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
