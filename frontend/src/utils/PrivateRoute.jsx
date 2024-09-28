// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useSelector((state) => state.auth);

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  // Check if user role matches allowed roles
  if (!roles.includes(user.role)) {
    return <Navigate to="/" />; // Redirect to login if role does not match
  }

  return children; // Render children (dashboard) if authenticated and authorized
};

export default PrivateRoute;
