import axios from "axios";
import { Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callUpdateThongTinUserAdmin } from "../../../redux/reducers/userReducer";
import { getStringLocal } from "../../../utils/config";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { USER_LOGIN } from "../../../utils/constant";
import { Button, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import { callGetDanhSachUser } from "../../../redux/reducers/danhSachUser";
export default function EditUser() {
  const params = useParams();
  const [danhSachLoaiNguoiDung, setDanhSachLoaiNguoiDung] = useState([]);
  let danhSachUser = useSelector((state) => state.danhSachUser.danhSachUser);
  const dispatch = useDispatch();
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
      console.log("value", values);
      dispatch(callUpdateThongTinUserAdmin(values));
    },
  });
  let isLogin = getStringLocal(USER_LOGIN);
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }

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
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetDanhSachUser(params.soDT));
      dispatch(layDanhSachLoaiNguoiDung);
    }, 1000);
  }, [params]);
  return (
    <div className="col-9">
      <h1>Cập nhật thông tin người dùng</h1>
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
                options={danhSachLoaiNguoiDung?.map((loaiNguoiDung, index) => ({
                  label: loaiNguoiDung.tenLoai,
                  value: loaiNguoiDung.maLoaiNguoiDung,
                }))}
                placeholder="Loại người dùng"
                value={formik?.values?.maLoaiNguoiDung}
              />
            </h6>
            <div className="text-left">
              <Button htmlType="submit" className="bg-blue-300">
                Cập nhật
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
