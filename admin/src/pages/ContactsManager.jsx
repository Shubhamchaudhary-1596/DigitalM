import React, { useEffect, useState } from 'react';
import { api } from '../contexts/AuthContext';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/contacts')
      .then((response) => setContacts(response.data))
      .catch((err) => setError(err.response?.data?.error || 'Could not load enquiries. Confirm login, API configuration and database connectivity.'))
      .finally(() => setLoading(false));
  }, []);

  return <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-2">Contact enquiries</h1>
    <p className="text-gray-600 mb-6">Recent website enquiries saved by the API.</p>
    {error && <p role="alert" className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</p>}
    {loading ? <p className="text-gray-600">Loading enquiries…</p> : !error && contacts.length === 0 ? <p className="bg-white border rounded-xl p-6 text-gray-600">No enquiries have been received yet.</p> : <div className="space-y-4">{contacts.map((contact) => <article key={contact._id} className="bg-white border rounded-xl p-5"><div className="flex flex-col md:flex-row md:justify-between gap-2"><h2 className="font-semibold text-lg">{contact.name}</h2><time className="text-sm text-gray-500">{contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ''}</time></div><p className="text-sm text-teal-700 mt-1">{contact.email}{contact.phone ? ' · ' + contact.phone : ''}</p>{contact.company && <p className="text-sm text-gray-600 mt-1">Company: {contact.company}</p>}{contact.service && <p className="text-sm text-gray-600 mt-1">Service: {contact.service}</p>}<p className="text-gray-700 mt-4 whitespace-pre-wrap">{contact.message}</p></article>)}</div>}
  </div>;
};

export default ContactsManager;
