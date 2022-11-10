//rfc
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/embedvideo.css";
import Embedvideo from "./embedvideo";
import moment from "moment/moment";
import { Space, Button, Modal } from "antd";
import {
  HomeOutlined,
  RightOutlined,
  PrinterOutlined,
  VideoCameraTwoTone,
} from "@ant-design/icons";
export default function ChiTietPhim() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  const [dataThongTinLichChieu, setDataThongTinLichChieu] = useState([]);
  const [chiTietPhim, setChiTietPhim] = useState({});
  const params = useParams();
  const navigate = useNavigate();
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
  const getApiLichChieu = async () => {
    const apiLichChieu = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${params.maPhim}`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    setDataThongTinLichChieu(
      apiLichChieu.data.content.heThongRapChieu[0].cumRapChieu[0]
        .lichChieuPhim[0]
    );
  };

  const layLichChieu = (maHeThongRap) => {
    axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP04`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    }).then((result) => {
      setLichChieu(result.data.content);
    });
  };
  useEffect(() => {
    getApiLichChieu();
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
  return (
    <div className="container">
      <div className="row text-left mt-5">
        <div className="col-12">
          <ul className="row">
            <li style={{ flex: "0 0 auto", width: "5%" }}>
              <Space>
                <a href="">
                  <HomeOutlined
                    style={{ fontSize: "25px", color: "black" }}
                    onClick={() => navigate(`/trangchu`)}
                  />
                </a>
                <RightOutlined
                  style={{ fontSize: "25px", fontWeight: "bold" }}
                />
              </Space>
            </li>
            <li className="col-9">
              {" "}
              <p
                style={{
                  gap: "8px",
                  paddingTop: "3px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Chi Tiết Phim: {chiTietPhim.tenPhim}
              </p>
            </li>
          </ul>
        </div>
        <div
          className="col-12"
          style={{
            borderBottom: "2px solid #222",
            paddingBottom: "10px",
          }}
        >
          <h1>Nội dung phim</h1>
        </div>
        <div className="row col-12 pt-4">
          <div className="col-3">
            <img
              src={chiTietPhim.hinhAnh}
              style={{ width: "200px", height: "250px" }}
            />
          </div>
          <div className="col-9">
            <h2
              style={{
                borderBottom: "1px solid #222",
              }}
            >
              {chiTietPhim.tenPhim}
            </h2>
            <p>Đánh giá: {chiTietPhim.danhGia} điểm</p>
            <p>Mô tả: {chiTietPhim.moTa}</p>
            <div className="button row">
              <div style={{ flex: "0 0 auto", width: "15%" }}>
                <Button
                  type="default"
                  onClick={() => {
                    navigate(`/datve/${dataThongTinLichChieu.maLichChieu}`);
                  }}
                >
                  <Space>
                    <PrinterOutlined style={{ paddingBottom: "5px" }} />
                    Đặt vé
                  </Space>
                </Button>
              </div>
              <div style={{ flex: "0 0 auto", width: "20%" }}>
                <>
                  <Button type="default" onClick={showModal}>
                    <Space>
                      <VideoCameraTwoTone style={{ paddingBottom: "5px" }} />
                      Xem trailer
                    </Space>
                  </Button>
                  <Modal
                    title="Trailer phim"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={650}
                  >
                    <div>
                      <Embedvideo url={chiTietPhim.trailer} />
                    </div>
                  </Modal>
                </>
              </div>
            </div>
          </div>
        </div>

        <div className=" pt-5 text-left row">
          <div className="col-3">
            {dataRap?.map((item, index) => {
              return (
                <h3 key={index}>
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
