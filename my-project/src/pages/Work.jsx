import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck2 } from 'lucide-react';

const Work = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = 'Our Work | Webzoneo';
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(apiBase + '/api/portfolio').then((response) => response.ok ? response.json() : Promise.reject(new Error('Portfolio API unavailable'))).then((data) => { if (Array.isArray(data)) setItems(data); }).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  return <div className="pt-20 min-h-[70vh]">
    <section className="py-20 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="uppercase tracking-widest text-sm text-[#5eead4] mb-4">Our work</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Case studies built on evidence</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Explore approved project stories with clear scope and substantiated outcomes.</p>
      </div>
    </section>
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {loading ? <p className="text-center text-gray-600 py-10">Loading case studies…</p> : items.length ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{items.map((item) => <article key={item._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">{item.image && <img src={item.image} alt={item.title} loading="lazy" className="w-full h-56 object-cover"/>}<div className="p-6"><p className="text-sm text-teal-700 font-semibold mb-2">{item.category}{item.industry ? ' · ' + item.industry : ''}</p><h2 className="text-2xl font-bold text-[#111827] mb-2">{item.title}</h2><p className="text-sm text-gray-500 mb-3">Client: {item.client}</p><p className="text-gray-600 leading-relaxed mb-5">{item.description}</p><Link to={'/work/' + item.slug} className="inline-flex items-center gap-2 text-teal-700 font-semibold">View case study <ArrowRight size={17}/></Link></div></article>)}</div> : <div className="max-w-3xl mx-auto text-center"><FileCheck2 size={42} className="text-[#0ea5a4] mx-auto mb-5"/><h2 className="text-2xl font-bold text-[#111827] mb-3">Verified case studies are being prepared</h2><p className="text-gray-600 mb-8">Only case studies approved for publication are shown here. An administrator can add and publish a case study once the client details and evidence are confirmed.</p><Link to="/contact" className="inline-flex bg-[#0ea5a4] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0b9488]">Ask about our approach</Link></div>}
      </div>
    </section>
  </div>;
};

export default Work;
