'use client';

import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const checkStorageData = () => {
    console.log('LocalStorage data after login:');
    console.log('user_id:', localStorage.getItem('user_id'));
    console.log('name:', localStorage.getItem('name'));
    console.log('email:', localStorage.getItem('email'));
    console.log('isAdmin:', localStorage.getItem('isAdmin'));
    console.log('role:', localStorage.getItem('role'));
    console.log('token:', localStorage.getItem('token'));
  };

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/login', values, {
        withCredentials: true
      });
      console.log('Login response:', response.data);
      
      const { user_id, name, email, isAdmin, token, role, username } = response.data;
      
      // Lưu vào localStorage
      localStorage.setItem('user_id', user_id || '');
      localStorage.setItem('name', name || '');
      localStorage.setItem('email', email || '');
      localStorage.setItem('isAdmin', String(isAdmin));
      localStorage.setItem('role', role || 'user');
      localStorage.setItem('token', token || '');
      
      message.success('Đăng nhập thành công');
      
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

  return (
    <Form
      name="login"
      onFinish={handleLogin}
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không hợp lệ!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm; 