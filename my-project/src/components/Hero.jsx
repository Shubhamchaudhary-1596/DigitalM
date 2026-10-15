import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => (
  <section className="relative min-h-[82vh] bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="inline-flex bg-[#0ea5a4]/20 text-[#5eead4] px-4 py-2 rounded-full text-sm font-medium mb-6">Digital growth partner</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">Practical digital marketing for <span className="text-[#0ea5a4]">sustainable growth</span></h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">Webzoneo helps businesses plan and improve their search visibility, paid campaigns, social presence, content and website experience.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/contact" className="bg-[#0ea5a4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0b9488] inline-flex items-center justify-center">Discuss your goals <ArrowRight className="ml-2 h-5 w-5" /></Link>
          <Link to="/services" className="border-2 border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 inline-flex items-center justify-center">Explore services</Link>
        </div>
      </motion.div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
        <p className="text-sm uppercase tracking-widest text-[#5eead4] mb-4">A clear working approach</p>
        <ol className="space-y-6">
          <li><span className="text-[#5eead4] font-bold mr-3">01</span><strong>Understand</strong><p className="text-gray-300 mt-1 ml-10">Business goals, audience and current performance.</p></li>
          <li><span className="text-[#5eead4] font-bold mr-3">02</span><strong>Prioritize</strong><p className="text-gray-300 mt-1 ml-10">A focused plan based on impact and feasibility.</p></li>
          <li><span className="text-[#5eead4] font-bold mr-3">03</span><strong>Measure</strong><p className="text-gray-300 mt-1 ml-10">Track agreed outcomes and improve with evidence.</p></li>
        </ol>
      </div>
    </div>
  </section>
);

export default Hero;
