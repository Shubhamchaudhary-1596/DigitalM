import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const WorkDetail = () => (
  <div className="pt-20 min-h-[70vh] flex items-center justify-center bg-gray-50">
    <div className="max-w-xl px-6 text-center">
      <h1 className="text-3xl font-bold text-[#111827] mb-4">Case study not available</h1>
      <p className="text-gray-600 mb-7">This case study has not been published because approved client evidence is not yet available.</p>
      <Link to="/work" className="inline-flex items-center gap-2 text-[#0ea5a4] font-semibold"><ArrowLeft size={18}/> Back to work</Link>
    </div>
  </div>
);

export default WorkDetail;
