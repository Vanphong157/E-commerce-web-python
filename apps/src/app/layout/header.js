"use client";

import React, { useEffect, useState } from 'react';
import { Col, Avatar, Input, Row, Badge, Dropdown, Button, Space, Menu } from "antd";
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined, DashboardOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const styles = {
  header: {
    background: '#1a94ff',
    padding: '10px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    width: '150px',
    height: '40px',
    position: 'relative',
  },
  logoWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    borderRadius: '8px',
    '.ant-input': {
      height: '40px'
    }
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#fff',
    transition: 'all 0.3s'
  },
  iconText: {
    fontSize: '13px',
    marginTop: '4px',
    color: '#fff'
  },
  userButton: {
    color: '#fff',
    border: 'none',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(255,255,255,0.1)'
    }
  }
};

const HeaderState = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Kiểm tra đăng nhập và quyền admin
  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const name = localStorage.getItem('name');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';

    if (user_id) {
      setIsLoggedIn(true);
      setUserName(name || 'User');
    }
    
    setIsAdmin(adminStatus);
  }, []);

  // Xử lý giỏ hàng riêng
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartCount(cartItems.length);

    const handleCartUpdate = (event) => {
      const { cartItems } = event.detail;
      setCartCount(cartItems.length);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

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
    
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/');
  };

  const userMenuItems = [
    {
      key: '1',
      label: <Link href="/personal">Tài khoản của tôi</Link>,
      icon: <UserOutlined />
    },
    // Chỉ hiển thị menu admin nếu user là admin
    ...(isAdmin ? [{
      key: '2',
      label: <Link href="/admin">Quản trị</Link>,
      icon: <DashboardOutlined />
    }] : []),
    {
      key: '3',
      label: <Link href="/order">Đơn hàng của tôi</Link>,
      icon: <UserOutlined />
    },
    {
      key: '4',
      label: <span onClick={handleLogout}>Đăng xuất</span>,
      icon: <LogoutOutlined />,
      danger: true
    },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Row align="middle" gutter={16}>
          <Col span={4}>
            <Link href="/" style={styles.logo}>
              <div style={styles.logoWrapper}>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  sizes="150px"
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'left center'
                  }}
                  priority
                />
              </div>
            </Link>
          </Col>
          
          <Col span={12}>
            <div style={styles.searchContainer}>
              <Input
                size="large"
                placeholder="Tìm kiếm sản phẩm..."
                prefix={<SearchOutlined />}
                style={styles.searchInput}
              />
            </div>
          </Col>

          <Col span={8}>
            <Row justify="end" gutter={24}>
              <Col>
                <Link href="/cart" style={{ textDecoration: 'none' }}>
                  <div style={styles.iconContainer}>
                    <Badge count={cartCount}>
                      <Avatar size={32} icon={<ShoppingCartOutlined />} style={{ background: 'transparent' }} />
                    </Badge>
                    <div style={styles.iconText}>Giỏ hàng</div>
                  </div>
                </Link>
              </Col>

              <Col>
                {isLoggedIn ? (
                  <Dropdown 
                    menu={{ items: userMenuItems }} 
                    placement="bottomRight"
                    arrow
                  >
                    <Space style={styles.userButton}>
                      <Avatar icon={<UserOutlined />} />
                      <span style={styles.iconText}>{userName}</span>
                    </Space>
                  </Dropdown>
                ) : (
                  <Link href="/auth" style={{ textDecoration: 'none' }}>
                    <div style={styles.iconContainer}>
                      <Avatar size={32} icon={<UserOutlined />} style={{ background: 'transparent' }} />
                      <div style={styles.iconText}>Đăng nhập</div>
                    </div>
                  </Link>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default HeaderState;
