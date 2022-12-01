//rfc
import React, { Suspense, useState } from "react";
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
    <div className="container text-left mt-3 mb-5">
      <section className="vh-70">
        <div className="container h-70">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Đăng Nhập
                      </p>
                      <Form
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="on"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item
                              label="Tài khoản"
                              name="taiKhoan"
                              rules={[
                                {
                                  required: true,
                                  message: "Hãy nhập tài khoản",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item
                              label="Mật khẩu"
                              name="matKhau"
                              rules={[
                                {
                                  required: true,
                                  message: "Hãy nhập mật khẩu!",
                                },
                              ]}
                            >
                              <Input.Password />
                            </Form.Item>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                <Form.Item className="col-7 m-auto p-1">
                                  <Button type="primary" htmlType="submit">
                                    Đăng nhập
                                  </Button>
                                </Form.Item>
                              </div>
                            </div>

                            <span>
                              Bạn chưa có tài khoản ?{" "}
                              <a
                                onClick={() => {
                                  navigate("/signup");
                                }}
                                className="fw-bolder text-black"
                              >
                                Đăng ký
                              </a>
                            </span>
                          </div>
                        </div>
                      </Form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
