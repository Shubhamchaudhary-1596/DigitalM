import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye, DollarSign, TrendingUp } from 'lucide-react';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
            price: 'Starting from $2,500/mo',
            results: 'Average 450% increase in organic traffic',
            category: 'seo',
            active: true
          },
          {
            id: 2,
            title: 'PPC Advertising',
            description: 'Maximize your advertising ROI with data-driven PPC campaigns...',
            price: 'Starting from $3,000/mo',
            results: 'Average 4.2x return on ad spend',
            category: 'ppc',
            active: true
          },
          {
            id: 3,
            title: 'Social Media Marketing',
            description: 'Build engaged communities and drive conversions...',
            price: 'Starting from $1,800/mo',
            results: 'Average 300% follower growth',
            category: 'social',
            active: true
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        // await fetch(`/api/services/${id}`, { method: 'DELETE' });
        setServices(services.filter(service => service.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleToggleActive = async (id) => {
    try {
      // const response = await fetch(`/api/services/${id}/toggle`, { method: 'PATCH' });
      // const updatedService = await response.json();

      setServices(services.map(service =>
        service.id === id
          ? { ...service, active: !service.active }
          : service
      ));
    } catch (error) {
      console.error('Error toggling service status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ea5a4] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Services Manager</h1>
            <p className="text-gray-600">Manage your service offerings and pricing</p>
          </div>
          <Link
            to="/admin/services/new"
            className="bg-[#0ea5a4] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0b9488] transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Link>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
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
                    <Link
                      to={`/services/${service.id}`}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/admin/services/edit/${service.id}`}
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
            </div>
          ))}
        </motion.div>

        {services.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-lg shadow"
          >
            <p className="text-gray-500 text-lg">No services found.</p>
            <Link
              to="/admin/services/new"
              className="mt-4 inline-flex items-center text-[#0ea5a4] hover:text-[#0b9488] font-semibold"
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
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0ea5a4]">{services.length}</div>
              <div className="text-sm text-gray-600">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {services.filter(s => s.active).length}
              </div>
              <div className="text-sm text-gray-600">Active Services</div>
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
    </div>
  );
};

export default ServicesManager;
