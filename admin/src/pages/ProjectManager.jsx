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
  FolderOpen,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch('/api/projects');
        // const data = await response.json();

        // Mock data for now
        const mockProjects = [
          {
            id: 1,
            title: 'E-commerce Website Redesign',
            client: 'Fashion Forward Inc.',
            description: 'Complete redesign and development of e-commerce platform',
            category: 'web',
            status: 'completed',
            priority: 'high',
            budget: 15000,
            startDate: '2024-01-01',
            endDate: '2024-02-15',
            progress: 100,
            featured: true,
            images: ['/api/uploads/project1-1.jpg', '/api/uploads/project1-2.jpg'],
            technologies: ['React', 'Node.js', 'MongoDB'],
            results: [
              '300% increase in conversion rate',
              '50% faster load times',
              'Mobile-first responsive design'
            ],
            createdAt: '2024-01-01',
            updatedAt: '2024-02-15'
          },
          {
            id: 2,
            title: 'SEO Campaign for Tech Startup',
            client: 'TechFlow Solutions',
            description: 'Comprehensive SEO strategy and implementation',
            category: 'seo',
            status: 'in-progress',
            priority: 'medium',
            budget: 8000,
            startDate: '2024-01-15',
            endDate: '2024-04-15',
            progress: 65,
            featured: false,
            images: ['/api/uploads/project2-1.jpg'],
            technologies: ['SEO Tools', 'Analytics', 'Content Strategy'],
            results: [],
            createdAt: '2024-01-15',
            updatedAt: '2024-01-20'
          },
          {
            id: 3,
            title: 'Social Media Marketing Campaign',
            client: 'Local Restaurant Chain',
            description: 'Social media presence and engagement campaign',
            category: 'social',
            status: 'planning',
            priority: 'low',
            budget: 5000,
            startDate: '2024-02-01',
            endDate: '2024-05-01',
            progress: 10,
            featured: false,
            images: [],
            technologies: ['Social Media Tools', 'Content Creation'],
            results: [],
            createdAt: '2024-01-20',
            updatedAt: '2024-01-20'
          }
        ];

        setProjects(mockProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        // await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleToggleFeatured = async (projectId) => {
    try {
      // const response = await fetch(`/api/projects/${projectId}/toggle-featured`, { method: 'PATCH' });
      // const updatedProject = await response.json();

      setProjects(projects.map(project =>
        project.id === projectId
          ? { ...project, featured: !project.featured }
          : project
      ));
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'planning': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web', label: 'Web Development' },
    { value: 'seo', label: 'SEO' },
    { value: 'ppc', label: 'PPC' },
    { value: 'social', label: 'Social Media' },
    { value: 'content', label: 'Content Marketing' },
    { value: 'analytics', label: 'Analytics' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
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
          <h1 className="text-3xl font-bold text-gray-900">Project Manager</h1>
          <p className="text-gray-600 mt-1">Manage your projects and portfolio</p>
        </div>
        <Link to="/projects/new" className="text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Project
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
              placeholder="Search projects..."
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
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
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
            {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.title}
              </h3>
              <div className="flex items-center space-x-2">
                {project.featured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>

            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">{project.client}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="ml-1">{project.status}</span>
              </span>
              <span className="text-sm font-medium text-primary">
                ${project.budget.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {project.category.toUpperCase()}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleFeatured(project.id)}
                  className={`p-1 rounded ${project.featured ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600`}
                  title={project.featured ? 'Unfeature' : 'Feature'}
                >
                  ⭐
                </button>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-600 hover:text-blue-900 p-1"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="text-green-600 hover:text-green-900 p-1"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
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

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 card"
        >
          <p className="text-gray-500 text-lg">No projects found.</p>
          <Link
            to="/projects/new"
            className="mt-4 inline-flex items-center text-primary hover:text-secondary font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create your first project
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {projects.filter(p => p.status === 'planning').length}
            </div>
            <div className="text-sm text-gray-600">Planning</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectManager;
