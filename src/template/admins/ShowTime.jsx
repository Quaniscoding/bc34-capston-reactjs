import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Select, DatePicker } from "antd";
import FormItem from "antd/es/form/FormItem";
import { callgetDanhSachThongTinHeThongRap } from "../../redux/reducers/thongTinHeThongRapReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { taoLichChieu } from "../../redux/reducers/datVe/TaoLichChieu";
export default function ShowTime() {
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      maPhim: params.maPhim,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: (values) => {
      console.log("value", values);
      dispatch(taoLichChieu(values));
    },
  });
  const [danhSachCumRap, setdanhSachCumRap] = useState([]);
  const layDanhSachCumRap = async (maHeThongRap) => {
    try {
      await axios({
        method: "GET",
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
        },
      }).then((result) => {
        setdanhSachCumRap(result.data.content);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  let danhSachRap = useSelector(
    (state) => state.thongTinHeThongRap.danhSachThongTinHeThongRap
  );
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callgetDanhSachThongTinHeThongRap);
    }, 1000);
  }, []);
  const handleChangeHeThongRap = async (values) => {
    timeout = setTimeout(() => {
      dispatch(layDanhSachCumRap(values));
    }, 0);
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const onOk = (value) => {};
  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  return (
    <div className="col-5 pt-5">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={formik.handleSubmit}
      >
        <h3>Tạo lịch chiếu</h3>
        <FormItem label="Hệ thống rạp">
          <Select
            onChange={handleChangeHeThongRap}
            options={danhSachRap?.map((htr, index) => ({
              label: htr.tenHeThongRap,
              value: htr.tenHeThongRap,
            }))}
            placeholder="Chọn hệ thống rạp"
          />
        </FormItem>
        <FormItem label="Cụm rạp">
          <Select
            onChange={handleChangeCumRap}
            options={danhSachCumRap?.map((cumRap, index) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))}
            placeholder="Chọn cụm rạp"
          />
        </FormItem>
        <FormItem label="Ngày chiếu giờ chiếu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </FormItem>
        <FormItem label="Giá vé">
          <InputNumber onChange={onChangeInputNumber} />
        </FormItem>
        <FormItem label="Chức năng">
          <Button htmlType="submit">Tạo lịch chiếu</Button>
        </FormItem>
      </Form>
    </div>
  );
}
