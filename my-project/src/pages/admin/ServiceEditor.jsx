import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';

const ServiceEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Search',
    slug: '',
    features: [''],
    price: '',
    results: '',
    category: 'seo',
    active: true
  });

  const [saving, setSaving] = useState(false);

  // Mock data loading for editing
  useEffect(() => {
    if (isEditing) {
      // Mock existing service data
      const mockService = {
        title: 'SEO Optimization',
        description: 'Dominate search results with our comprehensive SEO strategies. We help businesses increase organic visibility, drive qualified traffic, and achieve sustainable long-term growth.',
        icon: 'Search',
        slug: 'seo',
        features: ['Technical SEO Audits', 'Keyword Research & Strategy', 'On-Page Optimization', 'Link Building'],
        price: 'Starting from $2,500/mo',
        results: 'Average 450% increase in organic traffic',
        category: 'seo',
        active: true
      };
      setFormData(mockService);
    }
  }, [isEditing]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Filter out empty features
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      };

      // Mock API call
      // const response = await fetch(isEditing ? `/api/services/${id}` : '/api/services', {
      //   method: isEditing ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(cleanedData)
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Service saved:', cleanedData);
      navigate('/admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    { value: 'seo', label: 'SEO' },
    { value: 'ppc', label: 'PPC' },
    { value: 'social', label: 'Social Media' },
    { value: 'web', label: 'Web Development' },
    { value: 'content', label: 'Content Marketing' },
    { value: 'analytics', label: 'Analytics' }
  ];

  const iconOptions = [
    'Search', 'Target', 'Users', 'Code', 'PenTool', 'BarChart3'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <button
              onClick={() => navigate('/admin/services')}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Service' : 'Create New Service'}
              </h1>
              <p className="text-gray-600">Define your service offering and pricing</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-[#0ea5a4] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0b9488] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Title and Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
                placeholder="e.g., SEO Optimization"
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
              placeholder="Describe what this service includes and its benefits"
            />
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Features Included *
            </label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
                    placeholder="e.g., Technical SEO Audits"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 inline-flex items-center px-3 py-2 text-sm text-[#0ea5a4] hover:text-[#0b9488] hover:bg-[#f0fdfa] rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </button>
          </div>

          {/* Price and Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
                placeholder="e.g., Starting from $2,500/mo"
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Results *
              </label>
              <input
                type="text"
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
                placeholder="e.g., Average 450% increase in traffic"
              />
            </div>
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#0ea5a4] focus:ring-[#0ea5a4] border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Active (visible to customers)</span>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ServiceEditor;
