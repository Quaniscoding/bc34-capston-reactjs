//rfc
import React, { useState } from "react";
import { Button, Form, Input, notification, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { callLogin } from "../../redux/reducers/userReducer";
import { USER_LOGIN } from "../../utils/constant";
import { getStringLocal } from "../../utils/config";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  let navigate = useNavigate();
  let isLogin = getStringLocal(USER_LOGIN);
  let dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      let { taiKhoan, matKhau } = values;
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
  let [reset, setReset] = useState(0);

  return (
    <div className="container mt-5 text-center">
      {isLogin ? (
        <div>
          <Result
            icon={<SmileOutlined />}
            title="Đăng nhập thành công!"
            extra={
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/trangchu");
                  }}
                >
                  Tới trang chủ
                </Button>
                <> </>
                <Button
                  type="dashed"
                  onClick={() => {
                    setReset(reset + 1);
                    localStorage.removeItem(USER_LOGIN);
                    navigate(`/login`);
                  }}
                >
                  Đăng xuất
                </Button>
              </div>
            }
          />
        </div>
      ) : (
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
      )}
    </div>
  );
}
