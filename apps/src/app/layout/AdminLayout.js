'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Content, Sider } = Layout;

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    
    // Xóa cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    
    router.push('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link href="/admin">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link href="/admin/users">Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            <Link href="/admin/orders">Quản lý đơn hàng</Link>
          </Menu.Item>
          <Menu.Item 
            key="4" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            style={{ color: '#ff4d4f' }}  // Màu đỏ cho nút logout
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 