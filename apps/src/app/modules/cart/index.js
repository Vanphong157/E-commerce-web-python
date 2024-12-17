'use client';
import { Button, Col, Input, InputNumber, Row, Typography, Empty, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Shipping from './Shipping';
import { DeleteFilled, ShoppingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CartComponent = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee] = useState(30000); // Phí ship cố định
  const [discount] = useState(0); // Giảm giá

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

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = Math.max(1, newQuantity);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);

    // Emit event để cập nhật số lượng trong header
    const event = new CustomEvent('cartUpdated', { 
      detail: { cartItems: updatedItems } 
    });
    window.dispatchEvent(event);
  };

  const handleRemoveProduct = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);

    // Emit event để cập nhật số lượng trong header
    const event = new CustomEvent('cartUpdated', { 
      detail: { cartItems: updatedItems } 
    });
    window.dispatchEvent(event);
    message.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleCreateOrder = async () => {
    const user_id = localStorage.getItem('user_id');
    
    if (!user_id) {
      message.warning('Vui lòng đăng nhập để đặt hàng');
      router.push('/auth');
      return;
    }

    if (cartItems.length === 0) {
      message.warning('Giỏ hàng trống');
      return;
    }

    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px', 
        background: 'white',
        borderRadius: '8px',
        margin: '20px auto',
        maxWidth: '600px'
      }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>Giỏ hàng trống</span>
          }
        >
          <Link href="/all-products">
            <Button type="primary" icon={<ShoppingOutlined />}>
              Tiếp tục mua sắm
            </Button>
          </Link>
        </Empty>
      </div>
    );
  }

  return (
    <Row style={{ maxWidth: "1200px", background: 'white', margin: "0 auto", color: "black" }}>
      <Col span={17} style={{ padding: '1rem' }}>
        <h2 className='text-xl font-medium mb-5'>Chọn địa chỉ nhận hàng</h2>
        <Shipping />
      </Col>
      <Col span={7} className='p-2' style={{ padding: '1rem' }}>
        <h2 className='text-xl font-medium mb-5'>Giỏ hàng của bạn</h2>
        {cartItems.map((item, index) => (
          <div key={index} style={{ 
            minHeight: '120px', 
            display: 'flex', 
            padding: '10px',
            borderBottom: '1px solid #f0f0f0',
            marginBottom: '10px'
          }}>
            <div style={{ width: '100px', marginRight: '15px' }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '8px', fontSize: '16px' }}>{item.name}</h3>
              <div style={{ color: '#f2405d', fontWeight: 'bold', marginBottom: '8px' }}>
                {item.price.toLocaleString('vi-VN')}đ
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <InputNumber
                  min={1}
                  max={99}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(index, value)}
                  style={{ width: '100px' }}
                />
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteFilled />}
                  onClick={() => handleRemoveProduct(index)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Tạm tính</span>
            <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Phí vận chuyển</span>
            <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#f2405d' }}>
              <span>Giảm giá</span>
              <span>-{discount.toLocaleString('vi-VN')}đ</span>
            </div>
          )}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '1px solid #e8e8e8',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            <span>Tổng cộng</span>
            <span style={{ color: '#f2405d' }}>
              {(totalPrice + shippingFee - discount).toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        <Button 
          type="primary" 
          size="large" 
          block 
          style={{ 
            marginTop: '20px',
            height: '45px',
            fontSize: '16px'
          }}
          onClick={handleCreateOrder}
        >
          Đặt hàng
        </Button>
      </Col>
    </Row>
  );
};

export default CartComponent;