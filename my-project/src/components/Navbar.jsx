import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'SEO', slug: 'seo' },
    { name: 'PPC Advertising', slug: 'ppc' },
    { name: 'Social Media', slug: 'social-media' },
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Content Marketing', slug: 'content-marketing' },
    { name: 'Analytics & Reporting', slug: 'analytics' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-30">
<Link
  to="/"
  className="flex items-center"
  aria-label="Webzoneo home"
>
  <img
    src="/logo.png"
    alt="Webzoneo logo"
    className="w-50 h-50 object-contain"
  />
</Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 list-none m-0 p-0">
            <li>
              <Link 
                to="/" 
                
                className={`font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-[#374151] hover:text-[#0ea5a4]' 
                    : 'text-white hover:text-[#5eead4]'
                }`}
              >
                Home
              </Link>
            </li>
            <li className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                className={`flex items-center font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-[#374151] hover:text-[#0ea5a4]' 
                    : 'text-white hover:text-[#5eead4]'
                }`}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg py-2 mt-2 list-none m-0"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    role="menu"
                    aria-label="Services submenu"
                  >
                    {services.map((service) => (
                      <li key={service.slug} role="none">
                        <Link
                          to={`/services/${service.slug}`}
                          className="block px-4 py-2 text-[#374151] hover:bg-[#f0fdfa] hover:text-[#0b9488] transition-colors"
                          role="menuitem"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li>
              <Link 
                to="/work" 
                className={`font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-[#374151] hover:text-[#0ea5a4]' 
                    : 'text-white hover:text-[#5eead4]'
                }`}
              >
                Work
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-[#374151] hover:text-[#0ea5a4]' 
                    : 'text-white hover:text-[#5eead4]'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className={`font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-[#374151] hover:text-[#0ea5a4]' 
                    : 'text-white hover:text-[#5eead4]'
                }`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contact"
                className={`flex items-center font-medium transition-colors ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-[#374151] hover:text-[#0ea5a4]' 
                    : 'text-white hover:text-[#5eead4]'
                }`}
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${
              isScrolled || location.pathname !== '/' ? 'text-[#111827]' : 'text-white'
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
            aria-label="Mobile navigation"
          >
            <ul className="px-4 pt-2 pb-4 space-y-2 list-none m-0">
              <li>
                <Link to="/" className="block py-2 text-[#374151] hover:text-[#0ea5a4]">Home</Link>
              </li>
              <li>
                <Link to="/services" className="block py-2 text-[#374151] hover:text-[#0ea5a4]">Services</Link>
              </li>
              <li>
                <Link to="/work" className="block py-2 text-[#374151] hover:text-[#0ea5a4]">Work</Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 text-[#374151] hover:text-[#0ea5a4]">About</Link>
              </li>
              <li>
                <Link to="/blog" className="block py-2 text-[#374151] hover:text-[#0ea5a4]">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 text-[#374151] hover:text-[#0ea5a4]">Contact</Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;