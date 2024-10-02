import React from 'react';
import { Outlet } from 'react-router-dom'; // Allows rendering of child routes
import { AdminSidebar } from '../sidebar/AdminSidebar'; // Import the Admin Sidebar

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar /> {/* Sidebar for Admin */}
      <div className="flex-grow p-4">
        <Outlet /> {/* This renders the child routes like dashboard, pengguna, menu, etc. */}
      </div>
    </div>
  );
};

export default AdminLayout;
