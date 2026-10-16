<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
=======
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
<<<<<<< HEAD
import Login from './pages/Login';
import Register from './pages/Register';
=======
import NotFound from './pages/NotFound';
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
import ScrollToTop from './components/ScrollToTop';
import LeadPopup from './components/LeadPopup';

// Admin imports

const staticMetadata = {
  '/': { title: 'Webzoneo | Digital Growth & Marketing', description: 'Digital marketing, SEO, paid advertising, social media, content and web solutions for businesses in India and international markets.' },
  '/services': { title: 'Digital Marketing Services | Webzoneo', description: 'Explore Webzoneo services for search visibility, paid advertising, social media, content, websites and analytics.' },
  '/work': { title: 'Our Work | Webzoneo', description: 'Learn how Webzoneo approaches digital marketing projects with clear scope and measurable evidence.' },
  '/about': { title: 'About Webzoneo', description: 'Learn about Webzoneo and our practical approach to digital strategy, implementation and measurement.' },
  '/blog': { title: 'Digital Marketing Insights | Webzoneo', description: 'Practical guides on SEO, analytics and customer acquisition for businesses in India and international markets.' },
  '/contact': { title: 'Contact Webzoneo', description: 'Tell Webzoneo about your business, target markets and digital marketing goals.' }
};

function RouteMetadata() {
  const location = useLocation();
  useEffect(() => {
    const meta = staticMetadata[location.pathname];
    if (!meta) return;
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = meta.description;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + location.pathname;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = meta.title;
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = meta.description;
  }, [location.pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  // Skip popup on admin/auth pages
  const isPublicPage = !location.pathname.startsWith('/admin') && !['/login', '/register'].includes(location.pathname);

  useEffect(() => {
    if (!isPublicPage) return;

    const popupShown = localStorage.getItem('popupShown');
    if (popupShown) return;

    const timer = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem('popupShown', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  }, [isPublicPage]);

  return (
<<<<<<< HEAD
    <>
=======
    <Router>
      <RouteMetadata />
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
=======
            <Route path="*" element={<NotFound />} />

            {/* Admin lives in the separate authenticated dashboard application. */}
            <Route path="/admin/*" element={<Navigate to="/contact" replace />} />
>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e

          </Routes>
        </main>
        <Footer />
      </div>
      {showPopup && <LeadPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
