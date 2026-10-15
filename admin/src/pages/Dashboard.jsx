import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Settings, Inbox, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';

const Dashboard = () => {
  const [counts, setCounts] = useState({ blogs: null, services: null, contacts: null });
  const [error, setError] = useState('');
  useEffect(() => {
    Promise.all([
      api.get('/api/admin/blogs'),
      api.get('/api/admin/services'),
      api.get('/api/contacts')
    ]).then(([blogs, services, contacts]) => setCounts({ blogs: blogs.data.length, services: services.data.length, contacts: contacts.data.length }))
      .catch((err) => setError(err.response?.data?.error || 'Could not load dashboard counts. Check the API and database.'));
  }, []);
  const cards = [
    { label: 'Blog posts', value: counts.blogs, icon: FileText, href: '/blogs', description: 'Create, edit and publish content' },
    { label: 'Services', value: counts.services, icon: Settings, href: '/services', description: 'Manage active service listings' },
    { label: 'Enquiries', value: counts.contacts, icon: Inbox, href: '/contacts', description: 'Review saved contact requests' }
  ];
  return <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-2">Webzoneo dashboard</h1>
    <p className="text-gray-600 mb-8">Live counts from the API, not sample dashboard figures.</p>
    {error && <p role="alert" className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">{error}</p>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{cards.map((card) => { const Icon = card.icon; return <Link key={card.label} to={card.href} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow"><Icon className="text-teal-700 mb-4" size={30}/><p className="text-gray-600">{card.label}</p><p className="text-3xl font-bold my-2">{card.value === null ? '—' : card.value}</p><p className="text-sm text-gray-500">{card.description}</p><span className="mt-5 inline-flex items-center gap-2 text-teal-700 font-semibold">Open <ArrowRight size={16}/></span></Link>; })}</div>
    <div className="mt-8 bg-white border rounded-xl p-6"><h2 className="text-xl font-semibold mb-2">Before publishing</h2><p className="text-gray-600">Review titles, slugs, spelling, approved claims and contact details. Publishing a post makes it available to the public website through the content API.</p></div>
  </div>;
};

export default Dashboard;
