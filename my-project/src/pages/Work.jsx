import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2 } from 'lucide-react';

const Work = () => (
  <div className="pt-20 min-h-[70vh]">
    <section className="py-20 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="uppercase tracking-widest text-sm text-[#5eead4] mb-4">Our work</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Case studies built on evidence</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">We share client stories when the client, baseline, timeframe and results have been verified and approved for publication.</p>
      </div>
    </section>
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <FileCheck2 size={42} className="text-[#0ea5a4] mx-auto mb-5" />
        <h2 className="text-2xl font-bold text-[#111827] mb-3">Verified case studies are being prepared</h2>
        <p className="text-gray-600 mb-8">The previous repository contained illustrative client names and performance figures that have not been verified. They have been removed rather than presented as real customer results.</p>
        <Link to="/contact" className="inline-flex bg-[#0ea5a4] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0b9488]">Ask about our approach</Link>
      </div>
    </section>
  </div>
);

export default Work;
