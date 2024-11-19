// import React, { useState } from 'react';
// import './VaastuConsultant.css';
// import tanisha from './tanisha.jpg';
// import VaastuBot from './VaastuBot'; // Import VaastuBot component
// import { IoCloseSharp } from "react-icons/io5";

// // Import your new images here
// import image1 from './image1.jpeg'; // Placeholder for Vaastu diagram
// import image2 from './Image2.jpeg'; // Placeholder for Elements of Nature
// import image3 from './image3.jpeg'; // Placeholder for Traditional Indian Architecture
// import image4 from './image4.jpeg'; // Placeholder for Vaastu Symbols

// const VaastuConsultant = () => {
//   const [isBotVisible, setIsBotVisible] = useState(false); // State for showing/hiding VaastuBot

//   const handleGetStarted = () => {
//     alert("We will start this service soon")  };

//   const handleCloseBot = () => {
//     setIsBotVisible(false); // Hide VaastuBot
//   };

//   return (
//     <div className="vastu-consultant">
//       {/* Hero Section */}
//       <section className="hero">
//         <h1 className="hero-headline">Transform Your Space with Vastu Shastra</h1>
//         <p className="hero-subheadline">Expert Vastu Consultation to Harmonize Your Living and Working Environments</p>
//         <button className="hero-cta" onClick={handleGetStarted} >Get Started</button>
        
//       </section>

//       {/* Introduction */}
//       <section className="introduction">
//         <h2>Unlock the Power of Vastu Shastra</h2>
//         <p>Vastu Shastra is an ancient Indian science of architecture that harmonizes your space with natural energies. Our expert consultation helps you align your home or office according to these principles to enhance prosperity, health, and well-being.</p>
        
//         {/* Updated Image Section */}
//         <div className="intro-images-container">
//           <img src={image1} alt="Vaastu diagram" className="intro-image" />
//           <img src={image2} alt="Elements of nature" className="intro-image" />
//         </div>
//       </section>

//       {/* Services Offered */}
//       <section className="services">
//         <h2>Our Vastu Services</h2>
//         <div className="service-list">
//           <div className="service-item">
//             <h3>Residential Vastu Consultation</h3>
//             <p>Analyze your home's layout to optimize energy flow and ensure harmony in your living space.</p>
//           </div>
//           <div className="service-item">
//             <h3>Commercial Vastu Analysis</h3>
//             <p>Evaluate your office or business premises to create a balanced and prosperous environment.</p>
//           </div>
//           <div className="service-item">
//             <h3>Site Selection</h3>
//             <p>Identify the most auspicious location for your new home or office based on Vastu principles.</p>
//           </div>
//           <div className="service-item">
//             <h3>Vastu Remedies</h3>
//             <p>Receive customized solutions to address any Vastu imbalances in your space.</p>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="how-it-works">
//         <h2>How Our Vastu Consultation Works</h2>
//         <div className="process-steps">
//           <div className="step">
//             <h3>Initial Assessment</h3>
//             <p>Provide details about your space and concerns.</p>
//           </div>
//           <div className="step">
//             <h3>Site Visit</h3>
//             <p>Our expert will visit your site to analyze Vastu compliance.</p>
//           </div>
//           <div className="step">
//             <h3>Customized Recommendations</h3>
//             <p>Receive a tailored report with actionable improvements.</p>
//           </div>
//           <div className="step">
//             <h3>Implementation Support</h3>
//             <p>Get guidance on implementing the suggested changes.</p>
//           </div>
//         </div>
//         {/* Image 3: Traditional Indian Architecture */}
//         <img src={image4} alt="Traditional Indian architecture" className="how-it-works-image" />
//       </section>

//       {/* Benefits of Vastu Consultation */}
//       <section className="benefits">
//         <h2>The Benefits of Vastu Consultation</h2>
//         <div className="benefit-list">
//           <div className="benefit-item">
//             <h3>Enhance Well-being</h3>
//             <p>Improve mental and physical health through balanced energy.</p>
//           </div>
//           <div className="benefit-item">
//             <h3>Boost Prosperity</h3>
//             <p>Align your environment with success and abundance.</p>
//           </div>
//           <div className="benefit-item">
//             <h3>Strengthen Relationships</h3>
//             <p>Foster harmony and positive interactions within your space.</p>
//           </div>
//         </div>
//         {/* Image 4: Vaastu Symbols */}
//         <img src={image3} alt="Vaastu symbols" className="benefits-image" />
//       </section>

//       {/* Testimonials */}
//       <section className="testimonials">
//         <h2>What Our Clients Say</h2>
//         <div className="testimonial-list">
//           <div className="testimonial-item">
//             <p>"The Vastu consultation transformed our home environment. We've noticed a significant improvement in our family's well-being and financial stability."</p>
//             <div className="testimonial-author">
//               <img src={tanisha} alt="Tanisha" />
//               <span>Tanisha</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact */}
//       <section className="contact">
//         <h2>Get in Touch</h2>
//         <div className="contact-info">
//           <p>Phone: 6367426746</p>
//           <p>Email: chetan23rd@gmail.com</p>
//           <p>Address: 123 Mali Colony, Udaipur</p>
//         </div>
//         <button className="contact-cta">Schedule a Consultation</button>
//       </section>

