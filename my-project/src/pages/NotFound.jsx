import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => { document.title = 'Page Not Found | Webzoneo'; }, []);
  return <main className="pt-32 pb-20 px-6 text-center min-h-[65vh]"><h1 className="text-4xl font-bold text-[#111827] mb-4">Page not found</h1><p className="text-gray-600 mb-7">The page may have moved or the address may be incorrect.</p><Link to="/" className="inline-flex bg-[#0ea5a4] text-white px-6 py-3 rounded-lg font-semibold">Return home</Link></main>;
};

export default NotFound;
