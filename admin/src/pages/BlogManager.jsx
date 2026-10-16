<<<<<<< HEAD
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
  Calendar,
  User,
  Loader2
} from 'lucide-react';
import { getAllBlogs, deleteBlog } from '../utils/api';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        if (response?.success && response?.data) {
          // Transform API data to match component format
          const transformedBlogs = response.data.map(blog => ({
            _id: blog._id,
            id: blog._id,
            title: blog.title,
            excerpt: blog.description ? blog.description.substring(0, 100) + '...' : '',
            description: blog.description,
            author: 'Admin',
            category: 'general',
            images: blog.images || [],
            status: 'published',
            featured: false,
            views: 0,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            slug: blog.slug
          }));
          setBlogs(transformedBlogs);
        }
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
        setDeletingId(blogId);
        const response = await deleteBlog(blogId);
        if (response?.success) {
          setBlogs(blogs.filter(blog => blog._id !== blogId));
          alert('Blog deleted successfully!');
        } else {
          alert(response?.message || 'Failed to delete blog');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
=======
import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

const emptyForm = { title: '', slug: '', excerpt: '', content: '', category: 'SEO', author: 'Webzoneo Editorial Team', status: 'draft', featured: false, image: '', tags: '' };

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try { const response = await api.get('/api/admin/blogs'); setPosts(response.data); }
    catch (e) { setError(e.response?.data?.error || 'Could not load blog posts. Check API URL, login and database.'); }
    finally { setLoading(false); }
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
  };
  useEffect(() => { load(); }, []);

  const change = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const edit = (post) => {
    setEditingId(post._id);
    setForm({ title: post.title || '', slug: post.slug || '', excerpt: post.excerpt || '', content: post.content || '', category: post.category || 'SEO', author: post.author || 'Webzoneo Editorial Team', status: post.status || 'draft', featured: Boolean(post.featured), image: post.image || '', tags: (post.tags || []).join(', ') });
    setNotice('');
  };
  const reset = () => { setEditingId(''); setForm(emptyForm); setError(''); };
  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setNotice('');
    const payload = { ...form, tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) };
    try {
      if (editingId) await api.put('/api/admin/blogs/' + editingId, payload);
      else await api.post('/api/admin/blogs', payload);
      setNotice('Blog post saved. Published posts are available on the public site through the content API.');
      reset(); await load();
    } catch (err) { setError(err.response?.data?.error || 'Could not save blog post.'); }
    finally { setSaving(false); }
  };
  const remove = async (id) => {
    if (!window.confirm('Permanently delete this blog post?')) return;
    setError(''); setNotice('');
    try { await api.delete('/api/admin/blogs/' + id); setNotice('Blog post deleted.'); await load(); }
    catch (err) { setError(err.response?.data?.error || 'Could not delete blog post.'); }
  };

  return <div className="p-6 max-w-6xl mx-auto space-y-6">
    <div><h1 className="text-3xl font-bold">Blog content</h1><p className="text-gray-600 mt-2">Create, edit, publish and delete blog posts saved in the API database.</p></div>
    {error && <p role="alert" className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</p>}
    {notice && <p role="status" className="bg-green-50 text-green-800 p-3 rounded-lg">{notice}</p>}
    <form onSubmit={save} className="bg-white rounded-xl border p-5 space-y-4">
      <h2 className="text-xl font-semibold">{editingId ? 'Edit post' : 'New post'}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm font-medium">Title<input required name="title" maxLength="180" value={form.title} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Slug (lowercase-and-hyphens)<input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" name="slug" value={form.slug} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Category<input required name="category" value={form.category} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Author label<input required name="author" value={form.author} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Image URL (optional)<input name="image" value={form.image} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Tags, comma separated<input name="tags" value={form.tags} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      </div>
      <label className="block text-sm font-medium">Excerpt<textarea required name="excerpt" maxLength="500" rows="2" value={form.excerpt} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      <label className="block text-sm font-medium">Content (plain text; separate paragraphs with blank lines)<textarea required name="content" maxLength="50000" rows="8" value={form.content} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      <div className="flex flex-wrap gap-5 items-center">
        <label className="text-sm font-medium">Status <select name="status" value={form.status} onChange={change} className="ml-2 border rounded p-2"><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="featured" checked={form.featured} onChange={change}/> Featured</label>
        <button disabled={saving} className="bg-teal-700 text-white px-5 py-2 rounded-lg disabled:opacity-60">{saving ? 'Saving…' : editingId ? 'Update post' : 'Create post'}</button>
        {editingId && <button type="button" onClick={reset} className="border px-5 py-2 rounded-lg">Cancel edit</button>}
      </div>
    </form>
    <section className="bg-white rounded-xl border overflow-hidden">
      <div className="p-5 border-b"><h2 className="text-xl font-semibold">Saved posts</h2></div>
      {loading ? <p className="p-5 text-gray-600">Loading…</p> : posts.length === 0 ? <p className="p-5 text-gray-600">No posts saved yet. Create one above.</p> : <div className="divide-y">{posts.map((post) => <div key={post._id} className="p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between"><div><h3 className="font-semibold">{post.title}</h3><p className="text-sm text-gray-600">/{post.slug} · {post.category} · {post.status}</p></div><div className="flex gap-2"><button onClick={() => edit(post)} className="border rounded-lg px-3 py-2">Edit</button><button onClick={() => remove(post._id)} className="border border-red-200 text-red-700 rounded-lg px-3 py-2">Delete</button></div></div>)}</div>}
    </section>
  </div>;
};

export default BlogManager;
