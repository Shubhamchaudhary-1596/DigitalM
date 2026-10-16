<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e

const Footer = () => {
  const email = import.meta.env.VITE_PUBLIC_CONTACT_EMAIL;
  const phone = import.meta.env.VITE_PUBLIC_CONTACT_PHONE;
  const address = import.meta.env.VITE_PUBLIC_CONTACT_ADDRESS;

  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
<<<<<<< HEAD
            <div className="flex items-center  space-x-2 mb-6">
              <Link
                to="/"
                className="flex items-center"
                aria-label="WebZoneo Home"
              >
                <img
                  src="/logo.png"
                  alt="WebZoneo Logo"
                  className="w-50 h-50 object-contain"
                />
              </Link>
            </div>
            <p className="text-gray-400 mb-20 leading-relaxed pt-0 mt-0">
              We're a digital marketing agency that helps businesses grow online
              through data-driven strategies and creative solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#0ea5a4] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#0ea5a4] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#0ea5a4] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#0ea5a4] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
=======
            <Link to="/" className="inline-flex items-center space-x-2 mb-6" aria-label="Webzoneo home">
              <span className="w-8 h-8 bg-[#0ea5a4] rounded-lg flex items-center justify-center font-bold">W</span>
              <span className="font-bold text-xl">Webzoneo</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">Digital strategy, marketing and web solutions for businesses in India and international markets.</p>
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-6">Explore</h2>
            <ul className="space-y-3">
<<<<<<< HEAD
              <li>
                <Link
                  to="/services/seo"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ppc"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  PPC Advertising
                </Link>
              </li>
              <li>
                <Link
                  to="/services/social-media"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/services/web-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/content-marketing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Content Marketing
                </Link>
              </li>
=======
              <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/work" className="text-gray-400 hover:text-white">Work</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
            </ul>
          </div>
          <div>
<<<<<<< HEAD
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/work"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[#0ea5a4]" />
                <span className="text-gray-400">info@webzoneo.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[#0ea5a4]" />
                <span className="text-gray-400">+91-7983963007</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-[#0ea5a4]" />
                <span className="text-gray-400">
                  A-35 Ground Floor Sector 69 Noida
                  <br />
                  Noida (UP) 201301
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Webzoneo. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
=======
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
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
        </div>
      </div> 

      <section
  id="about-webzoneo"
  className="py-[60px] px-[20px] lg:px-[120px] font-sans leading-7 text-[#333]"
>

  <h1 className="!text-[#0ea5a4] text-[32px] font-bold mb-5">
    Digital Marketing Company
  </h1>

  <p className="mb-4 text-[16px]">
    The digital landscape is evolving rapidly, and businesses must adapt to stay competitive.
    In today's highly connected world, having a strong online presence is no longer optional — it is essential.
    As a professional Digital Marketing Company, 
    <strong className="!text-[#0ea5a4]"> Webzoneo</strong> helps brands establish, grow,
    and dominate their presence in the digital space.
  </p>

  <p className="mb-10 text-[16px]">
    With years of industry experience and a results-driven approach, we partner with businesses
    across multiple industries to build impactful digital strategies. From increasing brand visibility
    to generating qualified leads and driving measurable ROI, Webzoneo delivers performance-focused
    digital solutions tailored to your business goals.
  </p>

  <h2 className="!text-[#0ea5a4] text-[26px] font-semibold mb-4">
    SEO Services Company in Noida
  </h2>

  <p className="mb-4 text-[16px]">
    When customers need products or services, their first step is usually a Google search.
    Ranking on the first page of search results significantly increases brand credibility and visibility.
    As a trusted SEO Services Company in Noida, Webzoneo helps businesses improve their
    search engine rankings through strategic optimization techniques.
  </p>

  <p className="mb-10 text-[16px]">
    Our SEO services include keyword research, on-page optimization, technical SEO, link building,
    content strategy, and performance tracking. We create customized SEO strategies that help
    your brand rank higher, attract organic traffic, and convert visitors into customers.
  </p>

  <h2 className="!text-[#0ea5a4] text-[26px] font-semibold mb-4">
    Social Media Marketing Agency in Noida
  </h2>

  <p className="mb-4 text-[16px]">
    Social media has transformed how brands connect with their audience.
    A strong social media presence can drive engagement, build trust, and generate consistent leads.
    As a leading Social Media Marketing Agency in Noida, Webzoneo develops powerful and creative campaigns
    that capture attention and convert followers into loyal customers.
  </p>

  <p className="mb-10 text-[16px]">
    We manage content creation, paid advertising, brand storytelling, audience targeting,
    and performance analytics across major platforms.
  </p>

  <h2 className="!text-[#0ea5a4] text-[26px] font-semibold mb-4">
    Website Designing and Development Company in Noida
  </h2>

  <p className="mb-4 text-[16px]">
    A website is the foundation of your digital identity. It represents your brand, communicates your message,
    and drives conversions. As a professional Website Designing and Development Company in Noida,
    Webzoneo builds modern, responsive, and high-performance websites tailored to your business needs.
  </p>

  <p className="mb-10 text-[16px]">
    Our websites are optimized for speed, mobile responsiveness, and search engine visibility —
    ensuring your brand leaves a lasting impression while generating valuable leads.
  </p>

  <h2 className="!text-[#0ea5a4] text-[26px] font-semibold mb-4">
    Creative Agency in Noida
  </h2>

  <p className="mb-4 text-[16px]">
    Creativity is the backbone of successful branding. In a competitive digital environment,
    strategy alone is not enough — compelling visuals and impactful storytelling are equally important.
    As a dynamic Creative Agency in Noida, Webzoneo combines innovation with strategy
    to craft designs that truly resonate.
  </p>

  <p className="mb-10 text-[16px]">
    Our creative solutions are designed to attract attention, build emotional connections,
    and strengthen brand recognition in the digital marketplace.
  </p>

  <h2 className="!text-[#0ea5a4] text-[26px] font-semibold mb-4">
    Why Choose Webzoneo?
  </h2>

  <ul className="mb-8 pl-5 text-[16px] list-disc">
    <li className="mb-2">Result-oriented digital strategies</li>
    <li className="mb-2">Customized solutions for every business</li>
    <li className="mb-2">Transparent communication and reporting</li>
    <li className="mb-2">Experienced team of marketing professionals</li>
    <li className="mb-2">Focus on measurable growth and ROI</li>
  </ul>

  <p className="text-[16px] font-medium">
    At <strong className="!text-[#0ea5a4]">Webzoneo</strong>, we don't just provide digital services —
    we build long-term growth partnerships.
  </p>

</section>
    </footer>
  );
};

export default Footer;
