"use client";

import React, { useEffect, useState } from 'react';
import { Col, Avatar, Input, Row, Badge, Dropdown, Button, Space } from "antd";
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
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
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Input
            style={{
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: 10,
            }}
            variant="borderless"
            addonBefore={<SearchOutlined style={{ backgroundColor: "#fff" }} />}
            placeholder="SEARCH"
            addonAfter={<FilterOutlined style={{ backgroundColor: "#fff" }} />}
          />
        </Col>
        <Col span={6} style={accountDisplay}>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Row>
              <Avatar
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCgzi25vrxThkVJpvGmFFxOES9um9kjtFyag&s"
                }
              />
            </Row>
            <Row>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                Tài khoản
              </span>
            </Row>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Row>
              <Badge count={100}>
                <Avatar
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCgzi25vrxThkVJpvGmFFxOES9um9kjtFyag&s"
                  }
                />
              </Badge>
            </Row>
            <Row>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                Thông báo
              </span>
            </Row>
          </Col>
        </Col>
      </Row>
    </>
  );
};
export default HeaderState;
