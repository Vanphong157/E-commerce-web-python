"use client";

import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { TabPane } = Tabs;

const AuthComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinishLogin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/auth/login', values);
      
      if (response.data.user_id) {
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('token', response.data.token);
        message.success('Đăng nhập thành công');
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishRegister = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/auth/register', values);
      
      if (response.status === 200) {
        message.success('Đăng ký thành công. Vui lòng đăng nhập.');
      }
    } catch (error) {
      console.error('Register error:', error);
      message.error('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400 }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Đăng nhập" key="1">
            <Form
              name="login"
              onFinish={onFinishLogin}
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Email" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  size="large"
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Đăng ký" key="2">
            <Form
              name="register"
              onFinish={onFinishRegister}
              layout="vertical"
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Họ tên" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Email" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined />} 
                  placeholder="Số điện thoại" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Xác nhận mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  size="large"
                  loading={loading}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthComponent; 