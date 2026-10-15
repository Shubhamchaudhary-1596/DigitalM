import React, { useEffect, useState } from 'react';
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
  const service = apiService ? { ...(serviceData[slug] || {}), title: apiService.title, description: apiService.description, features: Array.isArray(apiService.features) && apiService.features.length ? apiService.features : (serviceData[slug]?.features || []) } : serviceData[slug];

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
