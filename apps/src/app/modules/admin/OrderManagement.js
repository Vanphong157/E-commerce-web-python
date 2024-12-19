'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Tag,
  Button,
  message,
  Space,
  Modal,
  Select
} from 'antd';

const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/orders');
      setOrders(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/orders/${orderId}`, {
        status: newStatus
      });
      message.success('Cập nhật trạng thái thành công');
      fetchOrders();
    } catch (error) {
      message.error('Không thể cập nhật trạng thái');
    }
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      render: (id) => <span>#{id.slice(-6).toUpperCase()}</span>
    },
    {
      title: 'Khách hàng',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user?.name || 'N/A'
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `${total?.toLocaleString()} VNĐ`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          pending: 'gold',
          processing: 'blue',
          shipping: 'cyan',
          completed: 'green',
          cancelled: 'red'
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showOrderDetails(record)}>
            Chi tiết
          </Button>
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleUpdateStatus(record._id, value)}
          >
            <Option value="pending">Chờ xử lý</Option>
            <Option value="processing">Đang xử lý</Option>
            <Option value="shipping">Đang giao</Option>
            <Option value="completed">Hoàn thành</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </Space>
      )
    }
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý đơn hàng</h2>
      
      <Table 
        columns={columns} 
        dataSource={orders} 
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?._id?.slice(-6).toUpperCase()}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <h3>Thông tin khách hàng</h3>
            <p>Tên: {selectedOrder.user?.name}</p>
            <p>Email: {selectedOrder.user?.email}</p>
            <p>Số điện thoại: {selectedOrder.user?.phone}</p>
            
            <h3>Địa chỉ giao hàng</h3>
            <p>{selectedOrder.shippingAddress}</p>
            
            <h3>Sản phẩm</h3>
            <Table
              dataSource={selectedOrder.items}
              columns={[
                {
                  title: 'Sản phẩm',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Số lượng',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: 'Đơn giá',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price) => `${price?.toLocaleString()} VNĐ`
                },
                {
                  title: 'Thành tiền',
                  key: 'total',
                  render: (_, record) => `${(record.price * record.quantity).toLocaleString()} VNĐ`
                }
              ]}
              pagination={false}
            />
            
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <h3>Tổng cộng: {selectedOrder.total?.toLocaleString()} VNĐ</h3>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement; 