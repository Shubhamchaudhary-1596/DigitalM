import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Target, Users, Code, PenTool, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Boost your organic visibility and drive qualified traffic with our data-driven SEO strategies.',
      slug: 'seo',
      features: ['Keyword Research', 'Technical SEO', 'Content Optimization', 'Local SEO']
    },
    {
      icon: Target,
      title: 'PPC Advertising',
      description: 'Maximize ROI with targeted ad campaigns across Google, Facebook, and other premium platforms.',
      slug: 'ppc',
      features: ['Google Ads', 'Facebook Ads', 'Campaign Optimization', 'A/B Testing']
    },
    {
      icon: Users,
      title: 'Social Media Marketing',
      description: 'Build engaged communities and drive conversions through strategic social media campaigns.',
      slug: 'social-media',
      features: ['Content Creation', 'Community Management', 'Influencer Partnerships', 'Social Ads']
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Create high-converting websites and landing pages optimized for performance and user experience.',
      slug: 'web-development',
      features: ['Custom Development', 'E-commerce', 'Mobile Responsive', 'Performance Optimization']
    },
    {
      icon: PenTool,
      title: 'Content Marketing',
      description: 'Engage your audience with compelling content that drives traffic and builds brand authority.',
      slug: 'content-marketing',
      features: ['Blog Writing', 'Video Content', 'Email Marketing', 'Content Strategy']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Make informed decisions with comprehensive analytics and transparent performance reporting.',
      slug: 'analytics',
      features: ['Google Analytics', 'Custom Dashboards', 'Performance Tracking', 'ROI Analysis']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 ">
            Our <span className="text-[#0ea5a4]">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive digital marketing solutions designed to accelerate your business growth 
            and maximize your online presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#0ea5a4] rounded-lg flex items-center justify-center group-hover:bg-[#0f766e] transition-colors">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] ml-4">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#0ea5a4] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center text-[#0ea5a4] font-semibold hover:text-[#0f766e] transition-colors"
                >
                  Learn More
                  <motion.div
                    className="ml-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;