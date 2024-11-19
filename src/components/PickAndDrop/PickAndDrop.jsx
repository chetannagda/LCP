import React, { useState, useRef, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase config
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import './PickAndDrop.css';

export default function PickAndDrop() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    pickupAddress: '',
    pickupDate: '',
    dropoffAddress: '',
    itemDescription: ''
  });

  const [testimonial, setTestimonial] = useState({
    name: '',
    message: ''
  });

  const [testimonials, setTestimonials] = useState([
    { name: 'Himank', message: '"Excellent service! My items were picked up and delivered on time."' },
    { name: 'Chetan', message: '"Very professional team. Will use again!"' }
  ]);

  const [showTruckAnimation, setShowTruckAnimation] = useState(false);
  const buttonRef = useRef(null);
  const formRef = useRef(null);
  const truckRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "PickandDropRequests"), formData);
      console.log("Pickup request submitted:", formData);
      setFormData({
        name: '',
        contact: '',
        pickupAddress: '',
        pickupDate: '',
        dropoffAddress: '',
        itemDescription: ''
      });
    } catch (error) {
      console.error("Error submitting pickup request: ", error);
    }
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    if (testimonial.name && testimonial.message) {
      setTestimonials([...testimonials, testimonial]);
      setTestimonial({ name: '', message: '' });
    }
  };

  const scrollToPickupForm = () => {
    setShowTruckAnimation(true);
    const pickupFormSection = document.getElementById('pickup-form');
    if (pickupFormSection) {
      pickupFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (showTruckAnimation && buttonRef.current && formRef.current && truckRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const formRect = formRef.current.getBoundingClientRect();

      const startX = buttonRect.left - 64;
      const startY = buttonRect.top + buttonRect.height / 2 - 32;
      const midX = buttonRect.left + buttonRect.width / 2;
      const midY = window.innerHeight / 2;
      const endX = formRect.left + formRect.width / 2 - 32;
      const endY = formRect.top - 64;

      truckRef.current.style.left = `${startX}px`;
      truckRef.current.style.top = `${startY}px`;
      truckRef.current.style.display = 'block';

      const animationDuration = 4000;
      const startTime = Date.now();

      const animateTruck = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        if (progress < 1) {
          let x, y;
          if (progress < 0.7) {
            x = startX + (midX - startX) * (progress / 0.7);
            y = startY + (midY - startY) * Math.sin((progress / 0.7) * Math.PI);
          } else {
            const lateProgress = (progress - 0.7) / 0.3;
            x = midX + (endX - midX) * lateProgress;
            y = midY + (endY - midY) * lateProgress;
          }

          truckRef.current.style.left = `${x}px`;
          truckRef.current.style.top = `${y}px`;
          truckRef.current.style.transform = `rotate(${Math.sin(progress * Math.PI * 2) * 10}deg) scale(${1 + Math.sin(progress * Math.PI) * 0.1})`;
          truckRef.current.style.opacity = progress > 0.9 ? 1 - (progress - 0.9) * 10 : 1;

          requestAnimationFrame(animateTruck);
        } else {
          truckRef.current.style.display = 'none';
          setShowTruckAnimation(false);
        }
      };

      requestAnimationFrame(animateTruck);
    }
  }, [showTruckAnimation]);

  return (
    <div className="pad-pick-and-drop">
      <section className="pad-hero">
        <div className="pad-hero-content">
          <h1>Hassle-Free Pick and Drop Service</h1>
          <p>We help you move items safely and efficiently, from pickup to drop-off.</p>
          <button className="pad-button" ref={buttonRef} onClick={scrollToPickupForm}>Book a Pickup</button>
        </div>
      </section>

      {showTruckAnimation && (
        <div ref={truckRef} className="pad-truck-icon">
          🚚
        </div>
      )}

      <section className="pad-how-it-works">
        <h2>How It Works</h2>
        <div className="pad-steps">
          {[
            { icon: '📅', title: 'Schedule Pickup', description: 'Book online and select your pickup time.' },
            { icon: '🚚', title: 'We Pick Up', description: 'Our team will pack and collect your items.' },
            { icon: '📍', title: 'Drop-Off', description: 'Safe delivery to your destination.' }
          ].map((step, index) => (
            <div key={index} className="pad-step">
              <div className="pad-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pad-pricing-timing">
        <h2>Pricing & Timing</h2>
        <div className="pad-pricing-timing-content">
          <div className="pad-pricing">
            <h3>Pricing Options</h3>
            <ul>
              <li>📦 Local Delivery: ₹500 - ₹1,000</li>
              <li>🚚 Long Distance: ₹1,500 - ₹2,500</li>
              <li>⭐ Express Service: Additional ₹2,500</li>
            </ul>
          </div>
          <div className="pad-timing">
            <h3>Delivery Timing</h3>
            <ul>
              <li>📅 Express: 2-4 hours</li>
              <li>📅 Same Day: 6-8 hours</li>
              <li>📅 Scheduled: You choose the date</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="pickup-form" className="pad-pickup-form">
        <h2>Request a Pickup</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="pad-form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact No."
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="text"
            name="pickupAddress"
            placeholder="Pickup Address"
            value={formData.pickupAddress}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="dropoffAddress"
            placeholder="Drop-off Address"
            value={formData.dropoffAddress}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="itemDescription"
            placeholder="Item Description (Optional)"
            value={formData.itemDescription}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">Submit Request</button>
        </form>
      </section>

      <section className="pad-testimonials">
  <h2>Customer Testimonials</h2>
  <div className="pad-testimonial-list">
    {testimonials.map((testimonial, index) => (
      <div key={index} className="pad-testimonial">
        <p>{testimonial.message}</p>
        <div className="pad-testimonial-name">- {testimonial.name}</div>
      </div>
    ))}
  </div>
  <h3>Submit Your Testimonial</h3>
  <form onSubmit={handleTestimonialSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      value={testimonial.name}
      onChange={handleTestimonialChange}
      required
    />
    <textarea
      name="message"
      placeholder="Your Testimonial"
      value={testimonial.message}
      onChange={handleTestimonialChange}
      required
    ></textarea>
    <button type="submit">Submit Testimonial</button>
  </form>
</section>
    </div>
  );
}
