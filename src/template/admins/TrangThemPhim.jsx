import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
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
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
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
            Th??m Phim
          </h1>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n phim!",
              },
            ]}
            label="T??n phim"
          >
            <Input name="tenPhim" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p trailer!",
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
                message: "Vui l??ng nh???p m?? t???!",
              },
            ]}
            label="M?? t???"
          >
            <Input name="moTa" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ng??y chi???u!",
              },
            ]}
            label="Ng??y chi???u"
          >
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handleChangeDatePicker}
            />
          </Form.Item>
          <Form.Item label="??ang chi???u" valuePropName="checked">
            <Switch onChange={handleChangeSwitch("dangChieu")} />
          </Form.Item>
          <Form.Item label="S???p chi???u" valuePropName="checked">
            <Switch onChange={handleChangeSwitch("sapChieu")} />
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch onChange={handleChangeSwitch("hot")} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p s??? sao!",
              },
              {
                required: Number,
                message: "Vui l??ng nh???p s???!",
              },
            ]}
            label="S??? sao"
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
                message: "Vui l??ng ch???n h??nh ???nh!",
              },
            ]}
            label="H??nh ???nh"
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
          <Form.Item label="T??c v???">
            <Button htmlType="submit" className="bg-blue-300">
              Th??m phim
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
