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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white rounded-xl shadow-sm p-6 border border-gray-200"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Manager</h1>
          <p className="text-gray-600 text-lg">Manage your service offerings and pricing with ease</p>
        </div>
        <Link to="/services/new" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center transform hover:scale-105">
          <Plus className="h-5 w-5 mr-2" />
          New Service
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 transition-all duration-200"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 transition-all duration-200"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex items-center justify-center bg-primary/10 rounded-xl px-4 py-3">
            <Filter className="h-5 w-5 mr-3 text-primary" />
            <span className="text-sm font-medium text-gray-700">
              {filteredServices.length} of {services.length} services
            </span>
          </div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col h-full"
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{service.title}</h3>
                <div className="flex items-center space-x-2 ml-4">
                  {service.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-sm">
                      ⭐ Featured
                    </span>
                  )}
                  <button
                    onClick={() => handleToggleActive(service.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                      service.active
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm'
                        : 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-sm'
                    }`}
                  >
                    {service.active ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-700 bg-green-50 rounded-lg p-3">
                  <DollarSign className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-semibold">{service.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 bg-blue-50 rounded-lg p-3">
                  <TrendingUp className="h-5 w-5 mr-3 text-blue-600" />
                  <span>{service.results}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                  {service.category.toUpperCase()}
                </span>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleToggleFeatured(service.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      service.featured
                        ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                        : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                    }`}
                    title={service.featured ? 'Unfeature' : 'Feature'}
                  >
                    ⭐
                  </button>
                  <Link
                    to={`/services/${service.id}`}
                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/services/edit/${service.id}`}
                    className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="mb-6">
            <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl font-medium">No services found.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or create a new service.</p>
          </div>
          <Link
            to="/services/new"
            className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create your first service
          </Link>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Service Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2">{services.length}</div>
            <div className="text-sm font-medium text-gray-600">Total Services</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {services.filter(s => s.active).length}
            </div>
            <div className="text-sm font-medium text-gray-600">Active Services</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {services.filter(s => s.featured).length}
            </div>
            <div className="text-sm font-medium text-gray-600">Featured Services</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {services.filter(s => !s.active).length}
            </div>
            <div className="text-sm font-medium text-gray-600">Inactive Services</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceManager;
