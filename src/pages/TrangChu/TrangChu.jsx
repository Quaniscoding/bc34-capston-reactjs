import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callGetDanhSachPhim } from "../../redux/reducers/danhSachPhimReducer";
import { callGetDanhSachBanner } from "../../redux/reducers/bannerReducer.js";
import { callgetDanhSachThongTinHeThongRap } from "../../redux/reducers/thongTinHeThongRapReducer.js";
import { callGetDanhSachThongTinChieuHeThongRap } from "../../redux/reducers/layThongTinChieuHeThongRap.js";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import moment from "moment/moment";
import { MDBRipple } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const contentStyle = {
  width: "800px",
};
export default function HomeTicketMovie() {
  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  let ditpatch = useDispatch();
  const navigate = useNavigate();
  let timeout = null;
  let danhSachPhim = useSelector(
    (state) => state.danhSachPhimReducer.danhSachPhim
  );
  let banner = useSelector((state) => state.bannerReducer.danhSachBanner);
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const layLichChieu = async (maHeThongRap) => {
    try {
      await axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP04`,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      }).then((result) => {
        setLichChieu(result.data.content);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      ditpatch(callGetDanhSachPhim);
      ditpatch(callGetDanhSachBanner);
      ditpatch(callgetDanhSachThongTinHeThongRap);
      ditpatch(callGetDanhSachThongTinChieuHeThongRap);
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
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container main-container">
          <div className="carousel-main">
            <Carousel autoplay>
              {banner.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={item.hinhAnh}
                    style={{ contentStyle }}
                  />
                );
              })}
            </Carousel>
          </div>
          <div className="row pt-5">
            <div className="home-movie-selection">
              <div className="home-title">
                <h2 style={{ color: "transparent" }}>mo</h2>
              </div>
            </div>
            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                autoPlay={true}
                items={4}
              >
                {danhSachPhim.map((item, index) => {
                  return (
                    <MDBRipple
                      key={index}
                      className="bg-image"
                      rippleTag="div"
                      rippleColor="dark"
                    >
                      <img
                        src={item.hinhAnh}
                        className=""
                        style={{ width: "300px", height: "400px" }}
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                        ></div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          >
                            <div className="h-100">
                              <div className="imgPhim">
                                <h4
                                  className="align-items-center"
                                  style={{ color: "turquoise" }}
                                >
                                  Tên phim: {item.tenPhim}
                                </h4>
                                <h5 className="text-white mb-0">
                                  Đánh giá: {item.danhGia} điểm
                                </h5>
                                <div className="pt-2">
                                  <button
                                    type="button"
                                    className="btn btn-outline-light "
                                    onClick={() =>
                                      navigate(`/chitietphim/${item.maPhim}`)
                                    }
                                  >
                                    Đặt vé
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </MDBRipple>
                  );
                })}
              </OwlCarousel>
            )}
          </div>
          <div className=" pt-5 text-left row" id="cumrap">
            <div className="col-2">
              {dataRap.map((item, index) => {
                return (
                  <h3 key={index}>
                    <img
                      onClick={() => {
                        layLichChieu(item.maHeThongRap);
                      }}
                      style={{ width: "50px", height: "50px" }}
                      src={item.logo}
                    />
                  </h3>
                );
              })}
            </div>
            <div className="col-6">
              {dataLichChieu.map((item) => {
                return item.lstCumRap.map((itemCumRap) => {
                  return (
                    <div className="row">
                      <div className="d-flex col-6">
                        <a style={{ cursor: "pointer" }}>
                          <h5>{itemCumRap.tenCumRap}</h5>
                          <span>{itemCumRap.diaChi}</span>
                        </a>
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
      )}
    </>
  );
}
