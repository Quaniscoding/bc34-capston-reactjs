import React, { useEffect, useState } from "react";
import { Carousel, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callGetDanhSachPhim } from "../../redux/reducers/danhSachPhimReducer";
import useRoute from "../../hooks/useRoute";
import { Result } from "antd";
import { callGetDanhSachBanner } from "../../redux/reducers/bannerReducer.js";
import { callgetDanhSachThongTinHeThongRap } from "../../redux/reducers/thongTinHeThongRapReducer.js";
import { callGetDanhSachThongTinChieuHeThongRap } from "../../redux/reducers/layThongTinChieuHeThongRap.js";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { USER_LOGIN } from "../../utils/constant";
import moment from "moment/moment";
import { MDBRipple } from "mdb-react-ui-kit";
const { Meta } = Card;
const contentStyle = {
  height: "160px",
  color: "#4b3e2e",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "50%",
};
export default function HomeTicketMovie() {
  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  let ditpatch = useDispatch();
  let timeout = null;
  // let isLogin = localStorage.getItem(USER_LOGIN);
  let isLogin = true;
  let danhSachPhim = useSelector(
    (state) => state.danhSachPhimReducer.danhSachPhim
  );
  let banner = useSelector((state) => state.bannerReducer.danhSachBanner);
  let danhSachRap = useSelector(
    (state) => state.thongTinHeThongRap.danhSachThongTinHeThongRap
  );
  let thongTinChieu = useSelector(
    (state) => state.thongTinChieuHeThongRap.danhSachThongTinChieuHeThongRap
  );
  const {
    params,
    navigate,
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.has("tenPhim")
    ? searchParams.get("tenPhim")
    : "";
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
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
  }, [keyWord]);
  const layLichChieu = (maHeThongRap) => {
    axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP03`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    }).then((result) => {
      setLichChieu(result.data.content);
    });
  };
  return (
    <div className="container main-container">
      {isLogin ? (
        <div style={{ width: "950px" }}>
          <Carousel autoplay style={{ paddingLeft: "35%" }}>
            {banner.map((item, index) => {
              return (
                <img key={index} src={item.hinhAnh} style={{ contentStyle }} />
              );
            })}
          </Carousel>
        </div>
      ) : (
        ""
      )}
      {isLogin ? (
        <div className="row pt-5">
          <div className="home-movie-selection">
            <div className="home-title">
              <h2 style={{ color: "transparent" }}>mo</h2>
            </div>
          </div>
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

                            <h3 className="text-white mb-0">
                              Đánh giá: {item.danhGia} điểm
                            </h3>
                            <div>
                              <button
                                type="button"
                                className="btn btn-outline-light pl-2"
                              >
                                Chi tiết phim
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-light"
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
        </div>
      ) : (
        <Result
          status="404"
          title="Bạn phải đăng nhập để thấy danh sách phim"
        />
      )}
      <div className="home-movie-selection">
        <div className="home-title-2">
          <h2 style={{ color: "black" }}>THEATER LIST</h2>
        </div>
      </div>
      {isLogin ? (
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
      ) : (
        ""
      )}
    </div>
  );
}
