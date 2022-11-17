import { Button, Form, Input, Select, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { callUploadUser } from "../../../redux/reducers/userReducer";
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Thêm người dùng thành công",
    description: "Đang chuyển tới trang quản lý",
  });
};
export default function ThemUser() {
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "GP04",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(callUploadUser(values));
    },
  });
  const handleChangleLoaiNguoiDung = (values) => {
    formik.setFieldValue("maLoaiNguoiDung", values);
  };
  const dispatch = useDispatch();
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
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(layDanhSachLoaiNguoiDung);
    }, 1000);
  }, []);
  return (
    <div className="col-9">
      <h1>Thêm người dùng</h1>
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
              />
            </h6>
            <h6 className="text-justify pb-2">
              Họ tên:{" "}
              <Input
                name="hoTen"
                style={{ width: "182.4px" }}
                placeholder="Họ tên"
                onChange={formik.handleChange}
              />
            </h6>
            <h6 className="text-justify pb-2">
              Số điện thoại:{" "}
              <Input
                name="soDT"
                style={{ width: "182.4px" }}
                placeholder="Số điện thoại"
                onChange={formik.handleChange}
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
              />
            </h6>
            <h6 className="text-justify pb-2">
              <Select
                onChange={handleChangleLoaiNguoiDung}
                options={danhSachLoaiNguoiDung?.map((loaiNguoiDung, index) => ({
                  label: loaiNguoiDung.tenLoai,
                  value: loaiNguoiDung.maLoaiNguoiDung,
                }))}
                placeholder="Loại người dùng"
              />
            </h6>
            <div className="text-left">
              <Button
                htmlType="submit"
                className="bg-blue-300"
                onClick={() => {
                  openNotificationWithIcon("success");
                }}
              >
                Thêm
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
