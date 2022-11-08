import React from "react";
import { Space } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
export default function Footer() {
  return (
    <div className="container pt-4">
      <div className="footer-cgv-policy">
        <div className="content-cgv-policy">
          <div className="cgv-vietnam">
            <h3>CGV Việt Nam</h3>
            <ul>
              <li>
                <a href="">Giới Thiệu</a>
              </li>
              <li>
                <a href="">Tiện Ích Online</a>
              </li>
              <li>
                <a href="">Thẻ Quà Tặng</a>
              </li>
              <li>
                <a href="">Tuyển Dụng</a>
              </li>
              <li>
                <a href="">Liên Hệ Quảng Cáo</a>
              </li>
            </ul>
          </div>
          <div className="cgv-policy">
            <h3>Điều khoản sử dụng</h3>
            <ul>
              <li>
                <a href="">Điều Khoản Chung</a>
              </li>
              <li>
                <a href="">Điều Khoản Giao Dịch</a>
              </li>
              <li>
                <a href="">Chính Sách Thanh Toán</a>
              </li>
              <li>
                <a href="">Chính Sách Bảo Mật</a>
              </li>
              <li>
                <a href="">Câu Hỏi Thường Gặp</a>
              </li>
            </ul>
          </div>
          <div className="cgv-follow-us">
            <h3>Kết nối với chúng tôi</h3>
            <ul>
              <li>
                <Space>
                  <FacebookOutlined />
                </Space>
              </li>
              <li>
                <Space>
                  <YoutubeOutlined />
                </Space>
              </li>
              <li>
                <Space>
                  <TwitterOutlined />
                </Space>
              </li>
              <li>
                <Space>
                  <InstagramOutlined />
                </Space>
              </li>
            </ul>
          </div>
          <div className="customer-cgv">
            <h3>Chăm sóc khách hàng</h3>
            <p>
              Hotline: 1900 6017 Giờ làm việc: 8:00 - 22:00
              <br /> (Tất cả các ngày bao gồm cả Lễ Tết)
              <br />
              Email hỗ trợ: <a href="">hoidap@.vn</a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-image"></div>
    </div>
  );
}
