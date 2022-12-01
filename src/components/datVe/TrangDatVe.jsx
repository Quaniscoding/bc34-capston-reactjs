import {
  CheckOutlined,
  CloseOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/main.css";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { datVeXemPhim } from "../../redux/reducers/datVe/DatVe";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { Tabs } from "antd";
import moment from "moment";
import Item from "antd/lib/list/Item";
import { Button } from "antd";
function TrangDatVe() {
  const reloadPage = () => {
    window.location.reload(false);
  };
  let dispatch = useDispatch();
  const [dataUser, setDataUser] = useState([]);
  const [dataPhongVe, setDataPhongVe] = useState([]);
  const params = useParams();
  let timeout = null;
  let danhSachGheDangDat = useSelector(
    (state) => state.QuanLyDatVeReducer.danhSachGheDangDat
  );
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
      setDataPhongVe(apiDataPhongVe.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      layDataPhongVe();
      datVeXemPhim();
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
  const renderGhe = () => {
    let danhSachGhe = dataPhongVe.danhSachGhe;
    return danhSachGhe?.map((ghe, index) => {
      let gheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let gheDaDat = ghe.taiKhoanNguoiDat == true ? "gheDaDat" : "";
      let gheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (indexGheDangDat != -1) {
        gheDaDat = "gheDangDat";
      }
      let gheDaDuocDat = "";
      if (dataUser.taiKhoan === ghe.taiKhoanNguoiDat) {
        gheDaDuocDat = "gheDaDuocDat";
      }
      let disabled = false;
      if (ghe.daDat == true) {
        disabled = "gheDaDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: "DAT_VE",
                gheDuocChon: ghe,
              });
            }}
            className={`text-center ghe cursor-no-drop ${gheVip} ${gheDaDat} ${gheDangDat} ${disabled} ${gheDaDuocDat} `}
            disabled={ghe.daDat}
            key={index}
          >
            {ghe.daDat ? (
              <CloseOutlined
                style={{ marginBottom: 7.5, fontWeight: "bold" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="container min-h-screen mt-2">
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div className="flex flex-col justify-center mt-5">
            <div
              className="bg-black"
              style={{ width: "80%", height: "15" }}
            ></div>
            <div className="trapezoid" style={{ height: "15px" }}>
              <h3 className="text-black mt-3 text-center">Màn hình</h3>
            </div>
            <div>{renderGhe()}</div>
          </div>
          <div className="mt-5 flex justify-content-center">
            <table className="table" style={{ border: "none" }}>
              <thead>
                <tr>
                  <td>Ghế chưa đặt</td>
                  <td>Ghế đang đặt</td>
                  <td>Ghế vip</td>
                  <td>Ghế đã đặt</td>
                  <td>Ghế bạn đặt</td>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="ghe text-center"></button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center"></button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center"></button>
                  </td>
                  <td>
                    <button disabled className="ghe gheDaDat text-center">
                      <CloseOutlined
                        style={{ marginBottom: 5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      <CloseOutlined />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-4 pl-3">
          <h3 className="text-center text-red">
            {danhSachGheDangDat
              ?.reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ
          </h3>
          <hr />
          <h3 className="text-left">
            Tên phim: {dataPhongVe?.thongTinPhim?.tenPhim}
          </h3>

          <p className="text-left">
            Địa điểm: {dataPhongVe?.thongTinPhim?.tenCumRap}
          </p>
          <p className="text-left">
            Giờ chiếu: {dataPhongVe?.thongTinPhim?.gioChieu}
          </p>
          <p className="text-left">
            Ngày chiếu:
            {dataPhongVe?.thongTinPhim?.ngayChieu}
          </p>
          <hr />
          <div className="row">
            <span className="text-left col-4">Ghế bạn chọn : </span>
            {_.sortBy(danhSachGheDangDat, ["stt"]).map((ghe, index) => {
              return (
                <span key={index} className=" col-1">
                  {ghe.stt}
                </span>
              );
            })}
            <span className="col-1" style={{ color: "green" }}>
              {danhSachGheDangDat
                ?.reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}
              Đ
            </span>
          </div>
          <hr />
          <div className="row pb-5">
            <h6>Thông tin người đặt </h6>
            <span className="col-8 text-left pb-2">
              Email: {dataUser.email}
            </span>
            <span className="col-8 text-left">
              Số điện thoại: {dataUser.soDT}
            </span>
          </div>
          <div className="text-left mb-0" style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = params.maLichChieu;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                dispatch(datVeXemPhim(thongTinDatVe));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                });
                reloadPage(true);
              }}
            >
              Đặt vé
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function callback(key) {}
export default function () {
  const isLogin = getStringLocal(USER_LOGIN);
  const params = useParams();
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
  }, [params]);
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
              <Tabs.TabPane tab="Chọn ghế thanh toán" key="1">
                <Item>
                  <TrangDatVe {...params.maLichChieu} />
                </Item>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Kết quả đặt vé" key="2">
                <Item>
                  <KetQuaDatVe {...params.maLichChieu} />
                </Item>
              </Tabs.TabPane>
            </Tabs>
          ) : (
            <>
              Bạn phải đăng nhập để mua vé ! <a href="/login">Đăng nhập</a>
            </>
          )}
        </div>
      )}
    </>
  );
}
function KetQuaDatVe() {
  const [dataUser, setDataUser] = useState({});
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
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
                Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A ")} Ngày
                chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>
                <span className="font-bold">Địa điểm: </span>{" "}
                {seat.tenHeThongRap}
              </p>
              <p>
                <span className="font-bold">Tên rạp: </span>
                {seat.tenCumRap} <span className="font-bold">Ghế </span>
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
  const params = useParams();
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
    }, 0);
  }, [params.maLichChieu]);
  return (
    <div className="container">
      <h3>Kết quả đặt vé</h3>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem thông tin địa điểm và thời gian để xem phim !
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicKetItem()}</div>
        </div>
      </section>
    </div>
  );
}
