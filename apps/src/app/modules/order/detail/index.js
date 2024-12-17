"use client";

import React, { useState, useEffect } from 'react';
import { Card, Steps, Descriptions, Table, Tag, Row, Col, Divider, message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const { Step } = Steps;

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '0đ';
  return `${Number(amount).toLocaleString('vi-VN')}đ`;
};

const OrderDetailComponent = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      message.error('Không thể tải thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    const statusMap = {
      'pending': 0,
      'processing': 1,
      'shipping': 2,
      'completed': 3,
      'cancelled': -1
    };
    return statusMap[status] || 0;
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.image}
            alt={text}
            style={{ width: 50, height: 50, marginRight: 10, objectFit: 'cover' }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: formatCurrency,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_, record) => formatCurrency(record.price * record.quantity),
    },
  ];

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
      <Card title={`Chi tiết đơn hàng #${orderId.slice(-8).toUpperCase()}`}>
        {order.status !== 'cancelled' && (
          <>
            <Steps current={getStatusStep(order.status)} style={{ marginBottom: 24 }}>
              <Step title="Đặt hàng" description="Chờ xác nhận" />
              <Step title="Xử lý" description="Đang xử lý" />
              <Step title="Vận chuyển" description="Đang giao hàng" />
              <Step title="Hoàn thành" description="Đã giao hàng" />
            </Steps>
            <Divider />
          </>
        )}

        <Row gutter={24}>
          <Col span={12}>
            <Card type="inner" title="Thông tin giao hàng">
              <Descriptions column={1}>
                <Descriptions.Item label="Người nhận">
                  {order.shipping_address?.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {order.shipping_address?.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">
                  {order.shipping_address?.address}
                </Descriptions.Item>
                <Descriptions.Item label="Tỉnh/Thành phố">
                  {order.shipping_address?.city}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={12}>
            <Card type="inner" title="Thông tin đơn hàng">
              <Descriptions column={1}>
                <Descriptions.Item label="Mã đơn hàng">
                  #{orderId.slice(-8).toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày đặt">
                  {new Date(order.created_at).toLocaleDateString('vi-VN')}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color={
                    order.status === 'completed' ? 'green' :
                    order.status === 'cancelled' ? 'red' :
                    'blue'
                  }>
                    {order.status === 'pending' ? 'Chờ xác nhận' :
                     order.status === 'processing' ? 'Đang xử lý' :
                     order.status === 'shipping' ? 'Đang giao hàng' :
                     order.status === 'completed' ? 'Đã hoàn thành' :
                     'Đã hủy'}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Phương thức thanh toán">
                  {order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Table
          columns={columns}
          dataSource={order.items}
          pagination={false}
          rowKey="product_id"
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3} style={{ textAlign: 'right' }}>
                  <strong>Tạm tính:</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  {formatCurrency(order.total_amount - order.shipping_fee)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3} style={{ textAlign: 'right' }}>
                  <strong>Phí vận chuyển:</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  {formatCurrency(order.shipping_fee)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3} style={{ textAlign: 'right' }}>
                  <strong>Tổng cộng:</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <strong style={{ color: '#f2405f' }}>
                    {formatCurrency(order.total_amount)}
                  </strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default OrderDetailComponent; 