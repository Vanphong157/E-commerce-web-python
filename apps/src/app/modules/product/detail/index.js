"use client";

import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Typography, Button, Spin, InputNumber, Divider, Rate, Tag, message } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { Title, Text, Paragraph } = Typography;

const ProductDetailComponent = ({ productId }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        message.error('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    try {
      setAddingToCart(true);
      
      // Lấy giỏ hàng từ localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = cartItems.findIndex(item => item.product_id === productId);
      
      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã có, tăng số lượng
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa có, thêm mới
        cartItems.push({
          product_id: productId,
          quantity: quantity,
          price: product.price,
          name: product.name,
          image: product.image
        });
      }
      
      // Lưu lại vào localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      message.success('Đã thêm vào giỏ hàng');
      
      // Có thể emit một event để cập nhật số lượng trong header
      const event = new CustomEvent('cartUpdated', { 
        detail: { cartItems } 
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      message.error('Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <Row gutter={[32, 32]}>
        {/* Cột trái - Hình ảnh */}
        <Col xs={24} md={12}>
          <Image
            src={product.image}
            alt={product.name}
            style={{ width: '100%', objectFit: 'cover' }}
            fallback="https://via.placeholder.com/600x600"
          />
          <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
            <Col span={6}>
              <Image
                src={product.image}
                style={{ width: '100%', height: 'auto' }}
                fallback="https://via.placeholder.com/150x150"
              />
            </Col>
            {/* Có thể thêm nhiều ảnh thumbnail khác ở đây */}
          </Row>
        </Col>

        {/* Cột phải - Thông tin sản phẩm */}
        <Col xs={24} md={12}>
          <div style={{ position: 'sticky', top: 20 }}>
            {/* Tên sản phẩm */}
            <Title level={2} style={{ marginBottom: 8 }}>
              {product.name}
            </Title>

            {/* Đánh giá */}
            <div style={{ marginBottom: 16 }}>
              <Rate disabled defaultValue={4.5} style={{ fontSize: 16 }} />
              <Text style={{ marginLeft: 8 }}>4.5 (123 đánh giá)</Text>
            </div>

            {/* Giá */}
            <div style={{ marginBottom: 24 }}>
              <Title level={3} type="danger" style={{ marginBottom: 0 }}>
                {product.price?.toLocaleString('vi-VN')}đ
              </Title>
              <Text type="secondary" delete>
                {(product.price * 1.2).toLocaleString('vi-VN')}đ
              </Text>
              <Tag color="red" style={{ marginLeft: 8 }}>-20%</Tag>
            </div>

            <Divider />

            {/* Mô tả ngắn */}
            <div style={{ marginBottom: 24 }}>
              <Title level={5}>Mô tả sản phẩm:</Title>
              <Paragraph>{product.description}</Paragraph>
            </div>

            {/* Số lượng */}
            <div style={{ marginBottom: 24 }}>
              <Text strong>Số lượng: </Text>
              <InputNumber
                min={1}
                max={99}
                value={quantity}
                onChange={setQuantity}
                style={{ marginLeft: 8 }}
              />
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                style={{ flex: 2 }}
                onClick={handleAddToCart}
                loading={addingToCart}
              >
                {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
              </Button>
            </div>

            {/* Thông tin thêm */}
            <Divider />
            <div>
              <Title level={5}>Thông tin chi tiết:</Title>
              <Row gutter={[16, 8]}>
                <Col span={8}>
                  <Text type="secondary">Thương hiệu:</Text>
                </Col>
                <Col span={16}>
                  <Text strong>{product.brand || 'Đang cập nhật'}</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary">Xuất xứ:</Text>
                </Col>
                <Col span={16}>
                  <Text strong>{product.origin || 'Đang cập nhật'}</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary">Bảo hành:</Text>
                </Col>
                <Col span={16}>
                  <Text strong>{product.warranty || '12 tháng'}</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary">Tình trạng:</Text>
                </Col>
                <Col span={16}>
                  <Tag color="green">Còn hàng</Tag>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailComponent; 