import React, { useState } from "react";
import { Form, Input, Select, Button, Space } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { callSignUp } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function SignUp(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(callSignUp(values));
  };

  return (
    <div className="container text-left mt-5">
      <Form name="register" onFinish={onFinish} className="row">
        <div className="col-12 text-center">
          <h1>Đăng ký</h1>
        </div>
        <Form.Item
          className="col-7 m-auto p-1"
          name="taiKhoan"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: "Hãy nhập Tài khoản !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="col-7 m-auto p-1"
          name="matKhau"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu !",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="col-7 m-auto p-1"
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Email không đúng định dạng !",
            },
            {
              required: true,
              message: "Hãy nhập Email !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="col-7 m-auto p-1"
          name="soDt"
          label="Điện thoại"
          rules={[
            {
              required: true,
              message: "Hãy nhập số điện thoại",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="col-7 m-auto p-1"
          name="maNhom"
          label="Mã Nhóm"
          rules={[
            {
              required: true,
              message: "Hãy nhập số mã nhóm",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="col-7 m-auto p-1"
          name="hoTen"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Hãy nhập họ tên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="col-7 m-auto p-1">
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
        <Form.Item className="col-7 m-auto p-1">
          <span> Bạn đã có tài khoản?</span>
          <a
            onClick={() => {
              navigate("/login");
            }}
            style={{ color: "Highlight" }}
          >
            <span> Đăng nhập</span>
          </a>
        </Form.Item>
      </Form>
    </div>
  );
}
