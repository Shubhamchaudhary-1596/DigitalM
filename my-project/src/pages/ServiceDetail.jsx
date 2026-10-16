import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, TrendingUp, Users, DollarSign } from 'lucide-react';

const ServiceDetail = () => {
  const { slug } = useParams();

  // Service data (in a real app, this would come from an API)
  const serviceData = {
    'seo': {
      title: 'SEO Optimization',
      subtitle: 'Dominate Search Results & Drive Organic Growth',
      description: 'Our comprehensive SEO strategies help businesses increase organic visibility, drive qualified traffic, and achieve sustainable long-term growth through proven optimization techniques.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Complete Technical SEO Audit',
        'Keyword Research & Strategy',
        'On-Page Optimization',
        'Content Optimization',
        'Local SEO (if applicable)',
        'Link Building Campaigns',
        'Performance Monitoring',
        'Monthly Reporting'
      ],
      process: [
        {
          step: '1',
          title: 'SEO Audit',
          description: 'Comprehensive analysis of your current SEO performance and opportunities.'
        },
        {
          step: '2',
          title: 'Strategy Development',
          description: 'Custom SEO strategy based on your business goals and market analysis.'
        },
        {
          step: '3',
          title: 'Implementation',
          description: 'Execute on-page optimization, technical improvements, and content strategy.'
        },
        {
          step: '4',
          title: 'Monitoring & Optimization',
          description: 'Continuous monitoring and optimization based on performance data.'
        }
      ],
      results: [
        { metric: 'Organic Traffic Increase', value: '+450%', icon: TrendingUp },
        { metric: 'Keyword Rankings', value: 'Top 3 positions', icon: TrendingUp },
        { metric: 'Qualified Leads', value: '+280%', icon: Users },
        { metric: 'Revenue Growth', value: '+320%', icon: DollarSign }
      ],
      pricing: {
        starter: { price: '$2,500', features: ['5-10 keywords', 'Basic reporting', 'On-page SEO'] },
        professional: { price: '$4,500', features: ['20-30 keywords', 'Advanced reporting', 'Technical SEO', 'Content strategy'] },
        enterprise: { price: '$7,500', features: ['50+ keywords', 'Custom reporting', 'Full SEO suite', 'Dedicated manager'] }
      }
    },
    'ppc': {
      title: 'PPC Advertising',
      subtitle: 'Maximize ROI with Strategic Paid Advertising',
      description: 'Drive immediate results with data-driven PPC campaigns across Google Ads, Facebook, LinkedIn, and more. Our expert team maximizes your advertising ROI and generates qualified leads.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Google Ads Management',
        'Facebook & Instagram Ads',
        'LinkedIn Advertising',
        'Campaign Strategy & Setup',
        'Ad Creative Development',
        'Landing Page Optimization',
        'Conversion Tracking',
        'Performance Reporting'
      ],
      process: [
        {
          step: '1',
          title: 'Strategy & Planning',
          description: 'Develop comprehensive PPC strategy aligned with your business goals.'
        },
        {
          step: '2',
          title: 'Campaign Setup',
          description: 'Create optimized campaigns with targeted keywords and compelling ad copy.'
        },
        {
          step: '3',
          title: 'Launch & Monitor',
          description: 'Launch campaigns and monitor performance with real-time optimization.'
        },
        {
          step: '4',
          title: 'Optimize & Scale',
          description: 'Continuously optimize for better performance and scale successful campaigns.'
        }
      ],
      results: [
        { metric: 'Return on Ad Spend', value: '4.2x ROAS', icon: DollarSign },
        { metric: 'Cost Per Lead', value: '-65%', icon: TrendingUp },
        { metric: 'Conversion Rate', value: '+180%', icon: TrendingUp },
        { metric: 'Quality Leads', value: '+350%', icon: Users }
      ],
      pricing: {
        starter: { price: '$3,000', features: ['Google Ads', 'Basic reporting', '$10K ad spend'] },
        professional: { price: '$5,000', features: ['Multi-platform', 'Advanced reporting', '$25K ad spend'] },
        enterprise: { price: '$8,000', features: ['Full-service', 'Custom dashboards', '$50K+ ad spend'] }
      }
    },

  'social-media': {
    title: 'Social Media Marketing',
    subtitle: 'Engage Your Audience & Build Your Brand',
    description: 'Leverage the power of social media platforms to connect with your audience, increase brand awareness, and drive engagement through tailored strategies.',
    image: 'https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Platform-Specific Strategies',
      'Content Creation & Scheduling',
      'Community Management',
      'Social Media Advertising',
      'Analytics & Reporting',
      'Influencer Collaborations',
      'Audience Growth Campaigns',
      'Reputation Management'
    ],
    process: [
      {
        step: '1',
        title: 'Audit & Strategy',
        description: 'Analyze your current social media presence and create a tailored strategy.'
      },
      {
        step: '2',
        title: 'Content Creation',
        description: 'Develop engaging content that resonates with your audience.'
      },
      {
        step: '3',
        title: 'Campaign Execution',
        description: 'Launch and manage campaigns across platforms for maximum impact.'
      },
      {
        step: '4',
        title: 'Performance Analysis',
        description: 'Track and optimize campaigns based on performance metrics.'
      }
    ],
    results: [
      { metric: 'Follower Growth', value: '+300%', icon: Users },
      { metric: 'Engagement Rate', value: '+150%', icon: TrendingUp },
      { metric: 'Brand Mentions', value: '+200%', icon: CheckCircle },
      { metric: 'Lead Generation', value: '+180%', icon: DollarSign }
    ],
    pricing: {
      starter: { price: '$1,500', features: ['1-2 platforms', 'Basic reporting', 'Content scheduling'] },
      professional: { price: '$3,000', features: ['3-4 platforms', 'Advanced analytics', 'Ad campaigns'] },
      enterprise: { price: '$5,000', features: ['All platforms', 'Custom reporting', 'Dedicated manager'] }
    }
  },

  'web-development': {
    title: 'Web Development',
    subtitle: 'Build Stunning Websites That Convert',
    description: 'Create responsive, user-friendly, and high-performing websites tailored to your business needs.',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Custom Website Design',
      'Responsive Development',
      'E-commerce Solutions',
      'Content Management Systems',
      'SEO-Friendly Code',
      'Performance Optimization',
      'Maintenance & Support',
      'Third-Party Integrations'
    ],
    process: [
      {
        step: '1',
        title: 'Requirement Gathering',
        description: 'Understand your business needs and goals for the website.'
      },
      {
        step: '2',
        title: 'Design & Prototyping',
        description: 'Create wireframes and design mockups for your approval.'
      },
      {
        step: '3',
        title: 'Development',
        description: 'Build the website using modern technologies and best practices.'
      },
      {
        step: '4',
        title: 'Testing & Launch',
        description: 'Test the website thoroughly and deploy it to production.'
      }
    ],
    results: [
      { metric: 'Page Load Speed', value: '-50% Load Time', icon: TrendingUp },
      { metric: 'User Engagement', value: '+200%', icon: Users },
      { metric: 'Conversion Rate', value: '+120%', icon: DollarSign },
      { metric: 'SEO Performance', value: '+300%', icon: CheckCircle }
    ],
    pricing: {
      starter: { price: '$3,000', features: ['Basic website', 'Responsive design', 'SEO-ready'] },
      professional: { price: '$6,000', features: ['Custom design', 'CMS integration', 'E-commerce'] },
      enterprise: { price: '$10,000', features: ['Full-stack development', 'Advanced integrations', 'Ongoing support'] }
    }
  },

  'content-marketing': {
    title: 'Content Marketing',
    subtitle: 'Drive Engagement with High-Quality Content',
    description: 'Develop and distribute valuable, relevant, and consistent content to attract and retain your target audience.',
    image: 'https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      'Content Strategy Development',
      'Blog Writing',
      'Video Production',
      'Infographics & Visuals',
      'Email Campaigns',
      'Content Distribution',
      'SEO Content Optimization',
      'Performance Tracking'
    ],
    process: [
      {
        step: '1',
        title: 'Research & Planning',
        description: 'Identify your audience and create a content strategy.'
      },
      {
        step: '2',
        title: 'Content Creation',
        description: 'Produce high-quality content tailored to your audience.'
      },
      {
        step: '3',
        title: 'Distribution',
        description: 'Distribute content across the right channels for maximum reach.'
      },
      {
        step: '4',
        title: 'Analysis & Optimization',
        description: 'Measure performance and refine the strategy for better results.'
      }
    ],
    results: [
      { metric: 'Website Traffic', value: '+400%', icon: TrendingUp },
      { metric: 'Lead Generation', value: '+250%', icon: DollarSign },
      { metric: 'Audience Engagement', value: '+300%', icon: Users },
      { metric: 'Brand Authority', value: '+180%', icon: CheckCircle }
    ],
    pricing: {
      starter: { price: '$2,000', features: ['Blog posts', 'Basic SEO', 'Monthly reporting'] },
      professional: { price: '$4,000', features: ['Content strategy', 'SEO optimization', 'Multi-format content'] },
      enterprise: { price: '$7,000', features: ['Custom campaigns', 'Advanced analytics', 'Dedicated team'] }
    }
  }
  };

  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4">Service Not Found</h1>
          <Link to="/services" className="text-[#0ea5a4] hover:text-[#0b9488]">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#0ea5a4]">Home</Link>
            <span className="text-gray-400">→</span>
            <Link to="/services" className="text-gray-600 hover:text-[#0ea5a4]">Services</Link>
            <span className="text-gray-400">→</span>
            <span className="text-[#0ea5a4]">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center text-[#0ea5a4] hover:text-[#0b9488] mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
                {service.title}
              </h1>
              <h2 className="text-xl text-[#0ea5a4] font-semibold mb-6">
                {service.subtitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {service.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#0ea5a4] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0b9488] transition-colors">
                  Get Started Today
                </button>
                <button className="border border-gray-300 text-[#111827] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Schedule Consultation
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#111827] mb-12">
            Results You Can Expect
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.results.map((result, index) => {
              const Icon = result.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-lg"
                >
                  <Icon className="h-8 w-8 text-[#0ea5a4] mx-auto mb-4" />
                  <div className="text-2xl font-bold text-[#0ea5a4] mb-2">{result.value}</div>
                  <div className="text-sm text-gray-600">{result.metric}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-6">What's Included</h2>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#0ea5a4] mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-6">Our Process</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-[#0ea5a4] text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#111827] mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#111827] mb-12">
            Choose Your Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(service.pricing).map(([plan, details], index) => (
              <div
                key={plan}
                className={`bg-white rounded-2xl p-8 shadow-lg ${
                  plan === 'professional' ? 'ring-2 ring-[#0ea5a4] scale-105' : ''
                }`}
              >
                {plan === 'professional' && (
                  <div className="bg-[#0ea5a4] text-white text-sm font-semibold px-4 py-1 rounded-full text-center mb-4">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-[#111827] mb-2 capitalize">{plan}</h3>
                <div className="text-3xl font-bold text-[#0ea5a4] mb-6">
                  {details.price}<span className="text-lg text-gray-600">/mo</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {details.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 text-[#0ea5a4] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan === 'professional'
                      ? 'bg-[#0ea5a4] text-white hover:bg-[#0b9488]'
                      : 'border border-gray-300 text-[#111827] hover:bg-gray-50'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0ea5a4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-[#ccfbf1] mb-8">
            Let's discuss your specific needs and create a customized {service.title.toLowerCase()} strategy for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#0ea5a4] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule Free Consultation
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Call (555) 123-4567
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;