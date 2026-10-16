import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import BlogManager from './pages/BlogManager';
import ServiceManager from './pages/ServiceManager';
import ContactsManager from './pages/ContactsManager';
import PortfolioManager from './pages/PortfolioManager';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="blogs/new" element={<BlogManager />} />
            <Route path="blogs/edit/:id" element={<BlogManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="services/new" element={<ServiceManager />} />
            <Route path="services/edit/:id" element={<ServiceManager />} />
            <Route path="contacts" element={<ContactsManager />} />
            <Route path="portfolio" element={<PortfolioManager />} />
          </Route>

          {/* Public routes for auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
