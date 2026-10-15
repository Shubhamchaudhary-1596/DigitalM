import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, ArrowRight } from 'lucide-react';

const Portfolio = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <FileCheck2 size={40} className="text-[#0ea5a4] mx-auto mb-5"/>
      <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-5">Work that can be checked</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">We are preparing approved case studies with clear baselines, timeframes and measurable outcomes. We do not publish illustrative figures as customer results.</p>
      <Link to="/work" className="inline-flex items-center gap-2 bg-[#0ea5a4] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0b9488]">How we approach projects <ArrowRight size={18}/></Link>
    </div>
  </section>
);

export default Portfolio;
