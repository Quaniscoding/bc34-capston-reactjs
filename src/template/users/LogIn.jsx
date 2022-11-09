//rfc
import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import useRoute from "../../hooks/useRoute";
import { useDispatch } from "react-redux";
import { callLogin } from "../../redux/reducers/userReducer";

export default function LogIn() {
  const {
    params,
    navigate,
    searchParams: [searchParams, setSearchParams],
  } = useRoute();

  let dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      //destructering form
      let { taiKhoan, matKhau } = values;

      //dispatch redux thunk
      const result = await dispatch(callLogin({ taiKhoan, matKhau }));

      if (result.isError == true) {
        openNotificationWithIcon(result.message);
      }
    } catch {}
  };
  const openNotificationWithIcon = (message) => {
    notification["error"]({
      message: "Thông báo !",
      description: message,
    });
  };

  return (
    <div className="container mt-5 text-center">
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
        onFinish={onFinish}
        autoComplete="on"
      >
        <div>
          <h1>Đăng Nhập</h1>
        </div>
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Hãy nhập ô này!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Hãy nhập ô này!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

//HOC => higher order Component
//HOF => higher order Component
//closure
