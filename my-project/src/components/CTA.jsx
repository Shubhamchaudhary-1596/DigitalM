import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const CTA = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">Ready to plan your next step?</h2>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">Tell us about your audience, goals and current challenges. We will review your enquiry and follow up using the contact details you provide.</p>
        <Link to="/contact" className="inline-flex items-center bg-[#0ea5a4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0b9488]">Contact Webzoneo <ArrowRight className="ml-2" size={20}/></Link>
      </div>
      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8">
        <Mail className="text-[#0ea5a4] mb-4" size={32}/>
        <h3 className="text-2xl font-semibold text-[#111827] mb-3">What to include</h3>
        <ul className="space-y-3 text-gray-600 list-disc pl-5">
          <li>Your business and target markets</li>
          <li>The service or challenge you want help with</li>
          <li>Any relevant timelines and budget range</li>
        </ul>
      </div>
    </div>
  </section>
);

export default CTA;
