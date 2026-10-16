import React, { useEffect, useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const serviceData = {
  seo: { title: 'SEO Services', subtitle: 'Build sustainable organic visibility', description: 'Improve technical health, page relevance and useful content so customers can find your business through search.', features: ['Technical SEO audit', 'Keyword and search-intent research', 'On-page optimization', 'Content planning', 'Local SEO where relevant', 'Search performance reporting'] },
  ppc: { title: 'Paid Advertising (PPC)', subtitle: 'Make campaign spend measurable', description: 'Plan and optimize paid search and social campaigns around clear business goals, conversion tracking and transparent reporting.', features: ['Campaign strategy and setup', 'Keyword and audience research', 'Ad copy and creative testing', 'Landing page review', 'Conversion tracking', 'Budget and performance reporting'] },
  'social-media': { title: 'Social Media Marketing', subtitle: 'Build a useful, consistent social presence', description: 'Create a channel plan, publish relevant content and measure engagement and business outcomes across the social platforms that matter to your audience.', features: ['Channel and audience strategy', 'Content calendar', 'Creative direction', 'Community response guidelines', 'Paid social coordination', 'Monthly reporting'] },
  'web-development': { title: 'Web Development', subtitle: 'Build fast, accessible digital experiences', description: 'Design and develop responsive websites and landing pages with clear user journeys, maintainable code and search-friendly foundations.', features: ['Responsive page development', 'Landing pages', 'Accessibility review', 'Performance optimization', 'Analytics integration', 'Technical handover'] },
  'content-marketing': { title: 'Content Marketing', subtitle: 'Answer customer questions with useful content', description: 'Plan and produce content that supports customer research, search visibility and conversion journeys instead of publishing for volume alone.', features: ['Content and topic research', 'Editorial calendar', 'Blog and landing-page copy', 'Content refreshes', 'Internal-link planning', 'Performance measurement'] },
  analytics: { title: 'Analytics & Reporting', subtitle: 'Turn measurement into practical decisions', description: 'Set up clear measurement plans and reporting so marketing activity can be evaluated against meaningful business outcomes.', features: ['Analytics configuration review', 'Conversion event planning', 'Campaign tagging guidance', 'Dashboard requirements', 'Data quality checks', 'Monthly insights and next steps'] }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const [apiService, setApiService] = useState(null);
  const service = useMemo(() => apiService ? { ...(serviceData[slug] || {}), title: apiService.title, description: apiService.description, features: Array.isArray(apiService.features) && apiService.features.length ? apiService.features : (serviceData[slug]?.features || []) } : serviceData[slug], [apiService, slug]);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    let cancelled = false;
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(apiBase + '/api/services/' + encodeURIComponent(slug)).then((response) => response.ok ? response.json() : Promise.reject(new Error('Service not found in API'))).then((item) => { if (!cancelled) setApiService(item); }).catch(() => { if (!cancelled) setApiService(null); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    document.title = service ? service.title + ' | Webzoneo' : 'Service Not Found | Webzoneo';
    if (!service) return;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', service.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/services/' + slug);
  }, [service, slug]);
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e

  if (!service) return <div className="pt-20 min-h-screen flex items-center justify-center"><div className="text-center px-6"><h1 className="text-2xl font-bold text-[#111827] mb-4">Service Not Found</h1><Link to="/services" className="text-[#0ea5a4] hover:text-[#0b9488]">Back to Services</Link></div></div>;

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-[#111827] to-[#1f2937] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8"><ArrowLeft size={18} /> All services</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="uppercase tracking-widest text-sm text-[#5eead4] mb-4">Webzoneo Services</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
            <h2 className="text-xl md:text-2xl text-gray-200 mb-6">{service.subtitle}</h2>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">{service.description}</p>
            <Link to="/contact" className="inline-flex mt-8 bg-[#0ea5a4] hover:bg-[#0b9488] text-white font-semibold rounded-lg px-6 py-3">Discuss your project</Link>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#111827] mb-8">What this service can include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.features.map((feature) => <div key={feature} className="bg-white rounded-xl p-5 shadow-sm flex gap-3 items-start"><CheckCircle className="text-[#0ea5a4] shrink-0 mt-1" size={21} /><p className="text-gray-700">{feature}</p></div>)}
          </div>
          <p className="mt-8 text-sm text-gray-500">Scope, timelines and pricing are confirmed after reviewing your goals and requirements. Results depend on market conditions, starting position and implementation.</p>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
