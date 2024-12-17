"use client";

import { Col, Row, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import Product from './Product'; 
import SaleProduct from './SaleProduct';
import axios from 'axios';
import Link from 'next/link';

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
  viewMoreButton: {
    border: 0, 
    color: "#2a83e9", 
    fontSize: "14px", 
    height: "36px", 
    padding: "0 20px",
    lineHeight: "36px",
    backgroundColor: "#fff", 
    borderRadius: '4px', 
    display: 'block', 
    margin: "5px auto 15px", 
    fontWeight: 'bold', 
    cursor: 'pointer'
  },
  sectionTitle: {
    margin: 0, 
    padding: "20px 40px 0 20px",
    background: '#fff',
    borderTopLeftRadius: '16px', 
    borderTopRightRadius: '16px',
  }
};

const ProductList = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const categoriesResponse = await axios.get('http://127.0.0.1:8000/categories');
      setCategories(categoriesResponse.data);
      if (categoriesResponse.data.length > 0) {
        setActiveCategory(categoriesResponse.data[0]._id);
      }

      // Fetch products
      const productsResponse = await axios.get('http://127.0.0.1:8000/products');
      const products = productsResponse.data;

      // Lọc sản phẩm khuyến mãi (giả sử có trường discount > 0)
      const onSale = products.filter(product => product.discount > 0).slice(0, 6);
      setSaleProducts(onSale);

      // Lấy sản phẩm gợi ý (có thể dựa vào rating hoặc random)
      const recommended = products.sort(() => Math.random() - 0.5).slice(0, 6);
      setRecommendedProducts(recommended);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.span}>Khuyến mãi Online</h3>
      <ul style={styles.ul}>
        {categories.map((category, index) => (
          <li 
            key={category._id} 
            style={styles.li(category._id === activeCategory)}
            onClick={() => setActiveCategory(category._id)}
          >
            <img 
              style={styles.img} 
              src={category.image || 'https://via.placeholder.com/150'} 
              alt={category.name} 
            />
          </li>
        ))}
      </ul>

      <Row style={{ background: 'white', padding: '20px' }} gutter={[16, 16]}>
        {saleProducts.map((product) => (
          <Col span={4} key={product._id}>
            <Link href={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
              <SaleProduct 
                product={{
                  imgUrl: product.image,
                  title: product.name,
                  price: product.price.toLocaleString('vi-VN') + 'đ',
                  oldPrice: (product.price * (1 + product.discount/100)).toLocaleString('vi-VN') + 'đ',
                  discount: `-${product.discount}%`,
                  slotsLeft: product.quantity > 0 ? `Còn ${product.quantity}` : 'Hết hàng'
                }} 
              />
            </Link>
          </Col>
        ))}
      </Row>

      <Link href="/all-products" style={styles.viewMoreButton}>
        <span>Xem thêm sản phẩm</span>
      </Link>

      <div style={styles.sectionTitle}>
        <h3 style={styles.span}>Gợi ý dành cho bạn</h3>
      </div>
         
      <Row style={{ background: 'white', padding: '20px' }} gutter={[16, 16]}>
        {recommendedProducts.map((product) => (
          <Col span={4} key={product._id}>
            <Link href={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
              <Product 
                product={{
                  imgUrl: product.image,
                  title: product.name,
                  price: product.price.toLocaleString('vi-VN') + 'đ',
                  oldPrice: product.discount > 0 ? 
                    (product.price * (1 + product.discount/100)).toLocaleString('vi-VN') + 'đ' : 
                    null,
                  discount: product.discount > 0 ? `-${product.discount}%` : null
                }} 
              />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
