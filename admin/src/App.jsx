import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import BlogManager from './pages/BlogManager';
import AddBlog from './pages/AddBlog';
import ServiceManager from './pages/ServiceManager';
import PackageManager from './pages/PackageManager';
import ProjectManager from './pages/ProjectManager';
import UserManager from './pages/UserManager';
import Profile from './pages/Profile';
import CategoryManager from './pages/CategoryManager';
import BlogCategoryManager from './pages/BlogCategoryManager';
import LeadsManager from './pages/LeadsManager';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* All routes are now public for development */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="blogs/new" element={<AddBlog />} />
            <Route path="blogs/edit/:id" element={<AddBlog />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="blog-categories" element={<BlogCategoryManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="services/new" element={<ServiceManager />} />
            <Route path="services/edit/:id" element={<ServiceManager />} />
            <Route path="packages" element={<PackageManager />} />
            <Route path="packages/new" element={<PackageManager />} />
            <Route path="packages/edit/:id" element={<PackageManager />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="projects/new" element={<ProjectManager />} />
            <Route path="projects/edit/:id" element={<ProjectManager />} />
            <Route path="users" element={<UserManager />} />
            <Route path="profile" element={<Profile />} />
            <Route path="leads" element={<LeadsManager />} />
          </Route>

          {/* Public routes for auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
