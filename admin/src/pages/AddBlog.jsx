import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  Trash2,
  Loader2
} from 'lucide-react';
import Editor from 'react-simple-wysiwyg';
import { getBlogById, createBlog, updateBlog, uploadBlogImages, getAllCategories } from '../utils/api';

const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [fetchingBlog, setFetchingBlog] = useState(isEditMode);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    category: ''
  });
  
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response?.success) {
          setCategories(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blog data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        try {
          const response = await getBlogById(id);
          if (response?.blog) {
            const blog = response.blog;
            setFormData({
              title: blog.title || '',
              description: blog.description || '',
              images: blog.images || [],
              category: blog.category?._id || blog.category || ''
            });
            if (blog.images && blog.images.length > 0) {
              setImagePreviews(blog.images);
            }
          }
        } catch (error) {
          console.error('Error fetching blog:', error);
          alert('Failed to fetch blog data');
          navigate('/blogs');
        } finally {
          setFetchingBlog(false);
        }
      };
      fetchBlog();
    }
  }, [id, isEditMode, navigate]);

  const handleInputChange = (eOrEditor, content, hideStatus) => {
    console.log('handleInputChange called with:', { eOrEditor, content, hideStatus });
    
    let name, value;
    
    if (content !== undefined) {
      // WYSIWYG Editor: (editor, content, hideStatus)
      name = 'description';
      value = content;
    } else {
      // Standard input: {name, value}
      name = eOrEditor.target.name;
      value = eOrEditor.target.value;
    }
    
    console.log('Updating formData', name, 'to:', value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImages(prev => [...prev, ...files]);
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = async (index, isExistingImage) => {
    if (isExistingImage) {
      // For existing images, just remove from preview (won't be saved)
      const newPreviews = [...imagePreviews];
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
      
      const newImagesList = [...formData.images];
      newImagesList.splice(index, 1);
      setFormData(prev => ({ ...prev, images: newImagesList }));
    } else {
      // For new images
      const newIndex = index - (formData.images?.length || 0);
      if (newIndex >= 0 && newIndex < newImages.length) {
        URL.revokeObjectURL(newImages[newIndex]);
        const updatedNewImages = [...newImages];
        updatedNewImages.splice(newIndex, 1);
        setNewImages(updatedNewImages);
      }
      
      const updatedPreviews = [...imagePreviews];
      updatedPreviews.splice(index, 1);
      setImagePreviews(updatedPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a blog title');
      return;
    }

    setLoading(true);

    try {
      let uploadedImageUrls = [...(formData.images || [])];
      
      // Upload new images if any
      if (newImages.length > 0) {
        setUploadingImages(true);
        
        const imageFormData = new FormData();
        newImages.forEach(image => {
          imageFormData.append('images', image);
        });

        const uploadResponse = await uploadBlogImages(imageFormData);
        
        if (uploadResponse?.images) {
          uploadedImageUrls = [...uploadedImageUrls, ...uploadResponse.images];
        }
        
        setUploadingImages(false);
      }

      const blogData = {
        title: formData.title,
        description: formData.description,
        images: uploadedImageUrls,
        category: formData.category || null
      };

      let response;
      
      if (isEditMode) {
        response = await updateBlog(id, blogData);
      } else {
        response = await createBlog(blogData);
      }

      if (response?.success) {
        alert(isEditMode ? 'Blog updated successfully!' : 'Blog created successfully!');
        navigate('/blogs');
      } else {
        alert(response?.message || 'Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  if (fetchingBlog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate('/blogs')}
          className="flex items-center text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog Manager
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode ? 'Update your blog post' : 'Fill in the details to create a new blog post'}
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Editor
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write your blog content here..."
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">Select a category</option>
              {!fetchingCategories && categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Images
            </label>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, index < (formData.images?.length || 0))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">
                Click to upload images
              </p>
              <p className="text-gray-400 text-sm mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/blogs')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || uploadingImages ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {uploadingImages ? 'Uploading Images...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? 'Update Blog' : 'Create Blog'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBlog;
