import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

const blank = { title: '', slug: '', client: '', category: 'SEO', industry: '', description: '', image: '', timeline: '', challenges: '', solutions: '', results: '', featured: false, published: false };

const PortfolioManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try { const response = await api.get('/api/admin/portfolio'); setItems(response.data); }
    catch (e) { setError(e.response?.data?.error || 'Could not load portfolio items. Check API URL, login and database.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const change = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const edit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || '', slug: item.slug || '', client: item.client || '', category: item.category || 'SEO',
      industry: item.industry || '', description: item.description || '', image: item.image || '', timeline: item.timeline || '',
      challenges: (item.challenges || []).join('\n'), solutions: (item.solutions || []).join('\n'),
      results: (item.results || []).map((value) => value.label + ' | ' + value.value).join('\n'),
      featured: Boolean(item.featured), published: Boolean(item.published)
    });
    setError(''); setNotice('');
  };
  const reset = () => { setEditingId(''); setForm(blank); };
  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setNotice('');
    const payload = {
      ...form,
      challenges: form.challenges.split('\n').map((value) => value.trim()).filter(Boolean),
      solutions: form.solutions.split('\n').map((value) => value.trim()).filter(Boolean),
      results: form.results.split('\n').map((line) => line.split('|')).map(([label, value]) => ({ label: (label || '').trim(), value: (value || '').trim() })).filter((value) => value.label && value.value)
    };
    try {
      if (editingId) await api.put('/api/admin/portfolio/' + editingId, payload);
      else await api.post('/api/admin/portfolio', payload);
      setNotice(payload.published ? 'Case study saved and published.' : 'Case study saved as a draft.');
      reset(); await load();
    } catch (err) { setError(err.response?.data?.error || 'Could not save case study.'); }
    finally { setSaving(false); }
  };
  const remove = async (id) => {
    if (!window.confirm('Permanently delete this case study?')) return;
    setError(''); setNotice('');
    try { await api.delete('/api/admin/portfolio/' + id); setNotice('Case study deleted.'); await load(); }
    catch (err) { setError(err.response?.data?.error || 'Could not delete case study.'); }
  };

  return <div className="p-6 max-w-6xl mx-auto space-y-6">
    <div><h1 className="text-3xl font-bold">Portfolio and case studies</h1><p className="text-gray-600 mt-2">Publish only client-approved stories and evidence. Results fields are optional and should be verifiable.</p></div>
    {error && <p role="alert" className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</p>}
    {notice && <p role="status" className="bg-green-50 text-green-800 p-3 rounded-lg">{notice}</p>}
    <form onSubmit={save} className="bg-white rounded-xl border p-5 space-y-4">
      <h2 className="text-xl font-semibold">{editingId ? 'Edit case study' : 'New case study'}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm font-medium">Title<input required maxLength="180" name="title" value={form.title} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Slug<input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" name="slug" value={form.slug} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Client name<input required name="client" value={form.client} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Category<input required name="category" value={form.category} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Industry<input name="industry" value={form.industry} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Timeline<input name="timeline" value={form.timeline} onChange={change} className="mt-1 w-full border rounded-lg p-3" placeholder="e.g. Q1–Q2 2026"/></label>
        <label className="block text-sm font-medium md:col-span-2">Image URL (optional)<input name="image" value={form.image} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      </div>
      <label className="block text-sm font-medium">Summary<textarea required name="description" rows="3" value={form.description} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm font-medium">Challenges (one per line)<textarea rows="4" name="challenges" value={form.challenges} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
        <label className="block text-sm font-medium">Approach/solutions (one per line)<textarea rows="4" name="solutions" value={form.solutions} onChange={change} className="mt-1 w-full border rounded-lg p-3"/></label>
      </div>
      <label className="block text-sm font-medium">Verified results (one per line: label | value)<textarea rows="3" name="results" value={form.results} onChange={change} className="mt-1 w-full border rounded-lg p-3" placeholder="Organic enquiries | +18% over 6 months"/></label>
      <div className="flex flex-wrap gap-5 items-center">
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="featured" checked={form.featured} onChange={change}/> Featured</label>
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="published" checked={form.published} onChange={change}/> Published (client approval confirmed)</label>
        <button disabled={saving} className="bg-teal-700 text-white px-5 py-2 rounded-lg disabled:opacity-60">{saving ? 'Saving…' : editingId ? 'Update case study' : 'Create case study'}</button>
        {editingId && <button type="button" onClick={reset} className="border px-5 py-2 rounded-lg">Cancel edit</button>}
      </div>
    </form>
    <section className="bg-white rounded-xl border overflow-hidden">
      <div className="p-5 border-b"><h2 className="text-xl font-semibold">Saved case studies</h2></div>
      {loading ? <p className="p-5 text-gray-600">Loading…</p> : items.length === 0 ? <p className="p-5 text-gray-600">No case studies saved yet.</p> : <div className="divide-y">{items.map((item) => <div key={item._id} className="p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between"><div><h3 className="font-semibold">{item.title}</h3><p className="text-sm text-gray-600">{item.client} · /{item.slug} · {item.published ? 'Published' : 'Draft'}</p></div><div className="flex gap-2"><button onClick={() => edit(item)} className="border rounded-lg px-3 py-2">Edit</button><button onClick={() => remove(item._id)} className="border border-red-200 text-red-700 rounded-lg px-3 py-2">Delete</button></div></div>)}</div>}
    </section>
  </div>;
};

export default PortfolioManager;
