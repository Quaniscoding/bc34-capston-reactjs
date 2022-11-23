import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { callUpdatePhim } from "../../redux/reducers/userReducer";
export default function TrangCapNhatPhim() {
  const [data, setData] = useState([]);
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const callChiTietPhim = async () => {
    const apiChiTiet = await axios({
      method: "GET",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${params.maPhim}`,
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    });
    setData(apiChiTiet.data.content);
  };
  useEffect(() => {
    callChiTietPhim();
  }, [params]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: data.maPhim,
      tenPhim: data.tenPhim,
      trailer: data.trailer,
      moTa: data.moTa,
      ngayKhoiChieu: data.ngayKhoiChieu,
      dangChieu: data.dangChieu,
      sapChieu: data.sapChieu,
      hot: data.hot,
      danhGia: data.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      values.maNhom = "GP04";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(callUpdatePhim(formData));
    },
  });
  const [componentSize, setComponentSize] = useState("Large");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const dateFormat = "DD/MM/YYYY";
  const handleChangeSwitch = (name) => {
    return (value) => {
      console.log(value);
      console.log(name);
      formik.setFieldValue(name, value);
    };
  };
  const handleChangInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImg(e.target.result);
    };
    formik.setFieldValue("hinhAnh", file);
  };
  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      className="col-9 container"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 6,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h1 style={{ backgroundColor: "whitesmoke", color: "black" }}>
        Cập nhật phim
      </h1>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên phim!",
          },
        ]}
        label="Tên phim"
      >
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Vui lòng nhập trailer!",
          },
        ]}
        label="Trailer"
      >
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mô tả!",
          },
        ]}
        label="Mô tả"
      >
        <Input
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Vui lòng nhập ngày chiếu!",
          },
        ]}
        label="Ngày chiếu"
      >
        <DatePicker
          onChange={handleChangeDatePicker}
          defaultValue={moment(formik.values.ngayKhoiChieu)}
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <Switch
          name="dangChieu"
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <Switch
          name="sapChieu"
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch
          name="hot"
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số sao!",
          },
          {
            required: Number,
            message: "Vui lòng nhập số!",
          },
        ]}
        label="Số sao"
      >
        <InputNumber
          onChange={handleChangInputNumber("danhGia")}
          min={1}
          max={10}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Vui lòng chọn hình ảnh!",
          },
        ]}
        label="Hình ảnh"
      >
        <input
          accept="image/png, img/gif, img/jpeg"
          type="file"
          onChange={handleChangeFile}
        />
        <br />
        <img
          style={{ width: "150px", height: "150px" }}
          src={img === "" ? data.hinhAnh : img}
          alt="..."
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <Button htmlType="submit" className="bg-blue-300">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
}
