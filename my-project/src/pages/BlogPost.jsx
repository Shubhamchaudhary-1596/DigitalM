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
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\\/$/, '');
    fetch(apiBase + '/api/blogs/' + encodeURIComponent(slug)).then((response) => response.ok ? response.json() : Promise.reject(new Error('Article not found in API'))).then((item) => { if (!cancelled) setApiPost({ ...item, date: item.publishedAt || item.createdAt || item.date, readTime: item.readTime || '5 min read', sections: typeof item.content === 'string' ? [{ heading: 'Article', paragraphs: item.content.split(/\\n\\s*\\n/).filter(Boolean) }] : [] }); }).catch(() => { if (!cancelled) setApiPost(null); });
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
          <div className="flex flex-wrap gap-5 text-sm text-gray-300"><span>{post.author}</span><span className="inline-flex items-center gap-2"><Calendar size={15}/>{new Date(post.date + 'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span><span className="inline-flex items-center gap-2"><Clock size={15}/>{post.readTime}</span></div>
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
    </article>
  );
};

export default BlogPost;
