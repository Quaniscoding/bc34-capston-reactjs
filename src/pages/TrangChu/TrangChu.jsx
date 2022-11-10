import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callGetDanhSachPhim } from "../../redux/reducers/danhSachPhimReducer";
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
import { useNavigate, useParams } from "react-router-dom";
const contentStyle = {
  width: "800px",
};
export default function HomeTicketMovie() {
  const [dataRap, setDataRap] = useState([]);
  const [dataLichChieu, setLichChieu] = useState([]);
  const [dataThongTinLichChieu, setDataThongTinLichChieu] = useState([]);
  let ditpatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  let timeout = null;
  let isLogin = localStorage.getItem(USER_LOGIN);
  let danhSachPhim = useSelector(
    (state) => state.danhSachPhimReducer.danhSachPhim
  );

  let banner = useSelector((state) => state.bannerReducer.danhSachBanner);
  if (timeout != null) {
    clearTimeout(timeout);
  }

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
  // const layThongTinLichChieu = (maLichChieu) => {
  //   axios({
  //     method: "GET",
  //     url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maLichChieu}`,
  //     headers: {
  //       TokenCybersoft:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
  //     },
  //   }).then((result) => {
  //     setDataThongTinLichChieu(result.data.content);
  //   });
  // };
  const getApiLichChieu = async () => {
    const apiLichChieu = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${danhSachPhim.maPhim}`,
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
  useEffect(() => {
    timeout = setTimeout(() => {
      getApiLichChieu();
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
    }, 2000);
  }, []);
  return (
    <div className="container main-container">
      {isLogin ? (
        <div className="carousel-main">
          <Carousel autoplay>
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
                            <div>
                              <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={() =>
                                  navigate(`/chitietphim/${item.maPhim}`)
                                }
                              >
                                Chi tiết phim
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={() => {
                                  console.log(item.maPhim);
                                  navigate(
                                    `/datve/${dataThongTinLichChieu.maLichChieu}`
                                  );
                                }}
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
        <div>
          <Result
            status="404"
            title="Bạn phải đăng nhập để thấy danh sách phim"
          />
        </div>
      )}
      {isLogin ? (
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
      ) : (
        ""
      )}
    </div>
  );
}
