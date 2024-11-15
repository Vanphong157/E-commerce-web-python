import React from "react";
import { Row, Col, Avatar } from "antd";

const FooterState = () => {
  return (
    <>
      <Row marginTop={10} style={{ borderTop: 5, borderColor: "C92127" }}>
        <Col
          span={24}
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col
            span={7}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Row>
              <span
                style={{
                  color: "#2a435d",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  fontSize: 20,
                  lineHeight: "1.75rem",
                }}
              >
                Chăm sóc khách hàng
              </span>
            </Row>
            <Row>
              <span
                style={{
                  color: "inherit",
                  fontWeight: "500",
                  fontSize: 17,
                  marginTop: 1,
                }}
              >
                Điện thoại liên hệ: 0948346245
              </span>
            </Row>
            <Row>
              <span
                style={{
                  color: "inherit",
                  fontWeight: "500",
                  fontSize: 17,
                  marginTop: 1,
                }}
              >
                Email: 21522461@gm.uit.edu.vn
              </span>
            </Row>
            <Row>
              <span
                style={{
                  color: "inherit",
                  fontWeight: "500",
                  fontSize: 17,
                  marginTop: 1,
                }}
              >
                Giờ làm việc: 7.30 AM - 9.30PM
              </span>
            </Row>
            <Row>
              <span
                style={{
                  color: "#2a435d",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  fontSize: 20,
                  lineHeight: "1.75rem",
                  marginTop: 1,
                  marginBottom: 2,
                }}
              >
                Liên hệ chúng tôi
              </span>
            </Row>
            <Row display={"flex"}>
              <Col span={6}>
                <Avatar
                  style={{ height: 60, width: 60 }}
                  component="img"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/450px-Facebook_icon_2013.svg.png?20161223201621"
                  }
                ></Avatar>
              </Col>
              <Col span={6}>
                <Avatar
                  style={{ height: 60, width: 60 }}
                  component="img"
                  src={
                    "https://thumbs.dreamstime.com/b/tiktok-social-media-app-icon-tiktok-social-media-app-icon-square-shape-vector-illustration-269930887.jpg"
                  }
                ></Avatar>
              </Col>
              <Col span={6}>
                <Avatar
                  style={{ height: 60, width: 60 }}
                  component="img"
                  src={
                    "https://static-00.iconduck.com/assets.00/youtube-icon-2048x2048-wiwalbpx.png"
                  }
                ></Avatar>
              </Col>
              <Col span={6}>
                <Avatar
                  style={{ height: 60, width: 60 }}
                  component="img"
                  src={
                    "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                  }
                ></Avatar>
              </Col>
            </Row>
          </Col>
          <Col span={7}>
            <span
              style={{
                color: "#2a435d",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: 20,
                lineHeight: "1.75rem",
                marginBottom: 2,
              }}
            >
              Chấp nhận thanh toán
            </span>
            <Row display={"flex"}>
              <Col span={8}>
                <Avatar
                  style={{ height: 60, width: 60 }}
                  component="img"
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGds0dVYCpsArM9iAbJ8GNMQIHWR_M7vECi27mUxg1cQ&s"
                  }
                ></Avatar>
              </Col>
              <Col span={8}>
                <Avatar
                  style={{ height: 60, width: 60 }}
                  component="img"
                  src={
                    "https://rgb.vn/wp-content/uploads/2014/05/rgb_vn_new_branding_paypal_2014_logo_detail.png"
                  }
                ></Avatar>
              </Col>
              <Col span={8}>
                <Avatar
                  style={{ height: 60, width: 60 }}
                  component="img"
                  src={
                    "https://ttvietlam.hagiang.gov.vn/o/image/image_gallery?uuid=99480637-6b82-491f-9827-cadc3b64b165&groupId=248401&t=1587177118868"
                  }
                ></Avatar>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <span
              style={{
                color: "#2a435d",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: 20,
                lineHeight: "1.75rem",
                marginBottom: 2,
              }}
            >
              Sách UIT - Hệ thống website bán sách
            </span>
            <Row display={"flex"}>
              <Col
                span={12}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <a
                  style={{
                    color: "inherit",
                    ":hover": {
                      color: "#C92127",
                      cursor: "pointer",
                      fontWeight: 700,
                    },
                  }}
                >
                  Điều khoản chung
                </a>
                <a
                  style={{
                    color: "inherit",
                    ":hover": {
                      color: "#C92127",
                      cursor: "pointer",
                      fontWeight: 700,
                    },
                  }}
                >
                  Chính sách bảo mật
                </a>
                <a
                  style={{
                    color: "inherit",
                    ":hover": {
                      color: "#C92127",
                      cursor: "pointer",
                      fontWeight: 700,
                    },
                  }}
                >
                  Giới thiệu
                </a>
              </Col>
              <Col
                span={12}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <a
                  style={{
                    color: "inherit",
                    ":hover": {
                      color: "#C92127",
                      cursor: "pointer",
                      fontWeight: 700,
                    },
                  }}
                >
                  Tuyển dụng
                </a>
                <a
                  style={{
                    color: "inherit",
                    ":hover": {
                      color: "#C92127",
                      cursor: "pointer",
                      fontWeight: 700,
                    },
                  }}
                >
                  Địa chỉ
                </a>
              </Col>
            </Row>
          </Col>
        </Col>
        <Row
          style={{
            display: "block",
            backgroundColor: "#C92127",
            justifyContent: "center",
            textAlign: "center",
            height: 50,
            width: "100%",
            alignContent: "center",
          }}
        >
          <span style={{ color: "#ffffff" }}>
            Copyright © 2024 | Bản quyền thuộc về Sách UIT
          </span>
        </Row>
      </Row>
    </>
  );
};
export default FooterState;
