import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const email = import.meta.env.VITE_PUBLIC_CONTACT_EMAIL;
  const phone = import.meta.env.VITE_PUBLIC_CONTACT_PHONE;
  const address = import.meta.env.VITE_PUBLIC_CONTACT_ADDRESS;

  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="inline-flex items-center space-x-2 mb-6" aria-label="Webzoneo home">
              <span className="w-8 h-8 bg-[#0ea5a4] rounded-lg flex items-center justify-center font-bold">W</span>
              <span className="font-bold text-xl">Webzoneo</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">Digital strategy, marketing and web solutions for businesses in India and international markets.</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-6">Explore</h2>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/work" className="text-gray-400 hover:text-white">Work</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-6">Contact</h2>
            <div className="space-y-4">
              {email && <a href={'mailto:' + email} className="flex items-center gap-3 text-gray-400 hover:text-white"><Mail size={18} className="text-[#0ea5a4]" />{email}</a>}
              {phone && <a href={'tel:' + phone} className="flex items-center gap-3 text-gray-400 hover:text-white"><Phone size={18} className="text-[#0ea5a4]" />{phone}</a>}
              {address && <div className="flex items-start gap-3 text-gray-400"><MapPin size={18} className="text-[#0ea5a4] shrink-0" /><span>{address}</span></div>}
              {!email && !phone && !address && <p className="text-gray-400 text-sm">Contact details will appear here after public settings are configured.</p>}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Webzoneo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
