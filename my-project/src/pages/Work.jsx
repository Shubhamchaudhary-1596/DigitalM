import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, TrendingUp, Users, DollarSign, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Work = () => {
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
      industry: 'E-commerce',
      client: 'Fashion Forward',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete digital transformation for a fashion retailer, resulting in explosive revenue growth through strategic PPC campaigns and conversion optimization.',
      results: [
        { label: 'Revenue Increase', value: '+285%', icon: DollarSign },
        { label: 'ROAS', value: '4.2x', icon: TrendingUp },
        { label: 'New Customers', value: '+1,247', icon: Users }
      ],
      challenges: ['Low online visibility', 'Poor conversion rates', 'High customer acquisition cost'],
      solutions: ['Multi-platform PPC strategy', 'Landing page optimization', 'Advanced targeting'],
      timeline: '6 months',
      slug: 'fashion-forward-growth'
    },
    {
      id: 2,
      title: 'Local SEO Domination',
      category: 'seo',
      industry: 'Food & Beverage',
      client: 'Urban Eats',
      image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Helped a restaurant chain dominate local search results across multiple locations, driving significant foot traffic and online orders.',
      results: [
        { label: 'Organic Traffic', value: '+450%', icon: TrendingUp },
        { label: 'Local Rankings', value: 'Top 3', icon: TrendingUp },
        { label: 'Store Visits', value: '+60%', icon: Users }
      ],
      challenges: ['Low local visibility', 'Inconsistent NAP data', 'No Google My Business optimization'],
      solutions: ['Local SEO audit', 'GMB optimization', 'Location-based content strategy'],
      timeline: '4 months',
      slug: 'urban-eats-local-seo'
    },
    {
      id: 3,
      title: 'Social Media Transformation',
      category: 'social',
      industry: 'Technology',
      client: 'TechNova',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Built a thriving social media community for a tech startup, driving brand awareness and generating quality leads through engaging content.',
      results: [
        { label: 'Followers Growth', value: '+320%', icon: Users },
        { label: 'Engagement Rate', value: '8.5%', icon: TrendingUp },
        { label: 'Lead Generation', value: '+200%', icon: DollarSign }
      ],
      challenges: ['No social presence', 'Limited brand awareness', 'No content strategy'],
      solutions: ['Content calendar creation', 'Community building', 'Influencer partnerships'],
      timeline: '8 months',
      slug: 'technova-social-transformation'
    },
    {
      id: 4,
      title: 'Website Redesign & CRO',
      category: 'web',
      industry: 'SaaS',
      client: 'CloudSync',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete website overhaul with focus on conversion optimization, resulting in significant improvement in user experience and lead generation.',
      results: [
        { label: 'Conversion Rate', value: '+180%', icon: TrendingUp },
        { label: 'Page Speed', value: '+75%', icon: TrendingUp },
        { label: 'User Engagement', value: '+120%', icon: Users }
      ],
      challenges: ['Outdated design', 'Poor user experience', 'Low conversion rates'],
      solutions: ['Modern responsive design', 'CRO implementation', 'Performance optimization'],
      timeline: '3 months',
      slug: 'cloudsync-website-redesign'
    },
    {
      id: 5,
      title: 'Content Marketing Success',
      category: 'content',
      industry: 'Healthcare',
      client: 'MediCare Plus',
      image: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Developed comprehensive content marketing strategy that positioned healthcare provider as a thought leader in the industry.',
      results: [
        { label: 'Blog Traffic', value: '+380%', icon: TrendingUp },
        { label: 'Lead Quality', value: '+150%', icon: Users },
        { label: 'Brand Authority', value: '+90%', icon: TrendingUp }
      ],
      challenges: ['Limited content', 'No content strategy', 'Poor search visibility'],
      solutions: ['Content audit', 'Editorial calendar', 'SEO-optimized content'],
      timeline: '12 months',
      slug: 'medicare-content-marketing'
    },
    {
      id: 6,
      title: 'Multi-Channel Campaign',
      category: 'integrated',
      industry: 'Real Estate',
      client: 'Premier Properties',
      image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Integrated marketing campaign combining SEO, PPC, social media, and content marketing to drive property sales and brand recognition.',
      results: [
        { label: 'Sales Increase', value: '+240%', icon: DollarSign },
        { label: 'Brand Awareness', value: '+180%', icon: TrendingUp },
        { label: 'Lead Quality', value: '+160%', icon: Users }
      ],
      challenges: ['Seasonal fluctuations', 'High competition', 'Limited online presence'],
      solutions: ['Integrated campaign strategy', 'Multi-channel approach', 'Performance tracking'],
      timeline: '10 months',
      slug: 'premier-properties-campaign'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: portfolioItems.length },
    { id: 'ppc', label: 'PPC', count: portfolioItems.filter(item => item.category === 'ppc').length },
    { id: 'seo', label: 'SEO', count: portfolioItems.filter(item => item.category === 'seo').length },
    { id: 'social', label: 'Social Media', count: portfolioItems.filter(item => item.category === 'social').length },
    { id: 'web', label: 'Web Development', count: portfolioItems.filter(item => item.category === 'web').length },
    { id: 'content', label: 'Content Marketing', count: portfolioItems.filter(item => item.category === 'content').length },
    { id: 'integrated', label: 'Integrated', count: portfolioItems.filter(item => item.category === 'integrated').length }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
             className="flex flex-col items-center text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-gray-400 ">
              Our <span className="text-[#0ea5a4]">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Discover how we've helped businesses across industries achieve remarkable growth 
              through strategic digital marketing campaigns and innovative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-600 font-medium">Filter by service:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-[#0ea5a4] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-center text-gray-600">
              Showing {filteredItems.length} of {portfolioItems.length} projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0ea5a4] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Link
                      to={`/work/${item.slug}`}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </Link>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white">
                      <p className="text-sm opacity-80">{item.client} • {item.industry}</p>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Timeline: {item.timeline}</span>
                    </div>
                    <Link
                      to={`/work/${item.slug}`}
                      className="bg-[#0ea5a4] !text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0b9488] transition-colors"
                    >
                      View Case Study
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0ea5a4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-[#ccfbf1] mb-8">
            Let's discuss how we can help your business achieve similar results with our proven digital marketing strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#0ea5a4] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Success Story
            </Link>
            <Link
              to="/services"
              className="border-2 !border-white !text-white px-8 py-4 rounded-lg font-semibold !hover:bg-white/10 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
