import { Col, Row, Typography } from "antd";
import React from "react";
import OrderItems from "./orderItems";

const OrderHistory = () => {
  return (
    <>
      <Row style={{ display: "flex", flexDirection: "column" }}>
        <Row>
          <Typography style={{ fontSize: 26, fontWeight: 700 }}>
            Lịch sử mua hàng
          </Typography>
        </Row>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Row>
            <Col span={4}>
              <Typography>Mã số: </Typography>
            </Col>
            <Col span={8}>
              <Typography>Ngày đặt hàng</Typography>
            </Col>
            <Col span={8}>
              <Typography>Trạng thái</Typography>
            </Col>
            <Col span={4}>
              <Typography>Tổng tiền</Typography>
            </Col>
          </Row>
          <Row style={{ display: "flex", flexDirection: "column" }}>
            <Row style={{ maxHeight: 40 }}>
              <Col
                span={4}
                style={{
                  paddingBottom: 10,
                  borderBottom: "1px solid #bebebe",
                  height: 40,
                }}
              >
                <Typography
                  style={{ fontSize: 15, color: "#FE0000", fontWeight: 500 }}
                >
                  Hình ảnh
                </Typography>
              </Col>
              <Col span={14}>
                <Row>
                  <Col
                    span={18}
                    style={{
                      paddingBottom: 10,
                      borderBottom: "1px solid #bebebe",
                      height: 40,
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 15,
                        color: "#FE0000",
                        fontWeight: 500,
                      }}
                    >
                      Tên sản phẩm
                    </Typography>
                  </Col>
                  <Col
                    span={6}
                    style={{
                      paddingBottom: 10,
                      borderBottom: "1px solid #bebebe",
                      height: 40,
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 15,
                        color: "#FE0000",
                        fontWeight: 500,
                      }}
                    >
                      Số lượng
                    </Typography>
                  </Col>
                </Row>
              </Col>
              <Col
                span={6}
                style={{
                  paddingBottom: 10,
                  borderBottom: "1px solid #bebebe",
                  height: 40,
                }}
              >
                <Typography
                  style={{ fontSize: 15, color: "#FE0000", fontWeight: 500 }}
                >
                  Giá tiền
                </Typography>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <OrderItems />
            </Row>
          </Row>
        </Row>
      </Row>
    </>
  );
};

export default OrderHistory;
