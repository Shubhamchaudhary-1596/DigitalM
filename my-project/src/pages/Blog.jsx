import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(apiBase + '/api/blogs').then((response) => response.ok ? response.json() : Promise.reject(new Error('API unavailable'))).then((items) => {
      if (Array.isArray(items) && items.length) setPosts(items.map((item) => ({ ...item, date: item.publishedAt || item.createdAt || item.date, readTime: item.readTime || '5 min read' })));
    }).catch(() => { /* Keep bundled editorial content if API is unavailable. */ });
  }, []);

  useEffect(() => { document.title = 'Digital Marketing Insights | Webzoneo'; }, []);
  const categories = ['All', ...new Set(posts.map((post) => post.category))];
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category;
    const term = searchTerm.trim().toLowerCase();
    return matchesCategory && (!term || (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase().includes(term));
  }), [posts, searchTerm, category]);

  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="uppercase tracking-widest text-sm text-[#5eead4] mb-4">Webzoneo insights</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-5">Practical digital marketing guides</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">Useful guidance on SEO, analytics and customer acquisition for businesses in India and international markets.</p>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <label className="relative flex-1"><span className="sr-only">Search articles</span><Search className="absolute left-3 top-3 text-gray-400" size={20}/><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search articles" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900"/></label>
            <label><span className="sr-only">Filter category</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full md:w-auto py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          <p className="text-sm text-gray-500 mb-5">{filtered.length} article{filtered.length === 1 ? '' : 's'}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => <article key={post.slug} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-sm">
              <span className="text-sm font-semibold text-[#0b9488] mb-3">{post.category}</span>
              <h2 className="text-xl font-bold text-[#111827] mb-3">{post.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5"><span className="inline-flex items-center gap-1"><Calendar size={15}/>{new Date(post.date + 'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span><span className="inline-flex items-center gap-1"><Clock size={15}/>{post.readTime}</span></div>
              <Link to={'/blog/' + post.slug} className="mt-auto inline-flex items-center gap-2 text-[#0b9488] font-semibold">Read article <ArrowRight size={17}/></Link>
            </article>)}
          </div>
          {filtered.length === 0 && <p className="text-center text-gray-600 py-12">No articles match that search. Try another term or category.</p>}
        </div>
      </section>
    </div>
  );
};

export default Blog;
