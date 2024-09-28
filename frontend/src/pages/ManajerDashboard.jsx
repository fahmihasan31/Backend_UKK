// src/pages/dashboard/ManajerDashboard.jsx
import React from 'react';

const ManajerDashboard = () => {
  return (
    <div className="container">
      <h1 className="title">Manajer Dashboard</h1>
      <p>Welcome, Manajer! Here you can oversee operations and manage staff.</p>
      {/* Add more functionalities as required */}
      <div className="mt-4">
        <button className="button is-primary">Manage Staff</button>
        <button className="button is-info">View Operations</button>
      </div>
    </div>
  );
};

export default ManajerDashboard;
