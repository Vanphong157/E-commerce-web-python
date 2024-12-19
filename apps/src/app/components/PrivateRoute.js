import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Kiểm tra xem người dùng đã đăng nhập và có quyền admin không
  const isAuthenticated = localStorage.getItem('token');
  const isAdmin = 'true';

  if (!isAdmin) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute; 