//       {/* VaastuBot Modal */}
//       {isBotVisible && (
//         <div className="vaastu-bot-modal">
//           <div className="vaastu-bot-overlay" onClick={handleCloseBot}></div>
//           <div className="vaastu-bot-content">
//             <button className="vaastu-bot-close" onClick={handleCloseBot}><IoCloseSharp /></button>
//             <VaastuBot /> {/* Render the VaastuBot component */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VaastuConsultant;

import React, { useState } from 'react';
import './VaastuConsultant.css';
import { IoCloseSharp } from "react-icons/io5";
import VaastuBot from './VaastuBot';

const VaastuConsultant = () => {
  const [isBotVisible, setIsBotVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleGetStarted = () => {
    alert("We will start this service soon");
  };

  const handleCloseBot = () => {
    setIsBotVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry. We will get back to you soon!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="vaastu-consultant">
      <header className="vaastu-hero">
        <h1>Transform Your Space with Vastu Shastra</h1>
        <p>Expert Vastu Consultation to Harmonize Your Living and Working Environments</p>
        <button className="vaastu-button" onClick={handleGetStarted}>Get Started</button>
      </header>

      <section className="vaastu-introduction">
        <h2>Unlock the Power of Vastu Shastra</h2>
        <p>Vastu Shastra is an ancient Indian science of architecture that harmonizes your space with natural energies. Our expert consultation helps you align your home or office according to these principles to enhance prosperity, health, and well-being.</p>
        <div className="vaastu-intro-images">
          <img src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Vastu-inspired architecture" />
          <img src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Harmonious living space" />
        </div>
      </section>

      <section className="vaastu-services">
        <h2>Our Vastu Services</h2>
        <div className="vaastu-service-grid">
          <div className="vaastu-service-item">
            <img src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Residential Vastu" />
            <h3>Residential Vastu</h3>
            <p>Optimize energy flow in your home</p>
          </div>
          <div className="vaastu-service-item">
            <img src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Commercial Vastu" />
            <h3>Commercial Vastu</h3>
            <p>Create a balanced business environment</p>
          </div>
          <div className="vaastu-service-item">
            <img src="https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Site Selection" />
            <h3>Site Selection</h3>
            <p>Find the most auspicious location</p>
          </div>
          <div className="vaastu-service-item">
            <img src="https://images.pexels.com/photos/3255245/pexels-photo-3255245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Vastu Remedies" />
            <h3>Vastu Remedies</h3>
            <p>Address imbalances in your space</p>
          </div>
        </div>
      </section>

      <section className="vaastu-process">
        <h2>Our Consultation Process</h2>
        <div className="vaastu-process-steps">
          <div className="vaastu-step">
            <h3>1. Assessment</h3>
            <p>Provide details about your space</p>
          </div>
          <div className="vaastu-step">
            <h3>2. Site Visit</h3>
            <p>Expert analysis of your property</p>
          </div>
          <div className="vaastu-step">
            <h3>3. Recommendations</h3>
            <p>Receive a tailored Vastu report</p>
          </div>
          <div className="vaastu-step">
            <h3>4. Implementation</h3>
            <p>Guidance on applying changes</p>
          </div>
        </div>
      </section>

      <section className="vaastu-benefits">
        <h2>Benefits of Vastu Consultation</h2>
        <div className="vaastu-benefit-grid">
          <div className="vaastu-benefit-item">
            <img src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Enhanced Well-being" />
            <h3>Enhanced Well-being</h3>
            <p>Improve mental and physical health</p>
          </div>
          <div className="vaastu-benefit-item">
            <img src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Increased Prosperity" />
            <h3>Increased Prosperity</h3>
            <p>Align your space with success</p>
          </div>
          <div className="vaastu-benefit-item">
            <img src="https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Harmonious Relationships" />
            <h3>Harmonious Relationships</h3>
            <p>Foster positive interactions</p>
          </div>
        </div>
      </section>

      <section className="vaastu-testimonial">
        <h2>What Our Clients Say</h2>
        <blockquote>
          "The Vastu consultation transformed our home environment. We've noticed a significant improvement in our family's well-being and financial stability."
        </blockquote>
        <cite>- Tanisha, Homeowner</cite>
      </section>

      <section className="vaastu-contact">
        <h2>Schedule a Consultation</h2>
        <form className="vaastu-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="vaastu-button" type="submit">Send Inquiry</button>
        </form>
      </section>

      <footer className="vaastu-footer">
        <p>Phone: 6367426746</p>
        <p>Email: chetan23rd@gmail.com</p>
        <p>Address: 123 Mali Colony, Udaipur</p>
      </footer>

      {isBotVisible && (
        <div className="vaastu-bot-modal">
          <div className="vaastu-bot-overlay" onClick={handleCloseBot}></div>
          <div className="vaastu-bot-content">
            <button className="vaastu-bot-close" onClick={handleCloseBot}><IoCloseSharp /></button>
            <VaastuBot />
          </div>
        </div>
      )}
    </div>
  );
};

export default VaastuConsultant;