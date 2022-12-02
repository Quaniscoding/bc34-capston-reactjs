import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/css/embedvideo.css";
import Embedvideo from "./embedvideo";
import moment from "moment/moment";
import { Space, Button, Modal } from "antd";
import {
  HomeOutlined,
  RightOutlined,
  PrinterOutlined,
  VideoCameraTwoTone,
  StarFilled,
} from "@ant-design/icons";
import { callGetData } from "../../redux/reducers/dataThongTinLichChieu";
import { useDispatch, useSelector } from "react-redux";
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
  const [chiTietPhim, setChiTietPhim] = useState({});
  const data = useSelector((state) => state.dataThongTinLichChieu.data);
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
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      dispatch(callGetData(params.maPhim));
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
    }, 1000);
  }, [params.maPhim]);
  if (data != "") {
    let datVe = () => {
      {
        return (
          <div>
            {data.heThongRapChieu.map((item, index) => {
              return (
                <div
                  className="mb-2"
                  style={{
                    border: "1.5px solid gray",
                    borderRadius: "5px",
                  }}
                >
                  <div className="d-flex pt-3">
                    <div>
                      {" "}
                      <img
                        key={index}
                        src={item.cumRapChieu[0].hinhAnh}
                        height="50px"
                        width="50px"
                      />
                    </div>
                    <div className="pl-2">
                      <h5 key={index}>{item.maHeThongRap} </h5>
                      <span key={index}>{item.cumRapChieu[0].diaChi}</span>
                    </div>
                  </div>
                  <div>
                    <a
                      key={index}
                      onClick={() => {
                        navigate(
                          `/datve/${item.cumRapChieu[0].lichChieuPhim[0].maLichChieu}`
                        );
                      }}
                    >
                      <h3 className="text-green-500 pl-5">
                        {moment(
                          item.cumRapChieu[0].lichChieuPhim[0].ngayChieuGioChieu
                        ).format("hh:mm")}
                      </h3>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    };
    return (
      <>
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
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
                <div className="col-6">
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
                      <Button type="default">
                        <a href="#datVe">
                          <Space>
                            <PrinterOutlined style={{ paddingBottom: "5px" }} />
                            Đặt vé
                          </Space>
                        </a>
                      </Button>
                    </div>
                    <div
                      className="pl-5"
                      style={{ flex: "0 0 auto", width: "20%" }}
                    >
                      <>
                        <Button
                          type="default"
                          onClick={() => {
                            showModal();
                          }}
                        >
                          <Space>
                            <VideoCameraTwoTone
                              style={{ paddingBottom: "5px" }}
                            />
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
                <div className="col-3 set-size charts-container">
                  <div className="circle-wrap">
                    <div className="circle">
                      <div className="mask full"></div>
                      <div className="mask half"></div>
                      <div className="inside-circle">
                        {" "}
                        {chiTietPhim.danhGia}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex" style={{ paddingLeft: "1.5rem" }}>
                    <span className="pl-1">
                      <StarFilled style={{ color: "red" }} />
                    </span>
                    <span className="pl-1">
                      <StarFilled style={{ color: "red" }} />
                    </span>
                    <span className="pl-1">
                      <StarFilled style={{ color: "red" }} />
                    </span>
                    <span className="pl-1">
                      <StarFilled style={{ color: "red" }} />
                    </span>
                    <span className="pl-1">
                      <StarFilled style={{ color: "red" }} />
                    </span>
                  </div>
                </div>
              </div>
              <div className=" pt-5 text-left" style={{ margin: "20px 229px" }}>
                <div className="row">
                  <div
                    className="col-4 pt-3"
                    style={{ backgroundColor: "white" }}
                  >
                    {dataRap?.map((item, index) => {
                      return (
                        <h3
                          key={index}
                          className="d-flex align-items-center"
                          style={{
                            border: "1.5px solid gray",
                            borderRadius: "5px",
                          }}
                        >
                          <img width={50} src={item.logo} />
                          <span className="pl-2">{item.tenHeThongRap}</span>
                        </h3>
                      );
                    })}
                  </div>
                  <div
                    className="col-4  pt-3"
                    style={{ backgroundColor: "white" }}
                  >
                    <div id="datVe">{datVe()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
