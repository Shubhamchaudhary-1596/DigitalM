import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Edit,
  Trash2,
  Plus,
  Eye,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Settings
} from 'lucide-react';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // const response = await fetch('/api/services');
        // const data = await response.json();

        // Mock data for now
        const mockServices = [
          {
            id: 1,
            title: 'SEO Optimization',
            description: 'Dominate search results with our comprehensive SEO strategies...',
            category: 'seo',
            price: 'Starting from $2,500/mo',
            results: 'Average 450% increase in organic traffic',
            active: true,
            featured: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15'
          },
          {
            id: 2,
            title: 'PPC Advertising',
            description: 'Maximize your advertising ROI with data-driven PPC campaigns...',
            category: 'ppc',
            price: 'Starting from $3,000/mo',
            results: 'Average 4.2x return on ad spend',
            active: true,
            featured: false,
            createdAt: '2024-01-02',
            updatedAt: '2024-01-12'
          },
          {
            id: 3,
            title: 'Social Media Marketing',
            description: 'Build engaged communities and drive conversions...',
            category: 'social',
            price: 'Starting from $1,800/mo',
            results: 'Average 300% follower growth',
            active: true,
            featured: false,
            createdAt: '2024-01-03',
            updatedAt: '2024-01-10'
          }
        ];

        setServices(mockServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        // await fetch(`/api/services/${serviceId}`, { method: 'DELETE' });
        setServices(services.filter(service => service.id !== serviceId));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleToggleActive = async (serviceId) => {
    try {
      // const response = await fetch(`/api/services/${serviceId}/toggle`, { method: 'PATCH' });
      // const updatedService = await response.json();

      setServices(services.map(service =>
        service.id === serviceId
          ? { ...service, active: !service.active }
          : service
      ));
    } catch (error) {
      console.error('Error toggling service status:', error);
    }
  };

  const handleToggleFeatured = async (serviceId) => {
    try {
      // const response = await fetch(`/api/services/${serviceId}/toggle-featured`, { method: 'PATCH' });
      // const updatedService = await response.json();

      setServices(services.map(service =>
        service.id === serviceId
          ? { ...service, featured: !service.featured }
          : service
      ));
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && service.active) ||
                         (filterStatus === 'inactive' && !service.active);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'seo', label: 'SEO' },
    { value: 'ppc', label: 'PPC' },
    { value: 'social', label: 'Social Media' },
    { value: 'web', label: 'Web Development' },
    { value: 'content', label: 'Content Marketing' },
    { value: 'analytics', label: 'Analytics' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Manager</h1>
          <p className="text-gray-600 mt-1">Manage your service offerings and pricing</p>
        </div>
        <Link to="/services/new" className="text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Service
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pl-10"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            {filteredServices.length} of {services.length} services
          </div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="card hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              <div className="flex items-center space-x-2">
                {service.featured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
                <button
                  onClick={() => handleToggleActive(service.id)}
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    service.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {service.active ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {service.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                <span>{service.price}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                <span>{service.results}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {service.category.toUpperCase()}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleFeatured(service.id)}
                  className={`p-1 rounded ${service.featured ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600`}
                  title={service.featured ? 'Unfeature' : 'Feature'}
                >
                  ⭐
                </button>
                <Link
                  to={`/services/${service.id}`}
                  className="text-blue-600 hover:text-blue-900 p-1"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/services/edit/${service.id}`}
                  className="text-green-600 hover:text-green-900 p-1"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 hover:text-red-900 p-1"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 card"
        >
          <p className="text-gray-500 text-lg">No services found.</p>
          <Link
            to="/services/new"
            className="mt-4 inline-flex items-center text-primary hover:text-secondary font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create your first service
          </Link>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{services.length}</div>
            <div className="text-sm text-gray-600">Total Services</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {services.filter(s => s.active).length}
            </div>
            <div className="text-sm text-gray-600">Active Services</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {services.filter(s => s.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Services</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {services.filter(s => !s.active).length}
            </div>
            <div className="text-sm text-gray-600">Inactive Services</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceManager;
