import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { callSignUp } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
export default function SignUp(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(callSignUp(values));
  };
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
                        Đăng ký
                      </p>
                      <Form
                        className="mx-1 mx-md-4"
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
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
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
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
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
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-left mb-4">
                          <div className="form-outline flex-fill mb-0">
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
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
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
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
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
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button
                            htmlType="submit"
                            type="button"
                            className="btn btn-primary"
                          >
                            <p className="d-flex justify-content-center">
                              Đăng ký
                            </p>
                          </Button>
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
