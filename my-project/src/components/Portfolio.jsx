import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, TrendingUp, Users, DollarSign } from 'lucide-react';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      title: 'E-commerce Growth Campaign',
      category: 'ppc',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      client: 'Fashion Retailer',
      results: [
        { label: 'Revenue Increase', value: '+285%', icon: DollarSign },
        { label: 'ROAS', value: '4.2x', icon: TrendingUp },
        { label: 'New Customers', value: '+1.2K', icon: Users }
      ],
      description: 'Complete digital transformation resulting in explosive growth.'
    },
    {
      id: 2,
      title: 'Local SEO Success Story',
      category: 'seo',
      image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600',
      client: 'Restaurant Chain',
      results: [
        { label: 'Organic Traffic', value: '+450%', icon: TrendingUp },
        { label: 'Local Rankings', value: 'Top 3', icon: TrendingUp },
        { label: 'Store Visits', value: '+60%', icon: Users }
      ],
      description: 'Dominated local search results across multiple locations.'
    },
    {
      id: 3,
      title: 'Social Media Transformation',
      category: 'social',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
      client: 'Tech Startup',
      results: [
        { label: 'Followers Growth', value: '+300%', icon: Users },
        { label: 'Engagement Rate', value: '8.5%', icon: TrendingUp },
        { label: 'Lead Generation', value: '+200%', icon: DollarSign }
      ],
      description: 'Built a thriving community and generated quality leads.'
    },
    {
      id: 4,
      title: 'Website Redesign & Optimization',
      category: 'web',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      client: 'SaaS Company',
      results: [
        { label: 'Conversion Rate', value: '+180%', icon: TrendingUp },
        { label: 'Page Speed', value: '+75%', icon: TrendingUp },
        { label: 'User Engagement', value: '+120%', icon: Users }
      ],
      description: 'Complete website overhaul driving significant conversions.'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ppc', label: 'PPC' },
    { id: 'seo', label: 'SEO' },
    { id: 'social', label: 'Social Media' },
    { id: 'web', label: 'Web Development' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            Our <span className="text-[#0ea5a4]">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Discover how we've helped businesses achieve remarkable growth through strategic digital marketing campaigns.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-[#0ea5a4] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[#111827]">{item.title}</h3>
                    <span className="text-sm text-gray-500">{item.client}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{item.description}</p>

                  <div className="grid grid-cols-3 gap-4">
                    {item.results.map((result, i) => {
                      const Icon = result.icon;
                      return (
                        <div key={i} className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <Icon className="h-4 w-4 text-[#0ea5a4] mr-1" />
                            <span className="text-lg font-bold text-[#0ea5a4]">{result.value}</span>
                          </div>
                          <span className="text-xs text-gray-500">{result.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-[#0ea5a4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0b9488] transition-colors">
            View All Case Studies
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;