import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Target, Users, BarChart3 } from 'lucide-react';

const values = [
  { icon: Search, title: 'Understand the audience', text: 'Start with customer needs, search intent and the market you want to reach.' },
  { icon: Target, title: 'Focus on priorities', text: 'Choose work that supports defined business objectives rather than vanity metrics.' },
  { icon: Users, title: 'Work transparently', text: 'Agree on scope, responsibilities, reporting and decision points before implementation.' },
  { icon: BarChart3, title: 'Measure and improve', text: 'Use reliable analytics to learn what is working and what needs adjustment.' }
];

const About = () => (
  <div className="pt-20">
    <section className="py-20 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="uppercase tracking-widest text-sm text-[#5eead4] mb-4">About Webzoneo</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">A practical partner for digital growth</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">We help businesses make clearer digital marketing decisions through strategy, implementation and measurement.</p>
      </div>
    </section>
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#111827] text-center mb-4">How we work</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">Every engagement should begin with a shared understanding of the business, the audience and the outcomes that matter.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((item) => { const Icon = item.icon; return <article key={item.title} className="border border-gray-200 rounded-2xl p-7"><Icon className="text-[#0ea5a4] mb-4" size={32}/><h3 className="text-xl font-semibold mb-2">{item.title}</h3><p className="text-gray-600 leading-relaxed">{item.text}</p></article>; })}
        </div>
        <div className="text-center mt-12"><Link to="/contact" className="inline-flex bg-[#0ea5a4] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0b9488]">Talk about your project</Link></div>
      </div>
    </section>
  </div>
);

export default About;
