import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import ClientLogos from './ClientLogos';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-[#0ea5a4]/20 text-[#5eead4] px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-[#0ea5a4] rounded-full mr-2 animate-pulse"></span>
              Award-Winning Digital Marketing Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Drive Growth with 
              <span className="text-[#0ea5a4]"> Data-Driven</span>
              <br />Marketing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-300 leading-relaxed mb-8 max-w-lg"
            >
              We help businesses scale online through strategic SEO, targeted advertising, and conversion-focused campaigns that deliver measurable results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-[#0ea5a4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0b9488] transition-all duration-300 flex items-center justify-center group transform hover:scale-105">
                Get Free Strategy Call
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* <button className="border-2 border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center group backdrop-blur-sm">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </button> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center space-x-8 mt-12 pt-8 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0ea5a4]">15+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0ea5a4]">95%</div>
                <div className="text-sm text-gray-400">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0ea5a4]">50k+</div>
                <div className="text-sm text-gray-400">Revenue Generated</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Digital Marketing Team"
                className="rounded-2xl shadow-2xl"
              />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-[#0ea5a4] text-white p-4 rounded-xl shadow-lg"
              >
                <div className="text-sm font-semibold">ROI Increase</div>
                <div className="text-2xl font-bold">+285%</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-6 -left-6 bg-white text-dark-900 p-4 rounded-xl shadow-lg"
              >
                <div className="text-sm font-semibold text-gray-600">Traffic Growth</div>
                <div className="text-2xl font-bold text-[#0ea5a4]">+450%</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Client Logos */}
        {/* <ClientLogos /> */}
      </div>
    </div>
  );
};


export default Hero;