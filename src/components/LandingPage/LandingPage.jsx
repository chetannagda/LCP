// import React from 'react';
// import Header from './components/Header/Header';
// import HeroSection from './components/HeroSection/HeroSection';
// import Ad from './components/Ad/Ad';
// import Footer from './components/Footer/Footer';
// import FloatingButton from './components/FloatingButton/FloatingButton';

// const LandingPage = () => {
//   return (
//     <div>
//       <Header /> 
//       <HeroSection />
//       <FloatingButton />
//       <Ad />
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;


import React, { useRef } from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import Ad from './components/Ad/Ad';
import Footer from './components/Footer/Footer';
import FloatingButton from './components/FloatingButton/FloatingButton';

const LandingPage = () => {
  const propertyListingRef = useRef(null);

  const scrollToPropertyListing = () => {
    if (propertyListingRef.current) {
      propertyListingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header />
      <HeroSection scrollToPropertyListing={scrollToPropertyListing} />
      <FloatingButton />
      <div ref={propertyListingRef}>
        <Ad />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;