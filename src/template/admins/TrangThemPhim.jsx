import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { Formik, useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { callUploadPhim } from "../../redux/reducers/userReducer";
export default function TrangThemPhim() {
  const ditpatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      // maNhom: "GP04",
    },
    onSubmit: (values) => {
      values.maNhom = "GP04";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      ditpatch(callUploadPhim(formData));
      console.log(formData.get("maNhom"));
    },
  });
  const [componentSize, setComponentSize] = useState("Large");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue(ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
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
      setImgSrc(e.target.result);
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
        Thêm Phim
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
        <Input name="tenPhim" onChange={formik.handleChange} />
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
        <Input name="trailer" onChange={formik.handleChange} />
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
        <Input name="moTa" onChange={formik.handleChange} />
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
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("hot")} />
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
          src={imgSrc}
          alt="..."
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <Button htmlType="submit" className="bg-blue-300">
          Thêm phim
        </Button>
      </Form.Item>
    </Form>
  );
}
