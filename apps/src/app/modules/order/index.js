"use client";

import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, message, Space } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '0đ';
  return `${Number(amount).toLocaleString('vi-VN')}đ`;
};

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        message.warning('Vui lòng đăng nhập để xem đơn hàng');
        router.push('/signin');
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/users/${user_id}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'gold',
      'processing': 'blue',
      'shipping': 'cyan',
      'completed': 'green',
      'cancelled': 'red'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      'pending': 'Chờ xác nhận',
      'processing': 'Đang xử lý',
      'shipping': 'Đang giao hàng',
      'completed': 'Đã hoàn thành',
      'cancelled': 'Đã hủy'
    };
    return texts[status] || status;
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      render: (id) => <a onClick={() => router.push(`/order/${id}`)}>{id.slice(-8).toUpperCase()}</a>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : '',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <>
          {items?.map((item, index) => (
            <div key={index}>
              {item.name} x {item.quantity}
            </div>
          )) || 'Không có sản phẩm'}
        </>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: formatCurrency,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => router.push(`/order/${record._id}`)}
          >
            Chi tiết
          </Button>
          {record.status === 'pending' && (
            <Button 
              type="text" 
              danger
              onClick={() => handleCancelOrder(record._id)}
            >
              Hủy đơn
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/orders/${orderId}/status`, {
        status: 'cancelled'
      });
      message.success('Đã hủy đơn hàng');
      fetchOrders(); // Refresh danh sách
    } catch (error) {
      console.error('Error cancelling order:', error);
      message.error('Không thể hủy đơn hàng');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <h2 style={{ marginBottom: '20px' }}>Đơn hàng của tôi</h2>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Tổng ${total} đơn hàng`,
        }}
      />
    </div>
  );
};

export default OrderComponent;
