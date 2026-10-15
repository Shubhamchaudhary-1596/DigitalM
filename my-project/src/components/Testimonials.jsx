import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, BarChart3 } from 'lucide-react';

const approach = [
  { icon: MessageCircle, title: 'Clear communication', text: 'Agree on objectives, scope and expectations before work begins.' },
  { icon: CheckCircle, title: 'Defined deliverables', text: 'Know what is included, who owns each action and when it will be reviewed.' },
  { icon: BarChart3, title: 'Transparent measurement', text: 'Review relevant metrics and next steps instead of relying on unsupported promises.' }
];

const Testimonials = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-[#111827] mb-5">A transparent way to work</h2>
        <p className="text-lg text-gray-600">We publish customer testimonials and case-study metrics only when they are approved and can be substantiated. Until then, here is the approach we commit to for every engagement.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {approach.map((item) => { const Icon = item.icon; return <article key={item.title} className="bg-white rounded-2xl p-7 shadow-sm"><Icon size={30} className="text-[#0ea5a4] mb-4"/><h3 className="text-xl font-semibold mb-2">{item.title}</h3><p className="text-gray-600 leading-relaxed">{item.text}</p></article>; })}
      </div>
      <div className="text-center mt-10"><Link to="/contact" className="inline-flex bg-[#0ea5a4] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0b9488]">Discuss your goals</Link></div>
    </div>
  </section>
);

export default Testimonials;
