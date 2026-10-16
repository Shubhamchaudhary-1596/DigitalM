import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPublicBlogs, getPublicCategories } from '../utils/api';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories and blogs on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await getPublicCategories();
        if (categoriesResponse?.success) {
          // Transform categories for the UI
          const cats = categoriesResponse.data || [];
          setCategories(cats);
        }
        
        // Fetch all blogs
        const blogsResponse = await getPublicBlogs(selectedCategory);
        if (blogsResponse?.success) {
          setBlogPosts(blogsResponse.data || []);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch blogs when category changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogsResponse = await getPublicBlogs(selectedCategory);
        if (blogsResponse?.success) {
          setBlogPosts(blogsResponse.data || []);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  // Build category list with counts
  const getCategoryList = () => {
    const categoryList = [
      { 
        id: 'all', 
        name: 'All Posts', 
        count: blogPosts.length 
      }
    ];
    
    // Add categories from API
    categories.forEach(cat => {
      const catBlogs = blogPosts.filter(post => 
        post.category?._id === cat._id || post.category === cat._id
      );
      categoryList.push({
        id: cat._id,
        name: cat.name,
        count: catBlogs.length
      });
    });
    
    return categoryList;
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get the first blog as featured (most recent)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-gray-400 ">
              Digital Marketing <span className="text-[#0ea5a4]">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Stay ahead of the curve with our latest insights, strategies, and industry updates. 
              Learn from our experts and discover what's working in digital marketing today.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-[#0ea5a4]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-[#111827] mb-2">Featured Article</h2>
              <p className="text-gray-600">Our latest and most comprehensive guide</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={featuredPost.images?.[0] || 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0ea5a4] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.createdAt ? new Date(featuredPost.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : '-'}
                    </div>
                    <span>{featuredPost.readTime || '5 min read'}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPost.description?.substring(0, 200) || 'No description available'}...
                  </p>
                  
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-[#0ea5a4] font-semibold hover:text-[#0b9488] transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories & Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600 font-medium">Categories:</span>
              </div>
              {getCategoryList().map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#0ea5a4] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.images?.[0] || 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                      {(post.category?.name || 'Blog').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      }) : '-'}
                    </div>
                    <span>{post.readTime || '5 min read'}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111827] mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.description?.substring(0, 150) || 'No description available'}...
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#0ea5a4] font-semibold hover:text-[#0b9488] transition-colors text-sm"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0ea5a4]"></div>
              <p className="text-gray-500 text-lg mt-4">Loading articles...</p>
            </div>
          ) : regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found in this category.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="mt-4 text-[#0ea5a4] hover:text-[#0b9488] font-semibold"
              >
                View all articles
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#0ea5a4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss an Update
          </h2>
          <p className="text-xl text-[#ccfbf1] mb-8">
            Subscribe to our newsletter for the latest digital marketing insights, 
            tips, and industry news delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline focus:ring-2 focus:ring-[#5eead4]"
            />
            <button className="bg-white text-[#0ea5a4] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-[#99f6e4] text-sm mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;