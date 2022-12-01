import {
  EditOutlined,
  DeleteOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Button, Result, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetDanhSachPhim } from "../../redux/reducers/danhSachPhimSearch";
import { USER_LOGIN } from "../../utils/constant";
import useRoute from "../../hooks/useRoute";
import "../../assets/css/main.css";
import { NavLink, useNavigate } from "react-router-dom";
import { callDeletePhim } from "../../redux/reducers/userReducer";
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      getPhim();
    }, 1000);
  }, [keyWord]);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
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
                                <Space>
                                  <EditOutlined
                                    onClick={() => {
                                      navigate(
                                        `/admin/films/capnhatphim/${item.maPhim}`
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
                                          `Bạn có chắc muốn xóa phim ${item.tenPhim} hay không`
                                        )
                                      ) {
                                        dispatch(callDeletePhim(item.maPhim));
                                      }
                                    }}
                                  />
                                </Space>
                                <Space>
                                  <CarryOutOutlined
                                    style={{ color: "green", fontSize: "20px" }}
                                    onClick={() => {
                                      navigate(
                                        `/admin/films/showtimes/${item.maPhim}`
                                      );
                                      dispatch();
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
      )}
    </>
  );
}
