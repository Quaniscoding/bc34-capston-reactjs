//rfc
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "../assets/css/embedvideo.css";
import Embedvideo from "./embedvideo";
import { USER_LOGIN } from "../utils/constant";
import moment from "moment/moment";
export default function ChiTietPhim() {
  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  let isLogin = localStorage.getItem(USER_LOGIN);
  const params = useParams();
  const navigate = useNavigate();
  const [chiTietPhim, setChiTietPhim] = useState({});
  const getApiChiTiet = async () => {
    const apiChiTiet = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${params.maPhim}`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    setChiTietPhim(apiChiTiet.data.content);
  };

  useEffect(() => {
    getApiChiTiet();
    axios({
      method: "GET",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    }).then((result) => {
      setDataRap(result.data.content);
    });
  }, [params.maPhim]);
  const layLichChieu = (maHeThongRap) => {
    axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    }).then((result) => {
      setLichChieu(result.data.content);
    });
  };
  return (
    <div className="container">
      <h1>Chi Tiết Phim: {chiTietPhim.tenPhim}</h1>
      <div className="row text-left mt-5">
        <div className="col-4">
          <img
            src={chiTietPhim.hinhAnh}
            style={{ width: "300px", height: "400px" }}
          />
        </div>
        <div className="col-8">
          <h2>{chiTietPhim.tenPhim}</h2>
          <p>Đánh giá: {chiTietPhim.danhGia} điểm</p>
          <p>Mô tả: {chiTietPhim.moTa}</p>
          <button
            type="button"
            class="btn btn-outline-info"
            onClick={() => {
              navigate(`/datve/${chiTietPhim.maPhim}`);
            }}
          >
            Đặt vé
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={() => navigate(`/trangchu`)}
          >
            Về trang chủ
          </button>
        </div>
        <div className="col-12">
          <Embedvideo url={chiTietPhim.trailer} />
        </div>
        <div className=" pt-5 text-left row">
          <div className="col-3">
            {dataRap?.map((item) => {
              return (
                <h3>
                  <img
                    onClick={() => layLichChieu(item.maHeThongRap)}
                    width={50}
                    src={item.logo}
                  />
                </h3>
              );
            })}
          </div>
          <div className="col-9">
            {dataLichChieu?.map((item) => {
              return item.lstCumRap.map((itemCumRap) => {
                return (
                  <div className="row">
                    <div className="d-flex col-6">
                      <img height={"50px"} src={itemCumRap.hinhAnh} />
                      <h5>{itemCumRap.tenCumRap}</h5>
                    </div>
                    <div className="col-6">
                      {itemCumRap.danhSachPhim.map((itemPhim) => {
                        return (
                          <div>
                            <h5>{itemPhim.tenPhim}</h5>
                            <p style={{ color: "gray" }}>
                              {itemPhim.lstLichChieuTheoPhim.map(
                                (itemLichChieu) => {
                                  let dateNow = new Date();
                                  let ngayChieu = new Date(
                                    itemLichChieu.ngayChieuGioChieu
                                  );

                                  return (
                                    <>
                                      {ngayChieu >= dateNow &&
                                        moment(
                                          itemLichChieu.ngayChieuGioChieu
                                        ).format("HH:mm") + "-"}{" "}
                                    </>
                                  );
                                }
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
