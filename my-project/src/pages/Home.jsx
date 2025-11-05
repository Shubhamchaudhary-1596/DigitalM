import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Stats from '../components/Stats';

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;