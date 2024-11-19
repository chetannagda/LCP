// import React, { useState } from 'react';
// import './PropertyConsult.css';
// import LandLawPDF from './LandLaw.pdf'; // Import the PDF file
// import ClientImage from './assets/images/Clientimage.png'; // Import the client image
// import PdfPreviewImage from './assets/images/PdfPreviewImage.png'; // Import the PDF preview image
// import Consultancy from './Consultancy'; // Import the ConsultantBot component
// import { db } from '../../firebase'; // Import Firestore config
// import { collection, addDoc } from "firebase/firestore"; // Firestore functions

// function PropertyConsult() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [isBotOpen, setIsBotOpen] = useState(false); // State for bot visibility
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false); // Form submission state
//   const [submitMessage, setSubmitMessage] = useState(''); // To display form submission status

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const faqs = [
//     { question: "How do I resolve a boundary dispute?", answer: "Contact our experts for assistance in resolving boundary disputes." },
//     { question: "What documents are needed for title transfer?", answer: "Consult our experts to understand the required documents for title transfer." },
//     { question: "What are the common property disputes?", answer: "Common property disputes include boundary disputes, ownership disputes, and inheritance issues." },
//     { question: "How long does a property dispute resolution take?", answer: "The duration varies depending on the complexity of the case and the court's schedule." },
//     { question: "Can I handle property disputes without legal assistance?", answer: "While possible, it's recommended to seek legal assistance for a more effective resolution." },
//     { question: "What is the process for land registration?", answer: "The process involves verification of documents, submission to authorities, and receiving the registration certificate." },
//     { question: "How can I verify the ownership of a property?", answer: "Verification can be done through legal documents, land records, and consulting with our experts." },
//     { question: "What is a title transfer?", answer: "A title transfer is the legal process of changing the ownership of a property from one person to another." },
//     { question: "How can I prevent property fraud?", answer: "Ensure thorough verification of documents and consult with legal experts before proceeding with property transactions." },
//     { question: "What should I do if I receive a legal notice regarding property?", answer: "Consult with our legal team immediately to understand the implications and plan an appropriate response." },
//   ];

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       // Save contact form data to Firestore
//       await addDoc(collection(db, "PropertyConsultations"), {
//         name: formData.name,
//         phone: formData.phone,
//         message: formData.message,
//         timestamp: new Date() // Add a timestamp
//       });
//       setSubmitMessage("Form submitted successfully!");
//       setFormData({ name: '', phone: '', message: '' }); // Clear the form
//     } catch (error) {
//       console.error("Error submitting form: ", error);
//       setSubmitMessage("Failed to submit form. Please try again.");
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="propertyconsult-App">
//       <header className="propertyconsult-header">
//         <h1>Property & Land Consultation</h1>
//         <p>Expert guidance on property and land, along with essential legal resources.</p>
//       </header>

//       <section className="propertyconsult-introductory-section">
//         <p>Welcome to our Property & Land Consultation services. Our expert team provides comprehensive guidance to help you navigate through complex property and land disputes. Benefit from our expert advice to ensure your legal rights are protected.</p>
//         <ul>
//           <li>Property resolution</li>
//           <li>Legal document review</li>
//           <li>Land registration issues</li>
//           <li>Expert consultations</li>
//         </ul>
//         <button className="propertyconsult-cta-button" onClick={() => setIsBotOpen(true)}>Connect With Our Consultant</button>
//       </section>

//       <section className="propertyconsult-consultation-services-section">
//         <div className="propertyconsult-service-card">
//           <h3>Land Resolution</h3>
//           <p>Expert assistance in resolving land disputes efficiently.</p>
//         </div>
//         <div className="propertyconsult-service-card">
//           <h3>Property Ownership Verification</h3>
//           <p>Verify property ownership with our comprehensive services.</p>
//         </div>
//         <div className="propertyconsult-service-card">
//           <h3>Title Transfer Guidance</h3>
//           <p>Guidance on title transfer processes to ensure smooth transactions.</p>
//         </div>
//       </section>

//       <section className="propertyconsult-downloadable-resources-section">
//         <h2>Downloadable Resources</h2>
//         <p>Download our informative PDF containing Indian property laws and regulations.</p>
//         <a href={LandLawPDF} download="Indian_Property_Laws_and_Regulations.pdf">
//           <button className="propertyconsult-download-button">Download PDF - Indian Property Laws & Regulations (PDF, 8MB)</button>
//         </a>
//         <img src={PdfPreviewImage} alt="PDF Preview" className="propertyconsult-pdf-preview" />
//       </section>

//       <section className="propertyconsult-faq-section">
//         <h2>Frequently Asked Questions</h2>
//         {faqs.map((faq, index) => (
//           <div className="propertyconsult-faq-item" key={index}>
//             <h4 onClick={() => toggleFAQ(index)} className="propertyconsult-faq-question">
//               {faq.question}
//             </h4>
//             {openIndex === index && <p className="propertyconsult-faq-answer">{faq.answer}</p>}
//           </div>
//         ))}
//       </section>

//       <section className="propertyconsult-client-testimonials-section">
//         <h2>Client Testimonials</h2>
//         <div className="propertyconsult-testimonial">
//           <img src={ClientImage} alt="Client" className="propertyconsult-client-image" />
//           <p>"The consultation service was excellent and helped me resolve my property dispute efficiently." - <strong>Gaurav Sharma</strong></p>
//         </div>
//       </section>

//       <section className="propertyconsult-contact-section">
//         <h2>Contact Us</h2>
//         <form className="propertyconsult-contact-form" onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Phone:
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Your Phone Number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Message:
//             <textarea
//               name="message"
//               placeholder="Your Message"
//               value={formData.message}
//               onChange={handleInputChange}
//               required
//             ></textarea>
//           </label>
//           <button type="submit" className="propertyconsult-submit-button" disabled={isSubmitting}>
//             {isSubmitting ? 'Submitting...' : 'Send'}
//           </button>
//           {submitMessage && <p>{submitMessage}</p>}
//         </form>
//         <p>Or reach us directly:</p>
//         <p><strong>Phone:</strong> 6367426746</p>
//         <p><strong>Email:</strong> <a href="mailto:chetan23rd@gmail.com">chetan23rd@gmail.com</a></p>
//       </section>

//       <footer className="propertyconsult-footer">
//         <div className="propertyconsult-footer-content">
//           <div className="propertyconsult-footer-about">
//             <h3>About Us</h3>
//             <p>Providing expert legal consultation on property and land disputes. Our team is committed to delivering reliable solutions and guidance tailored to your needs.</p>
//           </div>
//           <div className="propertyconsult-footer-contact">
//             <h3>Contact Us</h3>
//             <p><strong>Phone:</strong> 636742676</p>
//             <p><strong>Email:</strong> <a href="mailto:chetan23rd@gmail.com">chetan23rd@gmail.com</a></p>
//             <p><strong>Address:</strong>Mali Colony, Udaipur, Rajasthan</p>
//           </div>
//           <div className="propertyconsult-footer-links">
//             <h3>Quick Links</h3>
//             <ul>
//               <li><a href="#home">Home</a></li>
//               <li><a href="#services">Services</a></li>
//               <li><a href="#contact">Contact</a></li>
//             </ul>
//           </div>
//         </div>
//         <div className="propertyconsult-footer-bottom">
//           <p>&copy; 2023 Property & Land Consultation. All rights reserved.</p>
//         </div>
//       </footer>

//       {isBotOpen && <Consultancy onClose={() => setIsBotOpen(false)} />} {/* Bot popup */}
//     </div>
//   );
// }

// export default PropertyConsult;


import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import LandLawPDF from './LandLaw.pdf';
import Consultancy from './Consultancy';
import PdfPreviewImage from './assets/images/PdfPreviewImage.png'
import './PropertyConsult.css';

const PropertyConsult = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "PropertyConsultations"), {
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date()
      });
      setSubmitMessage("Form submitted successfully!");
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSubmitMessage("Failed to submit form. Please try again.");
    }
    setIsSubmitting(false);
  };

  const faqs = [
    { question: "How do I resolve a boundary dispute?", answer: "Contact our experts for assistance in resolving boundary disputes." },
    { question: "What documents are needed for title transfer?", answer: "Consult our experts to understand the required documents for title transfer." },
    { question: "What are the common property disputes?", answer: "Common property disputes include boundary disputes, ownership disputes, and inheritance issues." },
    { question: "How long does a property dispute resolution take?", answer: "The duration varies depending on the complexity of the case and the court's schedule." },
    { question: "Can I handle property disputes without legal assistance?", answer: "While possible, it's recommended to seek legal assistance for a more effective resolution." },
    { question: "What is the process for land registration?", answer: "The process involves verification of documents, submission to authorities, and receiving the registration certificate." },
    { question: "How can I verify the ownership of a property?", answer: "Verification can be done through legal documents, land records, and consulting with our experts." },
    { question: "What is a title transfer?", answer: "A title transfer is the legal process of changing the ownership of a property from one person to another." },
    { question: "How can I prevent property fraud?", answer: "Ensure thorough verification of documents and consult with legal experts before proceeding with property transactions." },
    { question: "What should I do if I receive a legal notice regarding property?", answer: "Consult with our legal team immediately to understand the implications and plan an appropriate response." },
  ];

  return (
    <div className="property-consult">
      <header className="header">
        <h1>Property & Land Consultation</h1>
        <p>Expert guidance on property and land, along with essential legal resources.</p>
      </header>

      <main>
        <section className="introductory-section">
          <div className="content">
            <h2>Welcome to Our Property & Land Consultation Services</h2>
            <p>Our expert team provides comprehensive guidance to help you navigate through complex property and land disputes. Benefit from our expert advice to ensure your legal rights are protected.</p>
            <ul>
              <li>Property resolution</li>
              <li>Legal document review</li>
              <li>Land registration issues</li>
              <li>Expert consultations</li>
            </ul>
            <button className="cta-button" onClick={() => setIsBotOpen(true)}>Connect With Our Consultant</button>
          </div>
          <div className="image-container">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80" alt="Property Consultation" className="intro-image" />
          </div>
        </section>

        <section className="consultation-services-section">
          <h2>Our Services</h2>
          <div className="service-grid">
            <div className="service-card">
              <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="Land Resolution" className="service-image" />
              <h3>Land Resolution</h3>
              <p>Expert assistance in resolving land disputes efficiently.</p>
            </div>
            <div className="service-card">
              <img src="https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" alt="Property Ownership Verification" className="service-image" />
              <h3>Property Ownership Verification</h3>
              <p>Verify property ownership with our comprehensive services.</p>
            </div>
            <div className="service-card">
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Title Transfer Guidance" className="service-image" />
              <h3>Title Transfer Guidance</h3>
              <p>Guidance on title transfer processes to ensure smooth transactions.</p>
            </div>
          </div>
        </section>

        <section className="downloadable-resources-section">
          <h2>Downloadable Resources</h2>
          <div className="resource-content">
            <div className="pdf-preview">
              <img src={PdfPreviewImage} alt="PDF Preview" className="pdf-image" />
            </div>
            <div className="download-content">
              <p>Download our informative PDF containing Indian property laws and regulations.</p>
              <a href={LandLawPDF} download="Indian_Property_Laws_and_Regulations.pdf">
                <button className="download-button">Download PDF - Indian Property Laws & Regulations (PDF, 8MB)</button>
              </a>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <h4 onClick={() => toggleFAQ(index)} className="faq-question">
                {faq.question}
              </h4>
              {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </section>

        <section className="client-testimonials-section">
          <h2>Client Testimonials</h2>
          <div className="testimonial">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Client" className="client-image" />
            <p>"The consultation service was excellent and helped me resolve my property dispute efficiently." - <strong>Gaurav Sharma</strong></p>
          </div>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Message:
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </label>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Send'}
              </button>
              {submitMessage && <p className="submit-message">{submitMessage}</p>}
            </form>
            <div className="contact-info">
              <h3>Reach Us Directly</h3>
              <p><strong>Phone:</strong> 6367426746</p>
              <p><strong>Email:</strong> <a href="mailto:chetan23rd@gmail.com">chetan23rd@gmail.com</a></p>
              <p><strong>Address:</strong> Mali Colony, Udaipur, Rajasthan</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-about">
            <h3>About Us</h3>
            <p>Providing expert legal consultation on property and land disputes. Our team is committed to delivering reliable solutions and guidance tailored to your needs.</p>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><strong>Phone:</strong> 636742676</p>
            <p><strong>Email:</strong> <a href="mailto:chetan23rd@gmail.com">chetan23rd@gmail.com</a></p>
            <p><strong>Address:</strong> Mali Colony, Udaipur, Rajasthan</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Property & Land Consultation. All rights reserved.</p>
        </div>
      </footer>

      {isBotOpen && <Consultancy onClose={() => setIsBotOpen(false)} />}
    </div>
  );
};

export default PropertyConsult;