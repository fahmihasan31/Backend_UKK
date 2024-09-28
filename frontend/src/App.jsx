import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Make sure this is the correct path to your Redux store
import Login from './pages/Login'; // Adjust path as necessary
import AdminDashboard from './pages/adminDashboard'; // Create these components
import KasirDashboard from './pages/KasirDashboard';
import ManajerDashboard from './pages/ManajerDashboard';
import PrivateRoute from './utils/PrivateRoute'; // Create this component for route protection

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/kasir-dashboard"
            element={
              <PrivateRoute roles={['kasir']}>
                <KasirDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/manajer-dashboard"
            element={
              <PrivateRoute roles={['manajer']}>
                <ManajerDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
