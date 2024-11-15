import { Col, Row, Typography, Image } from "antd";
import React from "react";
const data = [
  {
    imgUrl:
      "https://cdn.tgdd.vn/Products/Images/1944/260042/electrolux-inverter-10-kg-ewf1024p5wb-181121-091018-600x600.jpg",
    title: "Tên sản phẩm dài nhu bla bla",
    price: 9790000,
    count: 20,
  },
  {
    imgUrl:
      "https://cdn.tgdd.vn/Products/Images/1944/260042/electrolux-inverter-10-kg-ewf1024p5wb-181121-091018-600x600.jpg",
    title: "Tên sản phẩm dài nhu bla bla",
    price: 9790000,
    count: 20,
  },
  {
    imgUrl:
      "https://cdn.tgdd.vn/Products/Images/1944/260042/electrolux-inverter-10-kg-ewf1024p5wb-181121-091018-600x600.jpg",
    title: "Tên sản phẩm dài nhu bla bla",
    price: 9790000,
    count: 20,
  },
  {
    imgUrl:
      "https://cdn.tgdd.vn/Products/Images/1944/260042/electrolux-inverter-10-kg-ewf1024p5wb-181121-091018-600x600.jpg",
    title: "Tên sản phẩm dài nhu bla bla",
    price: 9790000,
    count: 20,
  },
];

const OrderItems = () => {
  return (
    <>
      {data.map((item, index) => (
        <Row key={index} style={{ marginBottom: 16 }}>
          <Col span={4}>
            <Image
              src={item.imgUrl}
              preview={false}
              width={"70%"}
              height={"90%"}
            />
          </Col>
          <Col span={14} style={{ height: "100%" }}>
            <Row>
              <Col span={18}>
                <Row style={{ marginBottom: 20 }}>
                  <Typography style={{ fontSize: 14, fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                </Row>
                <Row>
                  <Typography
                    style={{ fontSize: 14, fontWeight: 400, color: "#DD2F2C" }}
                  >
                    {item.price}đ
                  </Typography>
                </Row>
              </Col>
              <Col span={6}>
                <Typography style={{ fontSize: 14, fontWeight: 600 }}>
                  {item.count}
                </Typography>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Typography style={{ fontSize: 14, fontWeight: 600 }}>
              {item.count * item.price} ₫
            </Typography>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default OrderItems;
