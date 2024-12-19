'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, message, Space, Empty } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CartComponent = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCart(items);
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    message.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      render: (_, record) => `${(record.price * record.quantity).toLocaleString()} VNĐ`,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => handleRemoveItem(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Giỏ hàng trống"
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
    <div style={{ padding: '20px' }}>
      <h2>Giỏ hàng</h2>
      <Table
        columns={columns}
        dataSource={cart}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Space>
          <h3>Tổng tiền: {totalAmount.toLocaleString()} VNĐ</h3>
          <Button 
            type="primary" 
            size="large"
            onClick={() => router.push('/checkout')}
          >
            Thanh toán
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CartComponent;