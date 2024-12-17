"use client";

import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from '../../config/axios.config';
import { useRouter } from 'next/navigation';

const { TabPane } = Tabs;

const AuthComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinishLogin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/login', values);
      console.log('Login response:', response.data);
      
      const { user_id, name, email, isAdmin, token, role } = response.data;
      
      // Lưu thông tin vào localStorage
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('name', name || '');
      localStorage.setItem('email', email || '');
      localStorage.setItem('isAdmin', String(isAdmin));
      localStorage.setItem('role', role || 'user');
      localStorage.setItem('token', token || '');

      message.success('Đăng nhập thành công');
      
      // Điều hướng dựa trên role
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const onFinishRegister = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/signup', values);
      
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
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
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
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
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