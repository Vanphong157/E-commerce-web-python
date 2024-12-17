'use client';

import React, { useState, useEffect } from 'react';
import axios from '../../config/axios.config';
import {
  Table,
  Tag,
  Button,
  message,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm
} from 'antd';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [mounted, setMounted] = useState(false);

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/users');
      console.log('Response data:', response.data); // Debug response

      // Lọc chỉ lấy user có role là 'user'
      const normalUsers = response.data.filter(user => user.role === 'user');
      console.log('Filtered users:', normalUsers); // Debug filtered users
      setUsers(normalUsers);
    } catch (error) {
      console.error('Error:', error);
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchUsers();
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    console.log('Users state updated:', users);
  }, [users]);

  // Xử lý cập nhật người dùng
  const handleSubmit = async (values) => {
    if (!mounted) return;

    try {
      setLoading(true);
      await axios.put(`/users/${editingUser._id}`, values);
      message.success('Cập nhật thành công');
      setIsModalVisible(false);
      await fetchUsers();
    } catch (error) {
      message.error('Không thể cập nhật người dùng');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa người dùng
  const handleDelete = async (userId) => {
    if (!mounted) return;

    try {
      setLoading(true);
      await axios.delete(`/users/${userId}`);
      message.success('Xóa người dùng thành công');
      await fetchUsers();
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Không thể xóa người dùng');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => email || 'Chưa cập nhật'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => phone || 'Chưa cập nhật'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setEditingUser(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý người dùng</h2>

      <Table 
        columns={columns} 
        dataSource={users}
        rowKey="_id"
        loading={loading}
        locale={{
          emptyText: 'Không có dữ liệu'
        }}
        pagination={{
          total: users.length,
          pageSize: 10,
          showTotal: (total) => `Tổng số ${total} người dùng`
        }}
      />

      <Modal
        title="Cập nhật thông tin người dùng"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Vui lòng nhập username' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 