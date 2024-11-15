"use client";
import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import InformationComponent from "./informationComponent";
import OrderHistory from "./order-history";

const PersonalPage = () => {
  const [template, setTemplate] = useState(1);

  const handleChooseTemplate = (num) => {
    return setTemplate(num);
  };
  const [hoveredTemplate, setHoveredTemplate] = useState(null); // Lưu trạng thái hàng được hover

  const handleMouseEnter = (templateId) => {
    setHoveredTemplate(templateId);
  };

  const handleMouseLeave = () => {
    setHoveredTemplate(null);
  };

  const getRowStyle = (templateId) => {
    if (templateId === template) {
      return { backgroundColor: "#bebebe", padding: 20, fontWeight: 700 };
    } else if (templateId === hoveredTemplate) {
      return { backgroundColor: "#bebebe", padding: 20, fontWeight: 700 };
    } else {
      return { backgroundColor: "transparent", padding: 20, fontWeight: 700 };
    }
  };

  return (
    <>
      <Row style={{ backgroundColor: "#fff" }}>
        <Col span={6}>
          <Row
            style={getRowStyle(1)}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleChooseTemplate(1)}
          >
            <Typography>Thông tin cá nhân</Typography>
          </Row>
          <Row
            style={getRowStyle(2)}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleChooseTemplate(2)}
          >
            <Typography>Xem đơn hàng</Typography>
          </Row>
        </Col>
        <Col
          span={18}
          style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}
        >
          {template == 1 ? <InformationComponent /> : <OrderHistory />}
        </Col>
      </Row>
    </>
  );
};

export default PersonalPage;
