"use client";
import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Typography, Avatar, Checkbox } from "antd";
import { useRouter } from "next/navigation";
const { Title } = Typography;

const SigninContent = () => {
  const router = useRouter();
  const isAuth = localStorage.getItem("session_id");
  if (isAuth) {
    router.push("/");
  }
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [hover, setHover] = useState(false);

  const formattedForm = JSON.stringify(formData, null, 2);

  console.log(formattedForm);
  // Hàm xử lý thay đổi input
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClick = async () => {
    try {
      const resp = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      localStorage.setItem("session_id", resp.session_id);
      alert("Thanfh cong");
      router.push("/");
    } catch (error) {
      alert("Đăng nhập thất bại");
      console.log(error);
    }
  };
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
            <Row style={{ width: "100%" }}>
              <p>Tài khoản</p>
              <Input
                style={{ padding: 13, marginTop: 10, marginBottom: 10 }}
                name="username" // Quan trọng: tên chính xác trùng key trong state
                placeholder="Tài khoản"
                prefix={<UserOutlined />}
                value={formData.username}
                onChange={handleChange("username")}
              />
            </Row>
            <Row style={{ width: "100%" }}>
              <p>Mật khẩu</p>
              <Input.Password
                style={{ padding: 13, marginTop: 10, marginBottom: 10 }}
                name="password" // Quan trọng: tên chính xác trùng key trong state
                placeholder="Mật khẩu"
                prefix={<LockOutlined />}
                value={formData.password}
                onChange={handleChange("password")}
              />
            </Row>
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
              onClick={handleClick}
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
