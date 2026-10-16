import React from 'react';
import { Search, Target, BarChart3 } from 'lucide-react';

const focus = [
  { icon: Search, title: 'Discover', text: 'Understand audience intent, site health and the competitive landscape.' },
  { icon: Target, title: 'Execute', text: 'Prioritize clear deliverables across search, campaigns, content and web.' },
  { icon: BarChart3, title: 'Improve', text: 'Measure agreed outcomes and use evidence to refine the next steps.' }
];

<<<<<<< HEAD
  const stats = [
    { 
      icon: Users,
      number: '500+',
      label: 'Happy Clients',
      description: 'Businesses trust us with their growth'
    },
    {
      icon: TrendingUp,
      number: '285%',
      label: 'Average ROI',
      description: 'Typical return on marketing investment'
    },
    {
      icon: DollarSign,
      number: '$50M+',
      label: 'Revenue Generated',
      description: 'Total revenue driven for our clients'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Industry Awards',
      description: 'Recognition for excellence and innovation'
    }
  ];

  return (
    <section className="py-20 bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
           className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl !text-gray-400 font-bold mb-6">
            Numbers That <span className="text-[#0ea5a4]">Matter</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Our track record speaks for itself. Here's the impact we've made for businesses worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0ea5a4] rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-[#0ea5a4] mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
=======
const Stats = () => (
  <section className="py-16 bg-[#111827] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">A clear path from insight to action</h2>
        <p className="text-gray-300">Our working approach keeps the focus on customer needs, practical execution and transparent measurement.</p>
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {focus.map((item) => { const Icon = item.icon; return <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6"><Icon size={30} className="text-[#5eead4] mb-4"/><h3 className="text-xl font-semibold mb-2">{item.title}</h3><p className="text-gray-300 leading-relaxed">{item.text}</p></article>; })}
      </div>
    </div>
  </section>
);

export default Stats;
