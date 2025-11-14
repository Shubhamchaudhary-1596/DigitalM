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
  Package,
  Star
} from 'lucide-react';

const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // const response = await fetch('/api/packages');
        // const data = await response.json();

        // Mock data for now
        const mockPackages = [
          {
            id: 1,
            name: 'Starter SEO Package',
            description: 'Perfect for small businesses getting started with SEO',
            category: 'seo',
            price: 2500,
            billingCycle: 'monthly',
            features: [
              'Keyword Research & Strategy',
              'On-Page Optimization',
              'Monthly Reporting',
              'Email Support'
            ],
            popular: false,
            active: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15'
          },
          {
            id: 2,
            name: 'Premium PPC Package',
            description: 'Comprehensive PPC management for maximum ROI',
            category: 'ppc',
            price: 5000,
            billingCycle: 'monthly',
            features: [
              'Advanced Campaign Setup',
              'A/B Testing',
              'Conversion Tracking',
              'Weekly Optimization',
              'Priority Support'
            ],
            popular: true,
            active: true,
            createdAt: '2024-01-02',
            updatedAt: '2024-01-12'
          },
          {
            id: 3,
            name: 'Social Media Growth Package',
            description: 'Accelerate your social media presence',
            category: 'social',
            price: 1800,
            billingCycle: 'monthly',
            features: [
              'Content Creation',
              'Community Management',
              'Growth Strategy',
              'Monthly Analytics'
            ],
            popular: false,
            active: true,
            createdAt: '2024-01-03',
            updatedAt: '2024-01-10'
          }
        ];

        setPackages(mockPackages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        // await fetch(`/api/packages/${packageId}`, { method: 'DELETE' });
        setPackages(packages.filter(pkg => pkg.id !== packageId));
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  };

  const handleToggleActive = async (packageId) => {
    try {
      // const response = await fetch(`/api/packages/${packageId}/toggle`, { method: 'PATCH' });
      // const updatedPackage = await response.json();

      setPackages(packages.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, active: !pkg.active }
          : pkg
      ));
    } catch (error) {
      console.error('Error toggling package status:', error);
    }
  };

  const handleTogglePopular = async (packageId) => {
    try {
      // const response = await fetch(`/api/packages/${packageId}/toggle-popular`, { method: 'PATCH' });
      // const updatedPackage = await response.json();

      setPackages(packages.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, popular: !pkg.popular }
          : pkg
      ));
    } catch (error) {
      console.error('Error toggling popular status:', error);
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory;
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && pkg.active) ||
                         (filterStatus === 'inactive' && !pkg.active);

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
          <h1 className="text-3xl font-bold text-gray-900">Package Manager</h1>
          <p className="text-gray-600 mt-1">Manage your pricing packages and offerings</p>
        </div>
        <Link to="/packages/new" className="text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Package
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
              placeholder="Search packages..."
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
            {filteredPackages.length} of {packages.length} packages
          </div>
        </div>
      </motion.div>

      {/* Packages Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`card hover:shadow-lg transition-shadow duration-200 ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                {pkg.popular && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </span>
                )}
              </div>
              <button
                onClick={() => handleToggleActive(pkg.id)}
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  pkg.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {pkg.active ? 'Active' : 'Inactive'}
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {pkg.description}
            </p>

            <div className="mb-4">
              <div className="flex items-center text-2xl font-bold text-primary mb-1">
                <DollarSign className="h-5 w-5" />
                {pkg.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-600 ml-1">
                  /{pkg.billingCycle}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {pkg.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
                {pkg.features.length > 3 && (
                  <li className="text-gray-500">
                    +{pkg.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {pkg.category.toUpperCase()}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTogglePopular(pkg.id)}
                  className={`p-1 rounded ${pkg.popular ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600`}
                  title={pkg.popular ? 'Remove from popular' : 'Mark as popular'}
                >
                  <Star className="h-4 w-4" />
                </button>
                <Link
                  to={`/packages/${pkg.id}`}
                  className="text-blue-600 hover:text-blue-900 p-1"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/packages/edit/${pkg.id}`}
                  className="text-green-600 hover:text-green-900 p-1"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(pkg.id)}
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

      {filteredPackages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 card"
        >
          <p className="text-gray-500 text-lg">No packages found.</p>
          <Link
            to="/packages/new"
            className="mt-4 inline-flex items-center text-primary hover:text-secondary font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create your first package
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Package Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{packages.length}</div>
            <div className="text-sm text-gray-600">Total Packages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {packages.filter(p => p.active).length}
            </div>
            <div className="text-sm text-gray-600">Active Packages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {packages.filter(p => p.popular).length}
            </div>
            <div className="text-sm text-gray-600">Popular Packages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${packages.filter(p => p.active).reduce((sum, p) => sum + p.price, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PackageManager;
