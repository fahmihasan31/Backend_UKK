import React from 'react';
import { Outlet } from 'react-router-dom';
import { KasirSidebar } from '../sidebar/KasirSidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <KasirSidebar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;