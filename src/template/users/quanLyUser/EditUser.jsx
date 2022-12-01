import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { callUpdateThongTinUserAdmin } from "../../../redux/reducers/userReducer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { callGetDanhSachUser } from "../../../redux/reducers/danhSachUser";

export default function EditUser() {
  const params = useParams();
  const dispatch = useDispatch();
  let danhSachUser = useSelector((state) => state.danhSachUser.danhSachUser);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: danhSachUser[0]?.taiKhoan,
      matKhau: danhSachUser[0]?.matKhau,
      email: danhSachUser[0]?.email,
      soDT: danhSachUser[0]?.soDT,
      maNhom: "GP04",
      maLoaiNguoiDung: danhSachUser[0]?.maLoaiNguoiDung,
      hoTen: danhSachUser[0]?.hoTen,
    },
    onSubmit: (values) => {
      dispatch(callUpdateThongTinUserAdmin(values));
    },
  });
  const [danhSachLoaiNguoiDung, setDanhSachLoaiNguoiDung] = useState([]);
  const layDanhSachLoaiNguoiDung = async () => {
    try {
      await axios({
        method: "GET",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      }).then((res) => {
        setDanhSachLoaiNguoiDung(res.data.content);
      });
    } catch (error) {
      console.log(error);
    }
  };
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const reloadPage = () => {
    window.location.reload(false);
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      dispatch(callGetDanhSachUser(params.soDT));
      dispatch(layDanhSachLoaiNguoiDung);
    }, 1000);
  }, [params]);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="col-9">
          <h1>Cập nhật người dùng</h1>
          <Form onSubmitCapture={formik.handleSubmit}>
            <div className="row container">
              <div className="col-6">
                <h6 className="text-justify pb-2">
                  Email:{" "}
                  <Input
                    name="email"
                    style={{ width: "182.4px" }}
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik?.values?.email}
                  />
                </h6>
                <h6 className="text-justify pb-2">
                  Họ tên:{" "}
                  <Input
                    name="hoTen"
                    style={{ width: "182.4px" }}
                    placeholder="Họ tên"
                    onChange={formik.handleChange}
                    value={formik?.values?.hoTen}
                  />
                </h6>
                <h6 className="text-justify pb-2">
                  Số điện thoại:{" "}
                  <Input
                    name="soDT"
                    style={{ width: "182.4px" }}
                    placeholder="Số điện thoại"
                    onChange={formik.handleChange}
                    value={formik?.values?.soDT}
                  />
                </h6>
              </div>
              <div className="col-6">
                <h6 className="text-justify pb-2">
                  Tài khoản:{" "}
                  <Input
                    name="taiKhoan"
                    style={{ width: "182.4px" }}
                    placeholder="Tài khoản"
                    onChange={formik.handleChange}
                    value={formik?.values?.taiKhoan}
                  />
                </h6>
                <h6 className="text-justify pb-2">
                  Mật khẩu:{" "}
                  <Input.Password
                    name="matKhau"
                    style={{ width: "182.4px" }}
                    placeholder="Mật khẩu"
                    onChange={formik.handleChange}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    value={formik?.values?.matKhau}
                  />
                </h6>
                <h6 className="text-justify pb-2">
                  <Select
                    options={danhSachLoaiNguoiDung?.map(
                      (loaiNguoiDung, index) => ({
                        label: loaiNguoiDung.tenLoai,
                        value: loaiNguoiDung.maLoaiNguoiDung,
                      })
                    )}
                    value={formik?.values?.maLoaiNguoiDung}
                    placeholder="Loại người dùng"
                  />
                </h6>
                <div className="text-left">
                  <Button
                    htmlType="submit"
                    className="bg-blue-300"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                      });
                      reloadPage(true);
                    }}
                  >
                    Cập nhật người dùng
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
