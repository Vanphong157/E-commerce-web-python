"use client";
import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Image,
  Typography,
  InputNumber,
} from "antd";

import { CloseOutlined } from "@ant-design/icons";

const Option = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "Yiminghe",
    label: "yiminghe",
  },
];

const CartItem = [{}];

const OrderComponents = () => {
  const [hover, setHover] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);
  return (
    <Row>
      <Col span={12} offset={2} style={{ backgroundColor: "#fff" }}>
        <span style={{ fontSize: 23, fontWeight: 700, color: "#FE0000" }}>
          Địa chỉ nhận hàng
        </span>
        <Row>
          <Col span={10} offset={1}>
            <span>Họ và tên</span>
            <Input
              style={{ width: "100%", padding: 8.2 }}
              placeholder="Họ và tên"
            />
          </Col>
          <Col span={10} offset={2}>
            <span>Số điện thoại</span>
            <Input
              style={{ width: "100%", padding: 8.2 }}
              placeholder="Số điện thoại"
            />
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={1}>
            <span>E-mail</span>
            <Input
              style={{ width: "100%", padding: 8.2 }}
              placeholder="E-mail"
            />
          </Col>
          <Col span={10} offset={2}>
            <span>Tỉnh/T.Phố</span>
            <Select
              size="large"
              options={Option}
              style={{
                width: "100%",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={1}>
            <span>Quận/Huyện</span>
            <Select
              size="large"
              options={Option}
              style={{
                width: "100%",
              }}
            />
          </Col>
          <Col span={10} offset={2}>
            <span>Phường/Xã</span>
            <Select
              size="large"
              options={Option}
              style={{
                width: "100%",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <span>Số nhà/ Tên đường</span>
            <Input style={{ width: "100%", padding: 8.2 }} />
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
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
                marginTop: 20,
              }}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              Đặt hàng
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={8} offset={2} style={{ backgroundColor: "#fff" }}>
        <span style={{ fontSize: 23, fontWeight: 700, color: "#FE0000" }}>
          Giỏ hàng
        </span>
        <Row
          style={{
            border: hoverClose ? "2px solid #f1f1f1" : "none",
            margin: hoverClose ? 5 : "none",
            borderRadius: hoverClose ? 14 : "none",
          }}
          onMouseOver={() => setHoverClose(true)}
          onMouseOut={() => setHoverClose(false)}
        >
          <Col offset={22}>
            <CloseOutlined
              style={{
                color: hoverClose ? "#f95e5e" : "#FE0000",
                fontWeight: 700,
                fontSize: hoverClose ? 20 : 16,
                width: "100%",
                cursor: hoverClose ? "pointer" : "none",
              }}
            />
          </Col>
          <Row style={{ padding: 20 }}>
            <Col span={6}>
              <Image
                src="https://cdn.nguyenkimmall.com/images/thumbnails/250/250/detailed/859/10052039-may-loc-khong-khi-hitachi-ep-t60j-240v-wh-1.jpg"
                preview={false}
              />
            </Col>
            <Col span={10}>
              <Typography style={{ fontSize: 18, fontWeight: 500 }}>
                Máy lọc không khí Hitachi EP-T60J 22VN
              </Typography>
            </Col>
            <Col span={8}>
              <Typography
                style={{
                  textDecorationLine: "line-through",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#cccccc",
                }}
              >
                14.290.000
              </Typography>
              <Row>
                <Col span={12}>
                  <Typography
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Số lượng:
                  </Typography>
                </Col>
                <Col span={12}>
                  <InputNumber />
                </Col>
              </Row>
              <Row>
                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  6.990.000
                </Typography>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row>
          <Typography
            style={{ fontSize: 23, fontWeight: 700, color: "#FE0000" }}
          >
            Tổng:{" "}
          </Typography>
        </Row>
      </Col>
    </Row>
  );
};

export default OrderComponents;
