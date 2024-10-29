import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../sidebar/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;