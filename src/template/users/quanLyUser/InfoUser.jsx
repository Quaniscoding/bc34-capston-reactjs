import axios from "axios";
import React, { useEffect, useState } from "react";
import { getStringLocal } from "../../../utils/config";
import { USER_LOGIN } from "../../../utils/constant";
import { Button, Form, Input, Tabs } from "antd";
import { useParams } from "react-router-dom";
import Item from "antd/lib/list/Item";
import moment from "moment";
import _ from "lodash";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { UpdateOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { callUpdateThongTinUser } from "../../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
function InfoUser() {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: dataUser.taiKhoan,
      matKhau: dataUser.matKhau,
      email: dataUser.email,
      soDT: dataUser.soDT,
      maNhom: "GP00",
      maLoaiNguoiDung: dataUser.maLoaiNguoiDung,
      hoTen: dataUser.hoTen,
    },
    onSubmit: (values) => {
      dispatch(callUpdateThongTinUser(values));
    },
  });

  let isLogin = getStringLocal(USER_LOGIN);
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      axios({
        method: "POST",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
          Authorization: `Bearer ${getStringLocal(USER_LOGIN)}`,
        },
      }).then((res) => {
        setDataUser(res.data.content);
      });
    }, 1000);
  }, []);
  return (
    <Form className="container" onSubmitCapture={formik.handleSubmit}>
      {isLogin ? (
        <div className="row">
          <div className="col-6">
            <h6 className="text-justify pb-2">
              Email:{" "}
              <Input
                name="email"
                style={{ width: "182.4px" }}
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </h6>
            <h6 className="text-justify pb-2">
              Họ tên:{" "}
              <Input
                name="hoTen"
                style={{ width: "182.4px" }}
                placeholder="Họ tên"
                onChange={formik.handleChange}
                value={formik.values.hoTen}
              />
            </h6>
            <h6 className="text-justify pb-2">
              Số điện thoại:{" "}
              <Input
                name="soDT"
                style={{ width: "182.4px" }}
                placeholder="Số điện thoại"
                onChange={formik.handleChange}
                value={formik.values.soDT}
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
                value={formik.values.taiKhoan}
              />
            </h6>
            <h6 className="text-justify pb-2">
              Mật khẩu:{" "}
              <Input.Password
                name="matKhau"
                style={{ width: "182.4px" }}
                placeholder="Mật khẩu"
                onChange={formik.handleChange}
                value={formik.values.matKhau}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </h6>
            <h6 className="text-justify pb-2">
              Loại người dùng : {dataUser?.loaiNguoiDung?.tenLoai}
            </h6>
            <div className="text-left">
              <Button
                htmlType="submit"
                className="bg-blue-300"
                icon={<UpdateOutlined />}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          Bạn phải đăng nhập để xem thông tin ! <a href="/login">Đăng nhập</a>{" "}
        </>
      )}
    </Form>
  );
}
function callback(key) {}
export default function () {
  const isLogin = getStringLocal("user");
  const params = useParams();
  return (
    <div className="container p-5">
      {isLogin ? (
        <Tabs defaultActiveKey="1" onChange={callback}>
          <Tabs.TabPane tab="Thông tin cá nhân" key="1">
            <Item>
              <InfoUser {...params.maLichChieu} />
            </Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Lịch sử đặt vé" key="2">
            <Item>
              <KetQuaDatVe {...params.maLichChieu} />
            </Item>
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <>
          Bạn phải đăng nhập để mua vé ! <a href="/login">Đăng nhập</a>
        </>
      )}
    </div>
  );
}
function KetQuaDatVe() {
  const [dataUser, setDataUser] = useState({});
  const params = useParams();
  let timeout = null;

  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      axios({
        method: "POST",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
          Authorization: `Bearer ${getStringLocal(USER_LOGIN)}`,
        },
      }).then((res) => {
        setDataUser(res.data.content);
      });
    }, 1000);
  }, [params.maLichChieu]);
  const renderTicKetItem = function () {
    return dataUser.thongTinDatVe?.map((ticket, index) => {
      const seat = _.first(ticket?.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full " key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h6 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h6>
              <p className="text-gray-500">
                Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A ")} Ngày
                chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>
                <span className="font-bold">Địa điểm: </span>{" "}
                {seat.tenHeThongRap}
              </p>
              <p>
                <span className="font-bold">Tên rạp: </span>
                {seat.tenCumRap} <span className="font-bold">Ghế </span>
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-green-600" key={index}>
                      [{ghe.tenGhe}]{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Lịch sử đặt vé khách hàng
            </h1>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicKetItem()}</div>
        </div>
      </section>
    </div>
  );
}
