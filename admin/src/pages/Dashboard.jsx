import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  Settings,
  Package,
  FolderOpen,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalServices: 0,
    totalPackages: 0,
    totalProjects: 0,
    totalUsers: 0,
    recentActivity: []
  });

  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const response = await fetch('/api/dashboard/stats');
        // const data = await response.json();

        // Mock data for now
        setStats({
          totalBlogs: 12,
          totalServices: 8,
          totalPackages: 5,
          totalProjects: 15,
          totalUsers: 3,
          recentActivity: [
            { id: 1, type: 'blog', action: 'created', title: 'New SEO Guide', time: '2 hours ago' },
            { id: 2, type: 'service', action: 'updated', title: 'PPC Management', time: '4 hours ago' },
            { id: 3, type: 'user', action: 'registered', title: 'John Doe', time: '1 day ago' },
            { id: 4, type: 'project', action: 'completed', title: 'E-commerce Site', time: '2 days ago' }
          ]
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Add New Blog',
      description: 'Create a new blog post',
      icon: Plus,
      link: '/blogs/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Add Service',
      description: 'Create a new service',
      icon: Settings,
      link: '/services/new',
      color: 'bg-green-500'
    },
    {
      title: 'Add Package',
      description: 'Create a pricing package',
      icon: Package,
      link: '/packages/new',
      color: 'bg-purple-500'
    },
    {
      title: 'Add Project',
      description: 'Add a new project',
      icon: FolderOpen,
      link: '/projects/new',
      color: 'bg-orange-500'
    }
  ];

  const statCards = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: Settings,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Packages',
      value: stats.totalPackages,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Dashboard</h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Welcome back! Here's what's happening with your content.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/blogs/new" style={{
            backgroundColor: '#0ea5a4',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-color 0.3s ease'
          }}>
            <Plus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
            New Blog
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: stat.bgColor === 'bg-blue-100' ? '#dbeafe' :
                                   stat.bgColor === 'bg-green-100' ? '#dcfce7' :
                                   stat.bgColor === 'bg-purple-100' ? '#f3e8ff' :
                                   stat.bgColor === 'bg-orange-100' ? '#fed7aa' :
                                   stat.bgColor === 'bg-red-100' ? '#fee2e2' : '#f3f4f6'
                }}>
                  <Icon style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: stat.color === 'text-blue-600' ? '#2563eb' :
                           stat.color === 'text-green-600' ? '#16a34a' :
                           stat.color === 'text-purple-600' ? '#9333ea' :
                           stat.color === 'text-orange-600' ? '#ea580c' :
                           stat.color === 'text-red-600' ? '#dc2626' : '#374151'
                  }} />
                </div>
                <div style={{ marginLeft: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>{stat.title}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                style={{
                  display: 'block',
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                  backgroundColor: action.color === 'bg-blue-500' ? '#3b82f6' :
                                   action.color === 'bg-green-500' ? '#10b981' :
                                   action.color === 'bg-purple-500' ? '#8b5cf6' :
                                   action.color === 'bg-orange-500' ? '#f97316' : '#6b7280'
                }}>
                  <Icon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>{action.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem'
            }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: activity.type === 'blog' ? '#3b82f6' :
                                 activity.type === 'service' ? '#10b981' :
                                 activity.type === 'user' ? '#ef4444' :
                                 activity.type === 'project' ? '#f97316' : '#6b7280'
              }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} {activity.type}: {activity.title}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
