import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './PropertyRepairServices.css';

const PropertyRepairServices = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'PropertyRepairInquiries'), {
        name,
        contactNumber,
        service: selectedService,
        message,
        timestamp: new Date(),
      });
      setName('');
      setContactNumber('');
      setSelectedService('');
      setMessage('');
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

  return (
    <div className="prs-container">
      <header className="prs-header">
        <h1 className="prs-title">Expert Property Repair Services</h1>
        <p className="prs-subtitle">Your one-stop solution for all property repairs</p>
      </header>

      <section className="prs-services">
        <div className="prs-service-card">
          <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="Painting" className="prs-service-image" />
          <h2 className="prs-service-title">Painting</h2>
          <p className="prs-service-description">Transform your space with our expert painting services</p>
        </div>
        <div className="prs-service-card">
          <img src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="Lime Work" className="prs-service-image" />
          <h2 className="prs-service-title">Lime Work</h2>
          <p className="prs-service-description">Durable and beautiful finishes with our lime work expertise</p>
        </div>
        <div className="prs-service-card">
          <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80" alt="POP" className="prs-service-image" />
          <h2 className="prs-service-title">POP (Plaster of Paris)</h2>
          <p className="prs-service-description">Enhance aesthetics with our high-quality POP work</p>
        </div>
        <div className="prs-service-card">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="Marble Work" className="prs-service-image" />
          <h2 className="prs-service-title">Marble Work</h2>
          <p className="prs-service-description">Add a touch of luxury with our skilled marble work</p>
        </div>
      </section>

      <section className="prs-process">
        <h2 className="prs-section-title">Our Process</h2>
        <div className="prs-process-steps">
          <div className="prs-process-step">
            <div className="prs-step-number">1</div>
            <h3 className="prs-step-title">Consultation</h3>
            <p className="prs-step-description">We discuss your needs and provide expert advice</p>
          </div>
          <div className="prs-process-step">
            <div className="prs-step-number">2</div>
            <h3 className="prs-step-title">Planning</h3>
            <p className="prs-step-description">We create a detailed plan tailored to your project</p>
          </div>
          <div className="prs-process-step">
            <div className="prs-step-number">3</div>
            <h3 className="prs-step-title">Execution</h3>
            <p className="prs-step-description">Our skilled team carries out the work efficiently</p>
          </div>
          <div className="prs-process-step">
            <div className="prs-step-number">4</div>
            <h3 className="prs-step-title">Quality Check</h3>
            <p className="prs-step-description">We ensure the highest standards in our work</p>
          </div>
        </div>
      </section>

      <section className="prs-testimonials">
        <h2 className="prs-section-title">What Our Clients Say</h2>
        <div className="prs-testimonial-container">
          <div className="prs-testimonial">
            <p className="prs-testimonial-text">"Exceptional service! They transformed our home beautifully."</p>
            <p className="prs-testimonial-author">- Chetan Nagda</p>
          </div>
          <div className="prs-testimonial">
            <p className="prs-testimonial-text">"Professional, timely, and outstanding results. Highly recommend!"</p>
            <p className="prs-testimonial-author">- Himank Lohar</p>
          </div>
        </div>
      </section>

      <section className="prs-inquiry-form">
        <h2 className="prs-section-title">Get a Free Quote</h2>
        {success && <p className="prs-success-message">Your message has been submitted successfully!</p>}
        <form onSubmit={handleSubmit} className="prs-form">
          <div className="prs-form-group">
            <label htmlFor="name" className="prs-form-label">Name:</label>
            <input
              type="text"
              id="name"
              className="prs-form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="prs-form-group">
            <label htmlFor="contactNumber" className="prs-form-label">Contact No.:</label>
            <input
              type="tel"
              id="contactNumber"
              className="prs-form-input"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
              required
            />
          </div>
          <div className="prs-form-group">
            <label htmlFor="service" className="prs-form-label">Select a Service:</label>
            <select
              id="service"
              className="prs-form-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="">--Please choose an option--</option>
              <option value="House Painting">House Painting</option>
              <option value="Lime Wash">Lime Wash</option>
              <option value="POP">POP</option>
              <option value="Marble Work">Marble Work</option>
              <option value="Electrical Work">Electrical Work</option>
            </select>
          </div>
          <div className="prs-form-group">
            <label htmlFor="message" className="prs-form-label">Message:</label>
            <textarea
              id="message"
              className="prs-form-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="prs-submit-button">Get Quote</button>
        </form>
      </section>

      <footer className="prs-footer">
        <p>&copy; 2023 Property Repair Services. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PropertyRepairServices;