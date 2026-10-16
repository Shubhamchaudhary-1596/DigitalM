import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import BlogManager from './pages/BlogManager';
import AddBlog from './pages/AddBlog';
import ServiceManager from './pages/ServiceManager';
<<<<<<< HEAD
import PackageManager from './pages/PackageManager';
import ProjectManager from './pages/ProjectManager';
import UserManager from './pages/UserManager';
import Profile from './pages/Profile';
import CategoryManager from './pages/CategoryManager';
import BlogCategoryManager from './pages/BlogCategoryManager';
import LeadsManager from './pages/LeadsManager';
=======
import ContactsManager from './pages/ContactsManager';
import PortfolioManager from './pages/PortfolioManager';
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
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
            <Route path="blogs/new" element={<AddBlog />} />
            <Route path="blogs/edit/:id" element={<AddBlog />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="blog-categories" element={<BlogCategoryManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="services/new" element={<ServiceManager />} />
            <Route path="services/edit/:id" element={<ServiceManager />} />
<<<<<<< HEAD
            <Route path="packages" element={<PackageManager />} />
            <Route path="packages/new" element={<PackageManager />} />
            <Route path="packages/edit/:id" element={<PackageManager />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="projects/new" element={<ProjectManager />} />
            <Route path="projects/edit/:id" element={<ProjectManager />} />
            <Route path="users" element={<UserManager />} />
            <Route path="profile" element={<Profile />} />
            <Route path="leads" element={<LeadsManager />} />
=======
            <Route path="contacts" element={<ContactsManager />} />
            <Route path="portfolio" element={<PortfolioManager />} />
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
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
