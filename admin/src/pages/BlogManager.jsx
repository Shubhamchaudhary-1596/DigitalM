import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  Edit,
  Trash2,
  Plus,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const BlogManager = () => {
  const { action, id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // const response = await fetch('/api/blogs');
        // const data = await response.json();

        // Mock data for now
        const mockBlogs = [
          {
            id: 1,
            title: 'The Complete Guide to SEO in 2024',
            excerpt: 'Discover the latest SEO strategies and techniques...',
            author: 'Sarah Chen',
            category: 'seo',
            tags: ['SEO', '2024', 'Digital Marketing'],
            status: 'published',
            featured: true,
            views: 1250,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15'
          },
          {
            id: 2,
            title: 'How to Optimize Your Google Ads',
            excerpt: 'Learn the advanced techniques for PPC campaigns...',
            author: 'Michael Rodriguez',
            category: 'ppc',
            tags: ['PPC', 'Google Ads', 'Advertising'],
            status: 'published',
            featured: false,
            views: 890,
            createdAt: '2024-01-12',
            updatedAt: '2024-01-14'
          },
          {
            id: 3,
            title: 'Social Media Trends 2024',
            excerpt: 'Stay ahead of the curve with emerging trends...',
            author: 'Emily Johnson',
            category: 'social',
            tags: ['Social Media', 'Trends', '2024'],
            status: 'draft',
            featured: false,
            views: 0,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-10'
          }
        ];

        setBlogs(mockBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        // await fetch(`/api/blogs/${blogId}`, { method: 'DELETE' });
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleToggleFeatured = async (blogId) => {
    try {
      // const response = await fetch(`/api/blogs/${blogId}/toggle-featured`, { method: 'PATCH' });
      // const updatedBlog = await response.json();

      setBlogs(blogs.map(blog =>
        blog.id === blogId
          ? { ...blog, featured: !blog.featured }
          : blog
      ));
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'seo', label: 'SEO' },
    { value: 'ppc', label: 'PPC' },
    { value: 'social', label: 'Social Media' },
    { value: 'strategy', label: 'Strategy' }
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
          <h1 className="text-3xl font-bold text-gray-900">Blog Manager</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts and content</p>
        </div>
        <Link to="/blogs/new" className="text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
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
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pl-10"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            {filteredBlogs.length} of {blogs.length} posts
          </div>
        </div>
      </motion.div>

      {/* Blog Posts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {blog.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {blog.excerpt}
                        </div>
                        {blog.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{blog.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {blog.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {blog.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleToggleFeatured(blog.id)}
                        className={`p-1 rounded ${blog.featured ? 'text-yellow-600 hover:text-yellow-900' : 'text-gray-400 hover:text-yellow-600'}`}
                        title={blog.featured ? 'Unfeature' : 'Feature'}
                      >
                        ⭐
                      </button>
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/blogs/edit/${blog.id}`}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
            <Link
              to="/blogs/new"
              className="mt-4 inline-flex items-center text-primary hover:text-secondary font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first blog post
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogManager;
