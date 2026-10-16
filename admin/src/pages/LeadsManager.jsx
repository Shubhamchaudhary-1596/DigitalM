import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, Clock, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAllLeads, searchLeads } from '../utils/api.js';
import SearchBox from '../components/SearchBox.jsx';

const LeadsManager = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Load all leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await getAllLeads();
      if (response.success) {
        setLeads(response.leads || []);
        setFilteredLeads(response.leads || []);
      } else {
        setError('Failed to load leads');
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Error loading leads');
    } finally {
      setLoading(false);
    }
  };

  // Search leads
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredLeads(leads);
      return;
    }

    try {
      const response = await searchLeads(query);
      if (response.success) {
        setFilteredLeads(response.leads || []);
      } else {
        setError('Search failed');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed');
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Auto refresh every 30s
  useEffect(() => {
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads Management</h1>
          <p className="text-gray-600">
            Manage customer leads from contact forms. Total: <span className="font-semibold">{leads.length}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Auto-refreshes every 30s</span>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">All Leads</h2>
                <p className="text-sm text-gray-500">
                  {filteredLeads.length} of {leads.length} leads {searchQuery ? `matching "${searchQuery}"` : ''}
                </p>
              </div>
            </div>
            <SearchBox 
              setSearchQuery={setSearchQuery}
              value={searchQuery}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Interest</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <motion.tr
                  key={lead._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                    {lead.phone || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {lead.interest}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {lead.status || 'new'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No leads found</h3>
                      <p className="text-sm">{searchQuery ? `No leads match "${searchQuery}"` : 'No leads yet. Contact form submissions will appear here.'}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - basic for now */}
        {leads.length > 10 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Showing 1 to {Math.min(10, filteredLeads.length)} of {leads.length} results</span>
              <div className="space-x-2">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-100">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default LeadsManager;

