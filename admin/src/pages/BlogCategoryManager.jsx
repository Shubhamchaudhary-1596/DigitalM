import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Check,
  X
} from 'lucide-react';
import { 
  getAllCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  deleteMultipleCategories 
} from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const BlogCategoryManager = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
    parentCatName: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategories();
      if (response.success) {
        setCategories(response.data || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = categories.map(cat => cat._id);
      setSelectedCategories(allIds);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (e, id) => {
    if (e.target.checked) {
      setSelectedCategories(prev => [...prev, id]);
    } else {
      setSelectedCategories(prev => prev.filter(cid => cid !== id));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog category?')) {
      try {
        const response = await deleteCategory(id);
        if (response.success) {
          alert('Blog category deleted successfully');
          fetchCategories();
          setSelectedCategories(prev => prev.filter(cid => cid !== id));
        } else {
          alert(response.message || 'Failed to delete category');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category to delete');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${selectedCategories.length} blog categories?`)) {
      try {
        const response = await deleteMultipleCategories(selectedCategories);
        if (response.success) {
          alert('Blog categories deleted successfully');
          fetchCategories();
          setSelectedCategories([]);
        } else {
          alert(response.message || 'Failed to delete categories');
        }
      } catch (error) {
        console.error('Error deleting categories:', error);
        alert('Failed to delete categories');
      }
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', parentId: '', parentCatName: '' });
    setEditingCategory(null);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setModalMode('edit');
    setFormData({
      name: category.name || '',
      parentId: category.parentId || '',
      parentCatName: category.parentCatName || ''
    });
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter category name');
      return;
    }

    setSubmitting(true);
    try {
      let response;
      if (modalMode === 'add') {
        response = await createCategory(formData);
      } else {
        response = await updateCategory(editingCategory._id, formData);
      }

      if (response.success) {
        alert(modalMode === 'add' ? 'Blog category created successfully' : 'Blog category updated successfully');
        setShowModal(false);
        fetchCategories();
      } else {
        alert(response.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get parent category name for display
  const getParentName = (category) => {
    if (!category.parentId) return '-';
    const parent = categories.find(c => c._id === category.parentId);
    return parent?.name || '-';
  };

  return (
    <div className="category-manager">
      <div className="page-header">
        <div className="header-title">
          <Layers style={{ width: 24, height: 24, marginRight: 8 }} />
          <h1>Blog Category Manager</h1>
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          <Plus style={{ width: 16, height: 16, marginRight: 4 }} />
          Add Blog Category
        </button>
      </div>

      {/* Search and Actions */}
      <div className="table-actions">
        <div className="search-box">
          <Search style={{ width: 16, height: 16 }} />
          <input 
            type="text" 
            placeholder="Search blog categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {selectedCategories.length > 0 && (
          <button 
            className="btn-danger"
            onClick={handleDeleteSelected}
          >
            <Trash2 style={{ width: 16, height: 16, marginRight: 4 }} />
            Delete Selected ({selectedCategories.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input 
                  type="checkbox" 
                  checked={categories.length > 0 && selectedCategories.length === categories.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Category Name</th>
              <th>Parent Category</th>
              <th>Created At</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  Loading...
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No blog categories found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td>
                    <input 
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={(e) => handleSelectCategory(e, category._id)}
                    />
                  </td>
                  <td>
                    <span className="category-name">{category.name}</span>
                  </td>
                  <td>{getParentName(category)}</td>
                  <td>
                    {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-edit"
                        onClick={() => openEditModal(category)}
                        title="Edit"
                      >
                        <Edit style={{ width: 14, height: 14 }} />
                      </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(category._id)}
                        title="Delete"
                      >
                        <Trash2 style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft style={{ width: 16, height: 16 }} />
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalMode === 'add' ? 'Add New Blog Category' : 'Edit Blog Category'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter blog category name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Parent Category (Optional)</label>
                  <select
                    name="parentId"
                    value={formData.parentId}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  >
                    <option value="">No Parent (Root Category)</option>
                    {categories
                      .filter(c => c._id !== editingCategory?._id)
                      .map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : modalMode === 'add' ? 'Add Category' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCategoryManager;

