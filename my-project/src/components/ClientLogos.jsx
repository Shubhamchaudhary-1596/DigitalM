import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  const logos = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'StartupX', logo: 'SX' },
    { name: 'GlobalBiz', logo: 'GB' },
    { name: 'Innovate', logo: 'IN' },
    { name: 'FutureTech', logo: 'FT' },
    { name: 'DigitalPro', logo: 'DP' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="pb-20"
    >
      <div className="text-center mb-12">
        <p className="text-gray-400 text-lg">Trusted by industry leaders</p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
  {logos.map((client, index) => (
    <motion.div
      key={client.name}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
      className="flex items-center space-x-3 group cursor-pointer"
      whileHover={{ scale: 1.1, opacity: 1 }}
    >
      <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-[#0ea5a4]/20 transition-colors">
        <span className="text-[#374151] font-bold text-lg">{client.logo}</span>
      </div>
      <span className="text-[#374151] font-semibold text-lg group-hover:text-[#0ea5a4] transition-colors hidden sm:block">
        {client.name}
      </span>
    </motion.div>
  ))}
</div>
    </motion.div>
  );
};

export default ClientLogos;