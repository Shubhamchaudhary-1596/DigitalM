import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Mail, Phone, Calendar } from 'lucide-react';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus({ success: false, message: '' });

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: '0f0fdc24-8008-4f7f-a67a-ac3d8466ac6f',
            subject: 'New Free Strategy Call Request',
            from_name: 'Website Contact Form',

            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            message: formData.message,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to send your message.'
        );
      }

      setStatus({
        success: true,
        message:
          'Thank you! Your message has been sent successfully.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } catch (error) {
      console.error('Web3Forms submission error:', error);

      setStatus({
        success: false,
        message:
          error.message ||
          'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-lg ' +
    'focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent ' +
    'outline-none transition';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
              Ready to{' '}
              <span className="text-[#0ea5a4]">
                Accelerate
              </span>{' '}
              Your Growth?
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Let's discuss your business goals and create a
              customized digital marketing strategy that
              delivers measurable results.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#0ea5a4] rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#111827]">
                    Free Strategy Session
                  </h4>
                  <p className="text-gray-600">
                    30-minute consultation to discuss your goals
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#0ea5a4] rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#111827]">
                    Custom Proposal
                  </h4>
                  <p className="text-gray-600">
                    Tailored strategy based on your business needs
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#0ea5a4] rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#111827]">
                    Quick Response
                  </h4>
                  <p className="text-gray-600">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">
                <strong>What you'll get:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Comprehensive audit of your current marketing</li>
                <li>• Growth opportunities analysis</li>
                <li>• Custom strategy recommendations</li>
                <li>• ROI projections and timeline</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-[#111827] mb-6">
              Get Your Free Strategy Call
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tell us about your goals
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="What are your main marketing challenges and goals?"
                />
              </div>

              {/* Success and error messages */}
              {status.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`p-3 rounded-lg text-sm ${
                    status.success
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0ea5a4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0b9488] transition-all duration-300 flex items-center justify-center group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Sending...'
                  : 'Schedule Free Consultation'}

                {!isSubmitting && (
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy
                policy. We'll never share your information.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
// Final setup
// Go to 
// Web3Forms  and generate an access key using the Gmail address where you want to receive submissions.

// In the code, replace:


// jsx
// access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
// with your actual access key.

// Save the file and restart your development server if necessary.

// Submit a test message and check your Gmail inbox and Spam folder.

// Note: This version sends form submissions to Web3Forms, not to your previous localhost:5000 backend. It doesn't require Express or a database. Because the access key is used in browser-side code, consider the provider's spam-protection options before deploying publicly.


// ChatGPT is AI and can make mistakes.

