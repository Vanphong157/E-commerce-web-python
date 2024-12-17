import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../modules/admin/AdminDashboard';
import AdminLayout from '../layout/AdminLayout';
import PrivateRoute from '../components/PrivateRoute';
// Import các component khác...

const AppRoutes = () => {
  return (
    <Routes>
      {/* Các route khác */}
      
      {/* Route cho admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 