import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PropertyListingPage from './components/listing_page_by_user/PropertyListingPage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import Adviewpage from './components/ad_view_temp/AdViewPage';
import LandingPage from './components/LandingPage/LandingPage';
import Header from './components/LandingPage/components/Header/Header';
// import HeroSection from './components/LandingPage/components/HeroSection/HeroSection';
// import SubHero from './components/LandingPage/components/SubHero/SubHero';
// import PropertyAd from './components/LandingPage/PropertyAd/PropertyAd';
import Ad from './components/LandingPage/components/Ad/Ad';
// import Footer from './components/LandingPage/components/Footer/Footer';
// import SaveApp from './components/SavePage/SaveApp';
// import Messagebox from './components/Message/MessageBox';
// import Message from './components/Message/Message';
import Consultancy from './components/ConsultancyBot/Consultancy';
import OpenForum from './components/Open Forum/OpenForum';
// import SearchResultPage from './components/Search/SearchResultPage';
import Check from './components/Check/Check';
import PickAndDrop from './components/PickAndDrop/PickAndDrop';
import VaastuConsultant from './components/VaastuConsultant/VaastuConsultant';
import VaastuBot from './components/VaastuConsultant/VaastuBot';
import PropertyConsult from './components/ConsultancyBot/PropertyConsult';
import PropertyRepairServices from './components/PropertyRepairServices/PropertyRepairServices';
import AdminPickandDrop from './components/Admin/AdminPickAndDrop/AdminPickAndDrop';
import AdminPropertyRepairPage from './components/Admin/AdminPropertyRepair/AdminPropertyRepairPage';
import Testcase from './components/testcase/testcase';

// import ErrorBoundary from './components/UserProfilePage/ErrorBoundary';

function App() {
  return (
      // <ErrorBoundary>
    <Router>
    <switch>
       {/* <Header /> */}
      {/* <main style={{ padding: '10px' }}> Added padding to main content */}
        <Routes>
          <Route path="/" element={<Check />} />
          <Route path="/check" element={<Check />} />
          <Route path="/test" element={<Testcase />} />

          <Route path="/header" element={<Header />}/>
          <Route path="/listproperty" element={<PropertyListingPage />}/>
          
          <Route path="/userprofile" element={<UserProfilePage />} />
          
          {/*<Route path="/message" element={<Message />} />
          <Route path="/messagebox" element={<Messagebox />} />
          <Route path="/save" element={<SaveApp />} />*/}
          <Route path="/forum" element={<OpenForum />} />
          <Route path="/landingpage" element={<LandingPage />} />
         <Route path="/" element={<Navigate to="/landingpage" />} />
          {/* <Route path="/adviewpage" element={<AdViewPage />} /> */}
          {/* <Route path="/property/:id" component={Adviewpage} /> */}
          <Route path="/property/:id" element={<Adviewpage />} />
          {/* <Route path="/floatbutton" element={<FloatingButton />} /> */}
           <Route path="/consult" element={<Consultancy />} />
          <Route path="/propertyconsult" element={<PropertyConsult />} />
          <Route path="/vaastubot" element={<VaastuBot />} />
          {/*<Route path="/herosection" element={<HeroSection />} />
          <Route path="/subhero" element={<SubHero />} />*/}
          <Route path="/ad" element={<Ad />} />
          <Route path="/apad" element={<AdminPickandDrop />} />
          <Route path="/aprp" element={<AdminPropertyRepairPage />} />
          <Route path="/pad" element={<PickAndDrop />} />
          <Route path="/repair" element={<PropertyRepairServices />} />
          <Route path="/vaastu" element={<VaastuConsultant />} />
          {/*<Route path="/footer" element={<Footer />} />
          <Route path="/search" element={<SearchResultPage />} /> */}
        </Routes>
      {/* </main> */}
      {/* <Footer />  Uncomment if you want the footer to be included on all routes */}
      </switch>
    </Router>
    // </ErrorBoundary>
  );
}

export default App;