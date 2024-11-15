"use client";
import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Typography, Avatar, Checkbox } from "antd";
const { Title } = Typography;

const inputFieldArray = [
  {
    name: "username",
    placeholder: "Tài khoản",
    className: "form-field",
    prefix: <UserOutlined />,
    rules: [
      {
        required: true,
        message: "Trường này không được bỏ trống",
      },
    ],
  },
  {
    name: "password",
    placeholder: "Mật khẩu",
    className: "form-field",
    prefix: <LockOutlined />,
    rules: [
      {
        required: true,
        message: "Trường này không được bỏ trống",
      },
    ],
  },
];
const SigninContent = () => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <Row style={{ justifyContent: "center" }}>
        <Col
          span={12}
          style={{
            padding: 20,
            border: "1px solid black",
            backgroundColor: "white",
            marginTop: 20,
            borderRadius: 19,
            minWidth: "300px",
            maxWidth: "600px",
          }}
        >
          <Row style={{ alignItems: "center" }}>
            <Avatar shape="square" size={50} />
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                marginLeft: 20,
                color: "#FE0000",
              }}
            >
              Logo
            </span>
          </Row>
          <Row style={{ justifyContent: "center", marginTop: 10 }}>
            <Title style={{ fontWeight: 700 }}>Sign in</Title>
          </Row>
          <Row style={{ marginTop: 10, fontWeight: 700, fontSize: 14 }}>
            {inputFieldArray.map((field) => (
              <>
                {/* <span>{field.title}</span> */}
                <Row style={{ width: "100%" }}>
                  <p>{field.placeholder}</p>
                  <Input
                    style={{ padding: 13, marginTop: 10, marginBottom: 10 }}
                    key={field.name}
                    {...field}
                  />
                </Row>
              </>
            ))}
            {/* <span>Tài khoản:</span>

            <Input
              placeholder="Tên đăng nhập"
              prefix={<UserOutlined />}
              style={{ padding: 13, marginTop: 10, marginBottom: 10 }}
            />
            <span>Mật khẩu:</span>
            <Input.Password
              placeholder="Mật khẩu"
              style={{ padding: 13, marginTop: 10 }}
              prefix={<LockOutlined />}
            /> */}
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Checkbox>Lưu đăng nhập</Checkbox>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <span style={{ marginRight: 10 }}>Chưa có tài khoản?</span>
            <a
              href="/pages/signup"
              style={{ color: "#FE0000", fontWeight: 700 }}
            >
              {" "}
              Đăng ký tài khoản
            </a>
          </Row>

          <Row style={{ marginTop: 20, marginBottom: 20 }}>
            <Button
              style={{
                backgroundColor: hover ? "#f95e5e" : "#FE0000",
                border: hover ? "none" : "none",
                transition: hover ? "background-color 0.1s ease" : "none",
                color: "#fff",
                fontWeight: 700,
                width: "100%",
                padding: 25,
                fontSize: 21,
              }}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              Đăng nhập
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SigninContent;
