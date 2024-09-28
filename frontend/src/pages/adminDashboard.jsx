// src/pages/dashboard/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1 className="title">Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users, view reports, and handle settings.</p>
      {/* Add more functionalities as required */}
      <div className="mt-4">
        <button className="button is-primary">Manage Users</button>
        <button className="button is-info">View Reports</button>
        <button className="button is-warning">Settings</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
