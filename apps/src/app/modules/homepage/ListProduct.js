"use client";
import { Col, Row } from "antd";
import React from "react";
import Product from "./Product";
import SaleProduct from "./SaleProduct";

const styles = {
  span: {
    fontWeight: "700",
    fontSize: "24px",
    color: "#1d2939",
    paddingBottom: "20px",
    lineHeight: "32px",
  },
  container: {
    marginBottom: "20px",
    borderRadius: "12px",
    overflow: "hidden",
    padding: "20px 0",
  },
  ul: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #eaecf0",
    margin: 0,
    padding: 0,
    background: "#fff",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  },
  img: {
    maxWidth: "90%",
    maxHeight: "44px",
    margin: "auto",
  },
  li: (isActive) => ({
    marginRight: "10px",
    position: "relative",
    borderBottom: isActive ? "2px solid #2A83E9" : "2px solid transparent",
    width: "calc(100% / 8)",
  }),
};

const ProductList = () => {
  const [saleProducts, setProduct] = React.useState([]); // State để lưu dữ liệu sản phẩm
  const [loading, setLoading] = React.useState(true); // State để hiển thị loading
  const [error, setError] = React.useState(null); // State để xử lý lỗi

  React.useEffect(() => {
    // Gọi API lấy danh sách sản phẩm
    const fetchProducts = async () => {
      try {
        setLoading(true); // Bắt đầu loading

        const response = await fetch("http://127.0.0.1:8000/products", {
          method: "GET",
          credentials: "include",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(saleProducts);

  return (
    <div style={styles.container}>
      <h3 style={styles.span}>Khuyến mãi Online</h3>
      <ul style={styles.ul}>
        <li style={styles.li(true)}>
          <img
            style={styles.img}
            src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/a2/e9/a2e96842d59456f897836eea3d43eaee.png"
            alt="Product 1"
          />
        </li>
        <li style={styles.li(false)}>
          <img
            style={styles.img}
            src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/a2/e9/a2e96842d59456f897836eea3d43eaee.png"
            alt="Product 2"
          />
        </li>
      </ul>
      <Row style={{ background: "white", padding: "20px" }} gutter={10}>
        {saleProducts.map((product, index) => (
          <Col span={4} key={index}>
            <SaleProduct product={product} />
          </Col>
        ))}
      </Row>
      <a
        style={{
          border: 0,
          color: "#2a83e9",
          fontSize: "14px",
          height: "36px",
          padding: "0 20px",
          lineHeight: "36px",
          backgroundColor: "#fff",
          borderRadius: "4px",
          display: "block",
          margin: "5px auto 15px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        <span>Xem thêm sản phẩm</span>
      </a>

      <div
        style={{
          margin: 0,
          padding: "20px 40px 0 20px",
          background: "#fff",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <h3
          style={{
            fontWeight: "700",
            fontSize: "24px",
            color: "#1d2939",
            lineHeight: "32px",
          }}
        >
          Gợi ý dành cho bạn
        </h3>
      </div>

      <Row style={{ background: "white", padding: "20px" }} gutter={10}>
        {saleProducts.map((product, index) => (
          <Col span={4} key={index}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
