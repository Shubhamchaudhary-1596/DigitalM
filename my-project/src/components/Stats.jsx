import React from 'react';
import { Search, Target, BarChart3 } from 'lucide-react';

const focus = [
  { icon: Search, title: 'Discover', text: 'Understand audience intent, site health and the competitive landscape.' },
  { icon: Target, title: 'Execute', text: 'Prioritize clear deliverables across search, campaigns, content and web.' },
  { icon: BarChart3, title: 'Improve', text: 'Measure agreed outcomes and use evidence to refine the next steps.' }
];

const Stats = () => (
  <section className="py-16 bg-[#111827] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">A clear path from insight to action</h2>
        <p className="text-gray-300">Our working approach keeps the focus on customer needs, practical execution and transparent measurement.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {focus.map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6"><Icon size={30} className="text-[#5eead4] mb-4"/><h3 className="text-xl font-semibold mb-2">{item.title}</h3><p className="text-gray-300 leading-relaxed">{item.text}</p></article>; })}
      </div>
    </div>
  </section>
);

export default Stats;
