import React, { useEffect, useState } from 'react';
import { api } from '../contexts/AuthContext';

const blank = { title: '', slug: '', description: '', category: 'SEO', price: '', features: '', active: true };

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try { const response = await api.get('/api/admin/services'); setServices(response.data); }
    catch (e) { setError(e.response?.data?.error || 'Could not load services. Check API URL, login and database.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const change = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const edit = (service) => {
    setEditingId(service._id);
    setForm({ title: service.title || '', slug: service.slug || '', description: service.description || '', category: service.category || 'SEO', price: service.price || '', features: (service.features || []).join('\n'), active: service.active !== false });
    setError(''); setNotice('');
  };
  const reset = () => { setEditingId(''); setForm(blank); };
  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setNotice('');
    const payload = { ...form, features: form.features.split('\n').map((item) => item.trim()).filter(Boolean) };
    try {
      if (editingId) await api.put('/api/admin/services/' + editingId, payload);
      else await api.post('/api/admin/services', payload);
      setNotice('Service saved to the database. Active services are available through the public API.');
      reset(); await load();
    } catch (err) { setError(err.response?.data?.error || 'Could not save service.'); }
    finally { setSaving(false); }
  };
  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    setError(''); setNotice('');
    try { await api.delete('/api/admin/services/' + id); setNotice('Service deleted.'); await load(); }
    catch (err) { setError(err.response?.data?.error || 'Could not delete service.'); }
  };

  return <div className="p-6 max-w-6xl mx-auto space-y-6">
    <div><h1 className="text-3xl font-bold">Service management</h1><p className="text-gray-600 mt-2">Create and maintain services stored in the API database.</p></div>
    {error && <p role="alert" className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</p>}
    {notice && <p role="status" className="bg-green-50 text-green-800 p-3 rounded-lg">{notice}</p>}
    <form onSubmit={save} className="bg-white rounded-xl border p-5 space-y-4">
      <h2 className="text-xl font-semibold">{editingId ? 'Edit service' : 'New service'}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm font-medium">Title<input required name="title" maxLength="160" value={form.title} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Slug<input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" name="slug" value={form.slug} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Category<input required name="category" value={form.category} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Price/engagement note (optional)<input name="price" value={form.price} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      </div>
      <label className="block text-sm font-medium">Description<textarea required name="description" maxLength="3000" rows="3" value={form.description} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      <label className="block text-sm font-medium">Features (one per line)<textarea name="features" rows="5" value={form.features} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      <div className="flex flex-wrap gap-5 items-center">
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="active" checked={form.active} onChange={change}/> Active on public site</label>
        <button disabled={saving} className="bg-teal-700 text-white px-5 py-2 rounded-lg disabled:opacity-60">{saving ? 'Saving…' : editingId ? 'Update service' : 'Create service'}</button>
        {editingId && <button type="button" onClick={reset} className="border px-5 py-2 rounded-lg">Cancel edit</button>}
      </div>
    </form>
    <section className="bg-white rounded-xl border overflow-hidden">
      <div className="p-5 border-b"><h2 className="text-xl font-semibold">Saved services</h2></div>
      {loading ? <p className="p-5 text-gray-600">Loading…</p> : services.length === 0 ? <p className="p-5 text-gray-600">No services saved yet. Create one above.</p> : <div className="divide-y">{services.map((service) => <div key={service._id} className="p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between"><div><h3 className="font-semibold">{service.title}</h3><p className="text-sm text-gray-600">/{service.slug} · {service.category} · {service.active ? 'Active' : 'Inactive'}</p></div><div className="flex gap-2"><button onClick={() => edit(service)} className="border rounded-lg px-3 py-2">Edit</button><button onClick={() => remove(service._id)} className="border border-red-200 text-red-700 rounded-lg px-3 py-2">Delete</button></div></div>)}</div>}
    </section>
  </div>;
};

export default ServiceManager;
