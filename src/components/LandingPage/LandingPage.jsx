import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import Ad from './components/Ad/Ad';
import Footer from './components/Footer/Footer';
import FloatingButton from './components/FloatingButton/FloatingButton';

const LandingPage = () => {
  return (
    <div>
      <Header /> 
      <HeroSection />
      <FloatingButton />
      <Ad />
      <Footer />
    </div>
  );
};

export default LandingPage;
