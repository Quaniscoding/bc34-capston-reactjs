import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_LOGIN } from "../../utils/constant";

export default function TrangDatVe() {
  const [dataPhongVe, setDataPhongVe] = useState([]);
  const params = useParams();
  let timeout = null;
  let isLogin = localStorage.getItem(USER_LOGIN);
  const layDataPhongVe = async () => {
    const apiDataPhongVe = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    setDataPhongVe(apiDataPhongVe.data.content.danhSachGhe);
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
    <div className="container">
      <div className="row">
        <div className="col-8 text-center">
          <div className="text-warning display-4">
            <h2>Đặt vé</h2>
          </div>
          <div className="mt-5 text-danger" style={{ fontSize: "25px" }}>
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
            <div className="screen row">
              <div className="col-12">
                <span className="rowNumber d-flex">
                  {" "}
                  <button class="rowNumber">1</button>
                  <button class="rowNumber">2</button>
                  <button class="rowNumber">3</button>
                  <button class="rowNumber">4</button>
                  <button class="rowNumber">5</button>
                  <button class="rowNumber">6</button>
                  <button class="rowNumber">7</button>
                  <button class="rowNumber">8</button>
                  <button class="rowNumber">9</button>
                  <button class="rowNumber">10</button>
                  <button class="rowNumber">11</button>
                  <button class="rowNumber">12</button>
                  <button class="rowNumber">13</button>
                  <button class="rowNumber">14</button>
                  <button class="rowNumber">15</button>
                  <button class="rowNumber">16</button>
                </span>
              </div>
              {dataPhongVe.map((index, danhSachGhe) => {
                return (
                  <div key={index} className="col-1 pr-1">
                    <h1>{danhSachGhe.tenGhe}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-4">
          <div style={{ fontSize: "35px" }} className="text-black">
            <h2>Danh sách ghế bạn chọn</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
