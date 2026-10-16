import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
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
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollToTop from './components/ScrollToTop';
import LeadPopup from './components/LeadPopup';

// Admin imports
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import ServicesManager from './pages/admin/ServicesManager';
import BlogEditor from './pages/admin/BlogEditor';
import ServiceEditor from './pages/admin/ServiceEditor';

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
    <>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/blog" element={<BlogManager />} />
            <Route path="/admin/blog/new" element={<BlogEditor />} />
            <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
            <Route path="/admin/services" element={<ServicesManager />} />
            <Route path="/admin/services/new" element={<ServiceEditor />} />
            <Route path="/admin/services/edit/:id" element={<ServiceEditor />} />
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
