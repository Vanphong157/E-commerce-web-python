"use client";

import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Row, Col, Tabs, message, Avatar, Upload } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { TabPane } = Tabs;

const PersonalComponent = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        message.warning('Vui lòng đăng nhập');
        router.push('/auth');
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/users/${user_id}`);
      setUserData(response.data);
      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      message.error('Không thể tải thông tin người dùng');
    }
  };

  const onFinishInfo = async (values) => {
    try {
      setLoading(true);
      const user_id = localStorage.getItem('user_id');
      
      const response = await axios.put(`http://127.0.0.1:8000/users/${user_id}`, values);
      
      if (response.status === 200) {
        message.success('Cập nhật thông tin thành công');
        localStorage.setItem('name', values.name);
        // Emit event để cập nhật header
        const event = new CustomEvent('userUpdated', { 
          detail: { name: values.name } 
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  const onFinishPassword = async (values) => {
    try {
      setLoading(true);
      const user_id = localStorage.getItem('user_id');
      
      const response = await axios.put(`http://127.0.0.1:8000/users/${user_id}/password`, {
        old_password: values.oldPassword,
        new_password: values.newPassword
      });
      
      if (response.status === 200) {
        message.success('Đổi mật khẩu thành công');
        passwordForm.resetFields();
      }
    } catch (error) {
      console.error('Error changing password:', error);
      message.error('Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      <Row gutter={24}>
        <Col span={6}>
          <Card style={{ marginBottom: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar 
                size={100} 
                src={userData?.avatar} 
                icon={<UserOutlined />} 
              />
              <h3 style={{ marginTop: 16, marginBottom: 4 }}>{userData?.name}</h3>
              <p style={{ color: '#666' }}>{userData?.email}</p>
            </div>
          </Card>
        </Col>

        <Col span={18}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin cá nhân" key="1">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinishInfo}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Họ tên" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                          { required: true, message: 'Vui lòng nhập số điện thoại!' },
                          { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                        ]}
                      >
                        <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" disabled />
                  </Form.Item>

                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                  >
                    <Input.TextArea rows={3} placeholder="Địa chỉ" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Cập nhật thông tin
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Đổi mật khẩu" key="2">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={onFinishPassword}
                >
                  <Form.Item
                    name="oldPassword"
                    label="Mật khẩu hiện tại"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu hiện tại" />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalComponent;
