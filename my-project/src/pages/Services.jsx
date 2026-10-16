import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Target, Users, Code, PenTool, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const defaultServices = [
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Dominate search results with our comprehensive SEO strategies. We help businesses increase organic visibility, drive qualified traffic, and achieve sustainable long-term growth.',
      slug: 'seo',
      features: ['Technical SEO Audits', 'Keyword Research & Strategy', 'On-Page Optimization', 'Link Building', 'Local SEO', 'Content Optimization'],
    },
    {
      icon: Target,
      title: 'PPC Advertising',
      description: 'Maximize your advertising ROI with data-driven PPC campaigns across Google Ads, Facebook, LinkedIn, and more. Get instant visibility and qualified leads.',
      slug: 'ppc',
      features: ['Google Ads Management', 'Facebook & Instagram Ads', 'LinkedIn Advertising', 'Campaign Optimization', 'A/B Testing', 'Conversion Tracking'],
    },
    {
      icon: Users,
      title: 'Social Media Marketing',
      description: 'Build engaged communities and drive conversions through strategic social media campaigns. Create compelling content that resonates with your audience.',
      slug: 'social-media',
      features: ['Content Creation', 'Community Management', 'Influencer Partnerships', 'Social Media Ads', 'Analytics & Reporting', 'Brand Building'],
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Create high-converting websites and landing pages optimized for performance, user experience, and search engines. Modern designs that drive results.',
      slug: 'web-development',
      features: ['Custom Web Development', 'E-commerce Solutions', 'Landing Pages', 'Mobile Responsive Design', 'Performance Optimization', 'CMS Integration'],
    },
    {
      icon: PenTool,
      title: 'Content Marketing',
      description: 'Engage your audience with compelling content that drives traffic, builds brand authority, and generates leads. Strategic content that converts.',
      slug: 'content-marketing',
      features: ['Content Strategy', 'Blog Writing', 'Video Content', 'Email Marketing', 'Copywriting', 'Content Distribution'],
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Make informed decisions with comprehensive analytics and transparent performance reporting. Track ROI and optimize for better results.',
      slug: 'analytics',
      features: ['Google Analytics Setup', 'Custom Dashboards', 'Performance Tracking', 'ROI Analysis', 'Conversion Tracking', 'Monthly Reports'],
    }
  ];

  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    document.title = 'Digital Marketing Services | Webzoneo';
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(apiBase + '/api/services').then((response) => response.ok ? response.json() : Promise.reject(new Error('API unavailable'))).then((items) => {
      if (Array.isArray(items) && items.length) {
        const icons = { seo: Search, ppc: Target, 'social-media': Users, 'web-development': Code, 'content-marketing': PenTool, analytics: BarChart3 };
        setServices(items.map((item) => ({ ...item, icon: icons[item.slug] || icons[item.category] || Search, features: item.features || [] })));
      }
    }).catch(() => { /* Keep bundled service descriptions if the API is unavailable. */ });
  }, []);

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-gray-400">
              Our Digital Marketing <span className="text-[#0ea5a4]">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We offer comprehensive digital marketing solutions designed to accelerate your business growth 
              and maximize your online presence. Each service is tailored to deliver measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-[#0ea5a4] rounded-xl flex items-center justify-center group-hover:bg-[#0b9488] transition-colors">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-bold text-[#111827]">{service.title}</h3>
                      <p className="text-sm text-gray-500">Scope tailored to your goals</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#111827] mb-3">What's included:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-[#0ea5a4] rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center text-[#0ea5a4] font-semibold hover:text-[#0b9488] transition-colors"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/contact" className="bg-[#0ea5a4] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0b9488] transition-colors">Discuss</Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0ea5a4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-[#ccfbf1] mb-8">
            Let's discuss which services align best with your business goals and create a customized strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#0ea5a4] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule Free Consultation
            </Link>
            <Link
              to="/work"
              className="border-2 !border-white !text-white px-8 py-4 rounded-lg font-semibold !hover:bg-white/10 transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
