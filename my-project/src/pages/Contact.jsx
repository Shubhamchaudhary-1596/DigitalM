import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'We could not send your enquiry. Please try again.');
      }
      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', company: '', service: '',
        budget: '', message: '', timeline: ''
      });
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || '',
      description: import.meta.env.VITE_PUBLIC_CONTACT_EMAIL ? 'Send us an email' : ''
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: import.meta.env.VITE_PUBLIC_CONTACT_PHONE || '',
      description: import.meta.env.VITE_PUBLIC_BUSINESS_HOURS || ''
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: import.meta.env.VITE_PUBLIC_CONTACT_ADDRESS || '',
      description: import.meta.env.VITE_PUBLIC_CONTACT_ADDRESS ? 'Business address' : ''
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: import.meta.env.VITE_PUBLIC_BUSINESS_DAYS || '',
      description: import.meta.env.VITE_PUBLIC_BUSINESS_HOURS || ''
    }
  ];

  const services = [
    'SEO Optimization',
    'PPC Advertising',
    'Social Media Marketing',
    'Web Development',
    'Content Marketing',
    'Analytics & Reporting',
    'Full Service Marketing',
    'Other'
  ];

  const budgetRanges = [
    'Under $5,000/month',
    '$5,000 - $10,000/month',
    '$10,000 - $25,000/month',
    '$25,000 - $50,000/month',
    '$50,000+/month',
    'One-time project'
  ];

  const timelines = [
    'ASAP',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Just exploring'
  ];

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
              Let's <span className="text-[#0ea5a4]">Grow Together</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Ready to take your digital marketing to the next level? Our team of experts is here to help 
              you achieve your business goals. Get in touch for a free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose what works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-[#f0fdfa] transition-colors group"
                >
                  <div className="w-16 h-16 bg-[#0ea5a4] text-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0b9488] transition-colors">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">{info.title}</h3>
                  {(info.details || info.description) && <><p className="text-[#0b9488] font-medium mb-1">{info.details}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p></>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {!isSubmitted ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#111827] mb-4">
                    Tell Us About Your Project
                  </h2>
                  <p className="text-gray-600">
                    The more details you provide, the better we can help you achieve your goals.
                  </p>
                </div>

                {submitError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">{submitError}</p>}
                {submitError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">{submitError}</p>}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                        placeholder="Include country code if outside India"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In *
                      </label>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(budget => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map(timeline => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your goals and challenges *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-colors"
                      placeholder="Describe your current marketing challenges, goals, and what success looks like for your business..."
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#0ea5a4] disabled:opacity-60 disabled:cursor-not-allowed text-white px-12 py-4 rounded-lg font-semibold hover:bg-[#0b9488] transition-all duration-300 flex items-center justify-center mx-auto group transform hover:scale-105"
                    >
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      {isSubmitting ? "Sending..." : "Send My Request"}
                    </button>
                    
                    <p className="text-gray-500 text-sm mt-4">
                      We'll get back to you within 24 hours with a customized proposal.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600 text-lg">
                  Your message has been sent successfully. We'll get back to you within 24 hours 
                  with a customized proposal for your project.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Contact;