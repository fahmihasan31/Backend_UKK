import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/LoginPage';
import NotFoundPage from './pages/utils/NotFoundPage';

import ProtectedRoute from './pages/utils/protectedRoute';

import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/dashboard/adminDashboard';
import Pengguna from './pages/admin/pengguna/pengguna';
import Menu from './pages/admin/menu/menu';
import Meja from './pages/admin/meja/meja';

import ManajerLayout from './components/layout/ManajerLayout';
import ManajerDashboard from './pages/manajer/dashboard/manajerDashboard';
import DataTransaksi from './pages/manajer/dataTransaksi/dataTransaksi';

import KasirLayout from './components/layout/KasirLayout';
import KasirDashboard from './pages/kasir/dashboard/kasirDashboard';
import Transaksi from './pages/kasir/transaksi/transaksi';
import HistoryTransaksi from './pages/kasir/historyTransaksi/historyTransaksi';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to /login by default */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* Route for login */}
        <Route path="/login" element={<Login />} />

        {/* Routes for admin */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
          <Route index element={<AdminDashboard />} />
          <Route path="pengguna" element={<Pengguna />} />
          <Route path="menu" element={<Menu />} />
          <Route path="meja" element={<Meja />} />
        </Route>

        {/* Routes for manager */}
        <Route
          path="/dashboard/manajer"
          element={
            <ProtectedRoute allowedRoles={['manajer']}>
              <ManajerLayout />
            </ProtectedRoute>
          }>
          <Route index element={<ManajerDashboard />} />
          <Route path="data-transaksi" element={<DataTransaksi />} />
        </Route>

        <Route
          path="/dashboard/kasir"
          element={
            <ProtectedRoute allowedRoles={['kasir']}>
              <KasirLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<KasirDashboard />} />
          <Route path="transaksi" element={<Transaksi />} />
          <Route path="history-transaksi" element={<HistoryTransaksi />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;