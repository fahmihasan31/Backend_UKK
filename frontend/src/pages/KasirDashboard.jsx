// src/pages/dashboard/KasirDashboard.jsx
import React from 'react';

const KasirDashboard = () => {
  return (
    <div className="container">
      <h1 className="title">Kasir Dashboard</h1>
      <p>Welcome, Kasir! Here you can manage orders and transactions.</p>
      {/* Add more functionalities as required */}
      <div className="mt-4">
        <button className="button is-success">Manage Orders</button>
        <button className="button is-info">View Transactions</button>
      </div>
    </div>
  );
};

export default KasirDashboard;
