import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Settings,
  Inbox,
  Briefcase,
  User,
  LogOut,
  Menu,
  Bell
} from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Blogs', href: '/blogs', icon: FileText },
    { name: 'Services', href: '/services', icon: Settings },
    { name: 'Enquiries', href: '/contacts', icon: Inbox },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="admin-layout">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 40
          }}
          onClick={() => setSidebarOpen(false)}
        >
        </div>
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          Webzoneo Admin
        </div>

        {/* Navigation */}
        <nav>
          {navigation.map((item) => {
            if (item.adminOnly && user?.role !== 'admin') return null;

            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={isActive(item.href) ? 'active' : ''}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon style={{ display: 'inline-block', marginRight: '0.5rem', width: '1rem', height: '1rem' }} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User menu */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #e5e7eb',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: '#0ea5a4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User style={{ width: '1rem', height: '1rem', color: 'white' }} />
            </div>
            <div style={{ marginLeft: '0.75rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>
                {user?.name}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                {user?.email}
              </p>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                color: '#374151',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              <LogOut style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="admin-main">
        {/* Top bar */}
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
            </button>

            <div></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280'
              }}>
                <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: '#0ea5a4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User style={{ width: '1rem', height: '1rem', color: 'white' }} />
                </div>
                <span style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
