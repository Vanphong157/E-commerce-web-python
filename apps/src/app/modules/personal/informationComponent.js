"use client";

import { Col, Row, Typography, Input, Button } from "antd";
import React, { useState } from "react";

const initialInforUser = [
  {
    name: "Họ tên",
    value: "Nguyễn Văn A",
  },
  {
    name: "Sđt",
    value: "01111111111",
  },
  {
    name: "Giới tính",
    value: "Nam",
  },
  {
    name: "Địa chỉ",
    value: "Location",
  },
  { name: "E-mail", value: "vanphong150703@gmail.com" },
];

const InformationComponent = () => {
  const [inforUser, setInforUser] = useState(initialInforUser);
  const [isChanged, setIsChanged] = useState(false);

  const handleInputChange = (value, index) => {
    const newInforUser = [...inforUser];
    newInforUser[index].value = value;
    setInforUser(newInforUser);

    const isUserChanged = newInforUser.some(
      (info, idx) => info.value !== initialInforUser[idx].value
    );
    setIsChanged(!isUserChanged);
  };

  return (
    <>
      <Row>
        <Typography style={{ fontSize: 26, fontWeight: 700 }}>
          Thông tin cá nhân
        </Typography>
      </Row>
      <Row style={{ display: "flex", flexDirection: "column" }}>
        <Row>
          <Typography style={{ fontSize: 22, fontWeight: 700 }}>
            Thông tin tài khoản
          </Typography>
        </Row>
        <Row>
          <Col span={8}>
            <Row>
              <Typography>Tên đăng nhập:</Typography>
            </Row>
            <Row>
              <Input value={"hihihehe"} disabled />
            </Row>
          </Col>
          <Col span={8} offset={8}>
            <Row>
              <Typography>Mật khẩu: </Typography>
            </Row>
            <Row>
              <Input.Password disabled value={"hihihhehe"} />
            </Row>
          </Col>
        </Row>
        <Row
          style={{ display: "flex", justifyContent: "flex-end", margin: 10 }}
        >
          <Button> Thay đổi mật khẩu</Button>
        </Row>
      </Row>
      <Row style={{ display: "flex", flexDirection: "column" }}>
        <Row>
          <Typography style={{ fontSize: 22, fontWeight: 700 }}>
            Thông tin người dùng
          </Typography>
        </Row>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          {inforUser.map((infor, index) => (
            <Row key={index} style={{ margin: 5 }}>
              <Col span={6}>
                <Typography>{infor.name}</Typography>
              </Col>
              <Col span={18}>
                <Input
                  value={infor.value}
                  onChange={(e) => handleInputChange(e.target.value, index)} // Lắng nghe thay đổi input
                />
              </Col>
            </Row>
          ))}
        </Row>
        <Row style={{ display: "flex", justifyContent: "flex-end", margin: 5 }}>
          <Button disabled={!isChanged}>Lưu thông tin</Button>{" "}
          {/* Disable nếu không có thay đổi */}
        </Row>
      </Row>
    </>
  );
};

export default InformationComponent;
