<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';
import { getPublicBlogBySlug } from '../utils/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getPublicBlogBySlug(slug);
        if (response?.success && response?.blog) {
          setPost(response.blog);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#0ea5a4] mx-auto" />
          <p className="text-gray-500 mt-4">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
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
            <span className="text-[#0ea5a4]">{post.category?.name || 'Blog'}</span>
          </div>
=======
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const [apiPost, setApiPost] = useState(null);
  const post = apiPost || blogPosts.find((item) => item.slug === slug);

  useEffect(() => {
    let cancelled = false;
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(apiBase + '/api/blogs/' + encodeURIComponent(slug)).then((response) => response.ok ? response.json() : Promise.reject(new Error('Article not found in API'))).then((item) => { if (!cancelled) setApiPost({ ...item, date: item.publishedAt || item.createdAt || item.date, readTime: item.readTime || '5 min read', sections: typeof item.content === 'string' ? [{ heading: 'Article', paragraphs: item.content.split(/\n\s*\n/).filter(Boolean) }] : [] }); }).catch(() => { if (!cancelled) setApiPost(null); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    document.title = post ? post.title + ' | Webzoneo' : 'Article Not Found | Webzoneo';
    if (!post) return;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', post.excerpt);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/blog/' + post.slug);
  }, [post]);

  if (!post) return <div className="pt-20 min-h-[65vh] flex items-center justify-center"><div className="text-center px-6"><h1 className="text-3xl font-bold mb-4">Article not found</h1><p className="text-gray-600 mb-6">This article may have moved or is not published.</p><Link to="/blog" className="text-[#0b9488] font-semibold">Back to insights</Link></div></div>;

  return (
    <article className="pt-20">
      <header className="py-16 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8"><ArrowLeft size={18}/> All articles</Link>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#5eead4] mb-4">{post.category}</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap gap-5 text-sm text-gray-300"><span>{post.author}</span><span className="inline-flex items-center gap-2"><Calendar size={15}/>{new Date(post.date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span><span className="inline-flex items-center gap-2"><Clock size={15}/>{post.readTime}</span></div>
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {(post.sections || []).map((section) => <section key={section.heading} className="mb-10">
          <h2 className="text-2xl font-bold text-[#111827] mb-4">{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => <p key={index} className="text-gray-700 text-lg leading-8 mb-4">{paragraph}</p>)}
        </section>)}
        <aside className="mt-12 rounded-2xl bg-gray-50 border border-gray-200 p-7">
          <h2 className="text-2xl font-bold mb-3">Want help applying this?</h2>
          <p className="text-gray-600 mb-5">Tell us about your business, target market and current challenge.</p>
          <Link to="/contact" className="inline-flex bg-[#0ea5a4] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0b9488]">Contact Webzoneo</Link>
        </aside>
      </div>
<<<<<<< HEAD

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
                {post.category?.name || 'Blog'}
              </span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : '-'}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {'5 min read'}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.description?.substring(0, 300) || 'No description available'}
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
              src={post.images?.[0] || 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'}
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
          >
            <div dangerouslySetInnerHTML={{ __html: post.description || '<p>No content available.</p>' }} />
          </motion.div>

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
                alt="Author"
                className="w-16 h-16 rounded-full object-cover mr-6"
              />
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">Digital Marketing Team</h3>
                <p className="text-gray-600">
                  Our team of digital marketing experts shares the latest insights, strategies, and industry updates 
                  to help businesses grow their online presence and achieve measurable results.
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
=======
    </article>
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
  );
};

export default BlogPost;
