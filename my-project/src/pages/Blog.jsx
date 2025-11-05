import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'seo', name: 'SEO', count: 4 },
    { id: 'ppc', name: 'PPC', count: 3 },
    { id: 'social', name: 'Social Media', count: 3 },
    { id: 'strategy', name: 'Strategy', count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Complete Guide to SEO in 2024: Strategies That Actually Work',
      excerpt: 'Discover the latest SEO strategies and techniques that are driving results in 2024. From AI-powered optimization to Core Web Vitals, learn what really matters.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Sarah Chen',
      date: '2024-01-15',
      category: 'seo',
      readTime: '8 min read',
      slug: 'complete-seo-guide-2024',
      featured: true
    },
    {
      id: 2,
      title: 'How to Optimize Your Google Ads for Maximum ROI',
      excerpt: 'Learn the advanced techniques we use to help our clients achieve 4x+ ROAS with their Google Ads campaigns. Includes real case studies and actionable tips.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Michael Rodriguez',
      date: '2024-01-12',
      category: 'ppc',
      readTime: '6 min read',
      slug: 'optimize-google-ads-roi'
    },
    {
      id: 3,
      title: 'Social Media Marketing Trends to Watch in 2024',
      excerpt: 'Stay ahead of the curve with these emerging social media trends. From AI-generated content to micro-influencer partnerships, discover what\'s next.',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Emily Johnson',
      date: '2024-01-10',
      category: 'social',
      readTime: '7 min read',
      slug: 'social-media-trends-2024'
    },
    {
      id: 4,
      title: 'Building a Winning Content Marketing Strategy',
      excerpt: 'Content is still king, but the game has changed. Learn how to create a content strategy that drives traffic, engagement, and conversions in today\'s landscape.',
      image: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'David Thompson',
      date: '2024-01-08',
      category: 'strategy',
      readTime: '10 min read',
      slug: 'content-marketing-strategy'
    },
    {
      id: 5,
      title: 'Local SEO: How to Dominate Your Local Market',
      excerpt: 'Local businesses need local visibility. Discover the exact strategies we use to help our clients rank #1 in local search results.',
      image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Sarah Chen',
      date: '2024-01-05',
      category: 'seo',
      readTime: '9 min read',
      slug: 'local-seo-domination'
    },
    {
      id: 6,
      title: 'The Psychology of High-Converting Landing Pages',
      excerpt: 'What makes visitors convert? Dive deep into the psychological principles that drive conversions and learn how to apply them to your landing pages.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Emily Johnson',
      date: '2024-01-03',
      category: 'strategy',
      readTime: '12 min read',
      slug: 'psychology-landing-pages'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
                    src={featuredPost.image}
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
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPost.excerpt}
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
              {categories.map(category => (
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
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                      {post.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111827] mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
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

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="mt-4 text-[#0ea5a4] hover:text-[#0b9488] font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
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