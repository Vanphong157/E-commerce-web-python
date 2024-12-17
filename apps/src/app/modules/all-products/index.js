"use client";

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, message } from 'antd';
import Link from 'next/link';
import axios from 'axios';

const { Meta } = Card;

const AllProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: '20px' }}>
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
          <Link href={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Card
              hoverable
              cover={
                <img 
                  alt={product.name} 
                  src={product.image}
                  style={{ 
                    height: 200, 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
              }
            >
              <Meta
                title={product.name}
                description={
                  <div>
                    <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                      {product.price.toLocaleString('vi-VN')}đ
                    </div>
                    <div style={{ 
                      color: '#666', 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {product.description}
                    </div>
                  </div>
                }
              />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default AllProductsComponent; 