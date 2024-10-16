// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');

  // If the user is not logged in or does not have an allowed role, clear token and redirect to login
  if (!role || !allowedRoles.includes(role)) {
    // Clear token and role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username'); // Optional: clear username if needed

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;