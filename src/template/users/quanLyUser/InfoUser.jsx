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
  const reloadPage = () => {
    window.location.reload(false);
  };
  const [loading, setLoading] = useState(false);
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
              H??? t??n:{" "}
              <Input
                name="hoTen"
                style={{ width: "182.4px" }}
                placeholder="H??? t??n"
                onChange={formik.handleChange}
                value={formik.values.hoTen}
              />
            </h6>
            <h6 className="text-justify pb-2">
              S??? ??i???n tho???i:{" "}
              <Input
                name="soDT"
                style={{ width: "182.4px" }}
                placeholder="S??? ??i???n tho???i"
                onChange={formik.handleChange}
                value={formik.values.soDT}
              />
            </h6>
          </div>
          <div className="col-6">
            <h6 className="text-justify pb-2">
              T??i kho???n:{" "}
              <Input
                name="taiKhoan"
                style={{ width: "182.4px" }}
                placeholder="T??i kho???n"
                onChange={formik.handleChange}
                value={formik.values.taiKhoan}
              />
            </h6>
            <h6 className="text-justify pb-2">
              M???t kh???u:{" "}
              <Input.Password
                name="matKhau"
                style={{ width: "182.4px" }}
                placeholder="M???t kh???u"
                onChange={formik.handleChange}
                value={formik.values.matKhau}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </h6>
            <h6 className="text-justify pb-2">
              Lo???i ng?????i d??ng : {dataUser?.loaiNguoiDung?.tenLoai}
            </h6>
            <div className="text-left">
              <Button
                htmlType="submit"
                className="bg-blue-300"
                icon={<UpdateOutlined />}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  });
                  reloadPage(true);
                }}
              >
                C???p nh???t
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          B???n ph???i ????ng nh???p ????? xem th??ng tin ! <a href="/login">????ng nh???p</a>{" "}
        </>
      )}
    </Form>
  );
}
function callback(key) {}
export default function () {
  const isLogin = getStringLocal("user");
  const params = useParams();
  const reloadPage = () => {
    window.location.reload(false);
  };
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container p-5">
          {isLogin ? (
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Th??ng tin c?? nh??n" key="1">
                <Item>
                  <InfoUser {...params.maLichChieu} />
                </Item>
              </Tabs.TabPane>
              <Tabs.TabPane tab="L???ch s??? ?????t v??" key="2">
                <Item>
                  <KetQuaDatVe {...params.maLichChieu} />
                </Item>
              </Tabs.TabPane>
            </Tabs>
          ) : (
            <>
              B???n ph???i ????ng nh???p ????? mua v?? ! <a href="/login">????ng nh???p</a>
            </>
          )}
        </div>
      )}
    </>
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
                Gi??? chi???u: {moment(ticket.ngayDat).format("hh:mm A ")} Ng??y
                chi???u: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>
                <span className="font-bold">?????a ??i???m: </span>{" "}
                {seat.tenHeThongRap}
              </p>
              <p>
                <span className="font-bold">T??n r???p: </span>
                {seat.tenCumRap} <span className="font-bold">Gh??? </span>
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
              L???ch s??? ?????t v?? kh??ch h??ng
            </h1>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicKetItem()}</div>
        </div>
      </section>
    </div>
  );
}
