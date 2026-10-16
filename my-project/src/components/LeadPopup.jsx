
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  X,
  Send,
  CheckCircle,
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const services = [
  'SEO Optimization',
  'PPC Advertising',
  'Social Media Marketing',
  'Web Development',
  'Content Marketing',
  'Other',
];

const LeadPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isLoading, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.service ||
      !formData.message.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (
      !WEB3FORMS_ACCESS_KEY ||
      WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY'
    ) {
      setError(
        'Please configure your Web3Forms access key first.'
      );
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Consultation Request - ${formData.service}`,
        from_name: 'DigitalM Website',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        service: formData.service,
        message: formData.message.trim(),
        botcheck: '',
      };

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message || 'Unable to send your message.'
        );
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (err) {
      console.error('Web3Forms submission error:', err);

      setError(
        err.message ||
          'Something went wrong. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    setIsSubmitted(false);
    setError('');
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lead-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2
                  id="lead-popup-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  Get Free Consultation
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  DigitalM - Your Growth Partner
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                aria-label="Close consultation form"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Company Information */}
            <div className="p-6 pb-2 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl min-w-0">
                  <Mail className="h-5 w-5 shrink-0 text-emerald-600" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm">
                      Email
                    </p>
                    <a
                      href="mailto:info@webzoneo.com"
                      className="text-emerald-700 text-xs break-all"
                    >
                      info@webzoneo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl min-w-0">
                  <Phone className="h-5 w-5 shrink-0 text-blue-600" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm">
                      Phone
                    </p>
                    <a
                      href="tel:+917983963007"
                      className="text-blue-700 text-xs break-all"
                    >
                      +91-7983963007
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Transform your business with expert SEO, PPC,
                social media, and web development. Contact us
                to discuss your growth goals.
              </p>
            </div>

            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="p-6 pt-4 space-y-4"
              >
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />

                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />

                <input
                  name="phone"
                  type="tel"
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />

                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Select Service *</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  required
                  rows={3}
                  maxLength={5000}
                  placeholder="Tell us about your goals *"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                />

                {/* Honeypot field for basic spam protection */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                  style={{ display: 'none' }}
                />

                {error && (
                  <p
                    role="alert"
                    className="text-red-600 text-sm p-3 bg-red-50 rounded-xl"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Your information will be used to respond to
                  your consultation request.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>

                <p className="text-gray-600 mb-6">
                  Your consultation request has been sent
                  successfully. We'll contact you within 24 hours.
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 px-6 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LeadPopup;