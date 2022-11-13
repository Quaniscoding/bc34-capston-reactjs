import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_LOGIN } from "../../utils/constant";
import "../../assets/css/main.css";
import { Table } from "antd";
export default function TrangDatVe() {
  const [dataPhongVe, setDataPhongVe] = useState([]);
  // console.log(dataPhongVe);
  const params = useParams();
  let timeout = null;
  let isLogin = localStorage.getItem(USER_LOGIN);
  const layDataPhongVe = async () => {
    try {
      const apiDataPhongVe = await axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      });
      setDataPhongVe(apiDataPhongVe.data.content.danhSachGhe);
    } catch (error) {
      console.log(error);
    }
  };
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      layDataPhongVe();
    }, 1000);
  }, [params.maLichChieu]);

  return (
    <div
      className="bookingMovie"
      style={{
        width: "100%",
        height: "100%",
        backgroundSize: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#cdcdc3",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-8 text-center">
              <div className="text-warning display-4">Đặt vé xem phim</div>
              <div className="mt-5 text-light" style={{ fontSize: "25px" }}>
                Màn Hình
              </div>
              <div
                className="mt-2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="justify-content-center">
                  <div className="screen pl-2"></div>
                </div>
                <div className="row pt-5">
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>1</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>2</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>3</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>4</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>5</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>6</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>7</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>8</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>9</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>10</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>11</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>12</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>13</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>14</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>15</h1>
                  <h1 style={{ flex: "0 0 auto", width: "6.25%" }}>16</h1>
                </div>
                <div className="row">
                  {dataPhongVe.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{ flex: "0 0 auto", width: "6.25%" }}
                      >
                        <button
                          className="btn btn-light text-white"
                          style={{ border: "none", background: "none" }}
                        >
                          {item.tenGhe}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-4">
              <div style={{ fontSize: "35px" }} className="text-danger">
                Danh sách ghế bạn chọn
              </div>
              <div>
                <div className="mt-5">
                  <button
                    className="gheDuocChon"
                    style={{ marginLeft: "-30px" }}
                  />
                  <span className="text-light" style={{ fontSize: 30 }}>
                    Ghế đã đặt
                  </span>
                  <br />
                  <button className="gheDangChon" />
                  <span className="text-light" style={{ fontSize: 30 }}>
                    Ghế đang đặt
                  </span>
                  <br />
                  <button className="ghe" style={{ marginLeft: 0 }} />
                  <span className="text-light" style={{ fontSize: 30 }}>
                    Ghế chưa đặt
                  </span>
                </div>
                <div className=" pl-3 mt-5">
                  <table className="table" border={2}>
                    <thead>
                      <tr className="text-light" style={{ fontSize: 30 }}>
                        <th>Số ghế</th>
                        <th>Giá</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody className="text-warning" />
                    <tfoot>
                      <tr className="text-warning">
                        <td />
                        <td>Tổng Tiền: </td>
                        <td>0</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
