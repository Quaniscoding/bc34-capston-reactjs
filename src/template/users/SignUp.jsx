import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { callSignUp } from "../../redux/reducers/userReducer";

const { Option } = Select;

export default function SignUp(props) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(callSignUp(values));
  };

  return (
    <div className="container text-left mt-5">
      <Form name="register" onFinish={onFinish}>
        <Form.Item
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
