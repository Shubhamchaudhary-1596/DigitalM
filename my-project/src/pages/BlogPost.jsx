import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Blog post data (in a real app, this would come from an API)
  const blogPostData = {
    'complete-seo-guide-2024': {
      title: 'The Complete Guide to SEO in 2024: Strategies That Actually Work',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'SEO',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Discover the latest SEO strategies and techniques that are driving results in 2024. From AI-powered optimization to Core Web Vitals, learn what really matters.',
      content: `
        <p>Search Engine Optimization has evolved dramatically over the past few years, and 2024 brings even more changes to the landscape. With AI integration, Core Web Vitals becoming increasingly important, and Google's continued focus on user experience, it's crucial to stay updated with the latest strategies that actually work.</p>

        <h2>The Current State of SEO</h2>
        <p>In 2024, SEO is no longer just about keywords and backlinks. Google's algorithm has become sophisticated enough to understand context, user intent, and content quality at a level we've never seen before. This means that traditional "black hat" techniques are not only ineffective but can actually harm your rankings.</p>

        <h2>Core Web Vitals: More Important Than Ever</h2>
        <p>Google's Core Web Vitals have become a critical ranking factor. These metrics measure real-world user experience and include:</p>
        <ul>
          <li><strong>Largest Contentful Paint (LCP):</strong> Measures loading performance</li>
          <li><strong>First Input Delay (FID):</strong> Measures interactivity</li>
          <li><strong>Cumulative Layout Shift (CLS):</strong> Measures visual stability</li>
        </ul>

        <h2>AI-Powered SEO Strategies</h2>
        <p>Artificial Intelligence is revolutionizing how we approach SEO. Here are the key AI-powered strategies that are working in 2024:</p>

        <h3>1. Content Optimization with AI</h3>
        <p>AI tools can now analyze top-ranking content and provide insights on what makes them successful. This includes semantic analysis, content gaps identification, and optimization suggestions that go beyond simple keyword density.</p>

        <h3>2. Predictive Keyword Research</h3>
        <p>Machine learning algorithms can predict which keywords are likely to trend based on search patterns, seasonal data, and emerging topics. This allows us to create content that targets keywords before they become highly competitive.</p>

        <h2>Technical SEO Fundamentals</h2>
        <p>While content is crucial, technical SEO remains the foundation of any successful strategy:</p>

        <h3>Mobile-First Indexing</h3>
        <p>With Google's mobile-first indexing, your mobile site's performance directly impacts your rankings. Ensure your site is not just mobile-friendly, but mobile-optimized.</p>

        <h3>Page Speed Optimization</h3>
        <p>Site speed continues to be a critical ranking factor. Focus on:</p>
        <ul>
          <li>Image optimization and next-gen formats (WebP, AVIF)</li>
          <li>Minifying CSS, JavaScript, and HTML</li>
          <li>Implementing caching strategies</li>
          <li>Using Content Delivery Networks (CDNs)</li>
        </ul>

        <h2>Content Strategy for 2024</h2>
        <p>Quality content remains king, but the definition of "quality" has evolved:</p>

        <h3>E-A-T (Expertise, Authoritativeness, Trustworthiness)</h3>
        <p>Google places enormous emphasis on E-A-T, especially for YMYL (Your Money or Your Life) content. Demonstrate expertise through:</p>
        <ul>
          <li>Author bios and credentials</li>
          <li>Citing authoritative sources</li>
          <li>Regular content updates</li>
          <li>Building domain authority through quality backlinks</li>
        </ul>

        <h2>Local SEO in 2024</h2>
        <p>For businesses with physical locations, local SEO remains crucial:</p>
        <ul>
          <li>Optimize Google Business Profile completely</li>
          <li>Gather and respond to customer reviews</li>
          <li>Create location-specific content</li>
          <li>Build local citations and backlinks</li>
        </ul>

        <h2>Measuring SEO Success</h2>
        <p>Track these key metrics to measure your SEO success:</p>
        <ul>
          <li>Organic traffic growth</li>
          <li>Keyword ranking improvements</li>
          <li>Core Web Vitals scores</li>
          <li>Click-through rates from SERPs</li>
          <li>Conversion rates from organic traffic</li>
        </ul>

        <h2>Conclusion</h2>
        <p>SEO in 2024 requires a holistic approach that combines technical excellence, high-quality content, and user experience optimization. By focusing on these proven strategies and staying updated with algorithm changes, you can achieve sustainable organic growth.</p>

        <p>Remember, SEO is a long-term strategy. Results don't happen overnight, but with consistent effort and the right approach, you can achieve significant improvements in your search visibility and organic traffic.</p>
      `
    }
  };

  const post = blogPostData[slug];

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-[#0ea5a4] hover:text-[#0b9488]">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#0ea5a4]">Home</Link>
            <span className="text-gray-400">→</span>
            <Link to="/blog" className="text-gray-600 hover:text-[#0ea5a4]">Blog</Link>
            <span className="text-gray-400">→</span>
            <span className="text-[#0ea5a4]">{post.category}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-[#0ea5a4] hover:text-[#0b9488] mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span className="bg-[#ccfbf1] text-[#0b9488] px-3 py-1 rounded-full font-medium">
                {post.category}
              </span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4 border-t border-gray-200 pt-6">
              <span className="text-gray-600 font-medium">Share:</span>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Facebook className="h-4 w-4" />
                </button>
                <button className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="p-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 p-8 bg-gray-50 rounded-2xl"
          >
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover mr-6"
              />
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">About {post.author}</h3>
                <p className="text-gray-600">
                  Head of Strategy at DigitalMax with over 8 years of experience in digital marketing. 
                  Specializes in SEO, content strategy, and helping businesses achieve sustainable growth.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#111827] text-center mb-12">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={`https://images.pexels.com/photos/${270408 + item}/pexels-photo-${270408 + item}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt="Related Article"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#111827] mb-3">
                    Related Article Title {item}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Brief description of the related article content...
                  </p>
                  <Link
                    to="/blog"
                    className="text-[#0ea5a4] font-semibold hover:text-[#0b9488] transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0ea5a4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Implement These Strategies?
          </h2>
          <p className="text-xl text-[#ccfbf1] mb-8">
            Let our team of experts help you implement these proven SEO strategies for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#0ea5a4] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Expert Help
            </Link>
            <Link
              to="/services/seo"
              className="border-2 !border-white !text-white px-8 py-4 rounded-lg font-semibold !hover:bg-white/10 transition-colors"
            >
              Learn About Our SEO Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;