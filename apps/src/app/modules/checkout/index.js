"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Card, Row, Col, Divider, message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CheckoutComponent = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee] = useState(30000);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
    calculateTotal(items);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const user_id = localStorage.getItem('user_id');
      
      if (!user_id) {
        message.warning('Vui lòng đăng nhập để đặt hàng');
        router.push('/signin');
        return;
      }

      const orderData = {
        user_id,
        items: cartItems,
        shipping_address: {
          fullName: values.fullName,
          phone: values.phone,
          address: values.address,
          city: values.city
        },
        payment_method: values.paymentMethod,
        total_amount: totalPrice + shippingFee,
        shipping_fee: shippingFee
      };

      const response = await axios.post('http://127.0.0.1:8000/orders', orderData);

      if (response.status === 200) {
        message.success('Đặt hàng thành công');
        localStorage.removeItem('cartItems'); // Xóa giỏ hàng
        router.push('/order'); // Chuyển đến trang đơn hàng
      }
    } catch (error) {
      console.error('Checkout error:', error);
      message.error('Đặt hàng thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={24}>
        <Col span={16}>
          <Card title="Thông tin giao hàng">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="fullName"
                label="Họ tên người nhận"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                name="city"
                label="Tỉnh/Thành phố"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              >
                <Input />
              </Form.Item>

              <Divider />

              <Form.Item
                name="paymentMethod"
                label="Phương thức thanh toán"
                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
              >
                <Radio.Group>
                  <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                  <Radio value="banking">Chuyển khoản ngân hàng</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  block
                  size="large"
                >
                  Đặt hàng
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Đơn hàng của bạn">
            {cartItems.map((item, index) => (
              <div 
                key={index}
                style={{ 
                  display: 'flex', 
                  marginBottom: 15,
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 15 }}
                />
                <div style={{ flex: 1 }}>
                  <div>{item.name}</div>
                  <div style={{ color: '#999' }}>Số lượng: {item.quantity}</div>
                  <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                    {item.price.toLocaleString('vi-VN')}đ
                  </div>
                </div>
              </div>
            ))}

            <Divider />

            <div style={{ marginBottom: 10 }}>
              <Row justify="space-between">
                <Col>Tạm tính:</Col>
                <Col>{totalPrice.toLocaleString('vi-VN')}đ</Col>
              </Row>
            </div>

            <div style={{ marginBottom: 10 }}>
              <Row justify="space-between">
                <Col>Phí vận chuyển:</Col>
                <Col>{shippingFee.toLocaleString('vi-VN')}đ</Col>
              </Row>
            </div>

            <Divider />

            <div style={{ fontWeight: 'bold', fontSize: 16 }}>
              <Row justify="space-between">
                <Col>Tổng cộng:</Col>
                <Col style={{ color: '#ff4d4f' }}>
                  {(totalPrice + shippingFee).toLocaleString('vi-VN')}đ
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutComponent; 