import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { Card } from "antd";
const { Meta } = Card;
export default function InfoUser() {
  const [dataUser, setDataUser] = useState([]);
  const [dataDatVe, setDataDatVe] = useState([]);
  const [dataRapDat, setDataRapDat] = useState([]);
  console.log(dataRapDat);
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
        setDataDatVe(res.data.content.thongTinDatVe[0]);
      });
      axios({
        method: "POST",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
          Authorization: `Bearer ${getStringLocal(USER_LOGIN)}`,
        },
      }).then((res) => {
        setDataRapDat(res.data.content.thongTinDatVe[0].danhSachGhe);
      });
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
    <div className="container">
      {isLogin ? (
        <div className="row pt-5 bg-orange-600">
          <div className="col-6">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "#6fc7f7",
                height: "50px",
                borderRadius: "5px",
              }}
            >
              <h1 style={{ color: "white" }}>Thông tin chung</h1>
            </div>
            <hr />
            <p style={{ text: "bold" }}>
              Xin chào, <span style={{ color: "red" }}>{dataUser.hoTen} </span>
              <br />
            </p>
            <span>
              Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của
              mình.
            </span>
            <div
              style={{
                borderTop: " 3px solid black",
                borderBottom: " 3px solid black",
                borderLeft: " 3px solid black",
                borderRight: " 3px solid black",
              }}
            >
              <div className="row">
                <h4 style={{ color: "brown" }}>Thông tin tài khoản</h4>
                <hr />
                <p className="text-left pl-5">Tên: {dataUser.hoTen}</p>
                <br />
                <p className="text-left pl-5">Email: {dataUser.email}</p>
                <br />
                <p className="text-left pl-5">
                  Tên đăng nhập: {dataUser.taiKhoan}
                </p>
                <p className="text-left pl-5">Điện thoại: {dataUser.soDT}</p>
                <p className="text-left pl-5">
                  Loại người dùng: {dataUser.loaiNguoiDung.tenLoai}
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "#6fc7f7",
                height: "50px",
                borderRadius: "5px",
              }}
            >
              <h1 style={{ color: "white" }}>Lịch sử đặt vé</h1>
              <hr />

              <div className="row">
                <div className="col-12 ">
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-4 d-none d-sm-block">
                          <a href="">
                            <img
                              src={dataDatVe.hinhAnh}
                              alt=""
                              className="img-fluid rounded"
                            />
                          </a>
                        </div>
                        <div className="col-8 ml-n2">
                          <div className="card-title mb-1">
                            <h4 className="text-left">{dataDatVe.tenPhim}</h4>
                          </div>
                          <div className="card-text  small text-muted mb-0">
                            <p className="text-left">
                              Rạp: {dataRapDat[0]?.tenHeThongRap}
                            </p>
                            <p className="text-left">
                              Tên rạp: {dataRapDat[0]?.tenRap}
                            </p>
                            <p className="text-left">
                              Ghế đã đặt:
                              {dataRapDat?.map((item, index) => {
                                return <>{item.tenGhe}, </>;
                              })}{" "}
                            </p>
                            <p className="text-left">
                              {dataDatVe.thongTinDatVe}
                            </p>
                            <p className="text-left">
                              Thời gian: {dataDatVe?.thoiLuongPhim} phút
                            </p>
                            <h5 className="text-left">
                              Giá vé: {dataDatVe?.giaVe?.toLocaleString()}đ
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
