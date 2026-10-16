import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const WorkDetail = () => {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(apiBase + '/api/portfolio/' + encodeURIComponent(slug)).then((response) => response.ok ? response.json() : Promise.reject(new Error('Case study unavailable'))).then((data) => { if (!cancelled) setItem(data); }).catch(() => { if (!cancelled) setItem(null); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    document.title = item ? item.title + ' | Webzoneo' : 'Case Study | Webzoneo';
    if (!item) return;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description); }
    description.content = item.description;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.origin + '/work/' + item.slug;
  }, [item]);

  if (loading) return <div className="pt-32 pb-20 text-center text-gray-600">Loading case study…</div>;
  if (!item) return <div className="pt-32 pb-20 px-6 text-center min-h-[65vh]"><h1 className="text-3xl font-bold text-[#111827] mb-4">Case study not found</h1><p className="text-gray-600 mb-7">This case study may not be published or the address may be incorrect.</p><Link to="/work" className="inline-flex items-center gap-2 text-[#0ea5a4] font-semibold"><ArrowLeft size={18}/> Back to work</Link></div>;

  return <article className="pt-20">
    <header className="py-16 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white"><div className="max-w-4xl mx-auto px-4">
      <Link to="/work" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8"><ArrowLeft size={18}/> All case studies</Link>
      <p className="text-sm uppercase tracking-widest text-[#5eead4] mb-4">{item.category}{item.industry ? ' · ' + item.industry : ''}</p>
      <h1 className="text-3xl md:text-5xl font-bold mb-5">{item.title}</h1>
      <p className="text-gray-300 text-lg mb-4">Client: {item.client}{item.timeline ? ' · Timeline: ' + item.timeline : ''}</p>
      <p className="text-lg text-gray-200 leading-relaxed">{item.description}</p>
    </div></header>
    {item.image && <div className="max-w-5xl mx-auto px-4 py-8"><img src={item.image} alt={item.title} className="w-full max-h-[520px] object-cover rounded-2xl" loading="lazy"/></div>}
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {Array.isArray(item.challenges) && item.challenges.length > 0 && <section><h2 className="text-2xl font-bold mb-4">Challenge</h2><ul className="space-y-3">{item.challenges.map((value,index)=><li key={index} className="flex gap-3 text-gray-700"><CheckCircle className="text-teal-700 shrink-0" size={20}/>{value}</li>)}</ul></section>}
      {Array.isArray(item.solutions) && item.solutions.length > 0 && <section><h2 className="text-2xl font-bold mb-4">Approach</h2><ul className="space-y-3">{item.solutions.map((value,index)=><li key={index} className="flex gap-3 text-gray-700"><CheckCircle className="text-teal-700 shrink-0" size={20}/>{value}</li>)}</ul></section>}
      {Array.isArray(item.results) && item.results.length > 0 && <section><h2 className="text-2xl font-bold mb-4">Reported outcomes</h2><div className="grid md:grid-cols-2 gap-4">{item.results.map((result,index)=><div key={index} className="border rounded-xl p-5"><p className="text-sm text-gray-500">{result.label}</p><p className="text-2xl font-bold text-[#0b9488]">{result.value}</p></div>)}</div><p className="text-xs text-gray-500 mt-3">Results are specific to this case and should be read with its stated timeframe and measurement method.</p></section>}
      <div className="rounded-2xl bg-gray-50 border p-7"><h2 className="text-2xl font-bold mb-3">Discuss a project</h2><p className="text-gray-600 mb-5">Tell us about your business goals and target market.</p><Link to="/contact" className="inline-flex bg-[#0ea5a4] text-white px-6 py-3 rounded-lg font-semibold">Contact Webzoneo</Link></div>
    </div>
  </article>;
};

export default WorkDetail;
