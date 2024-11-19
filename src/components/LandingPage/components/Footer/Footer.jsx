// import React, { useState } from 'react';

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add subscription logic here
//     console.log('Subscribed with email:', email);
//     setSubscribed(true);
//     setEmail('');
//     setTimeout(() => setSubscribed(false), 3000); // Hide thank you message after 3 seconds
//   };

//   return (
//     <footer style={styles.footer}>
//       <div style={styles.container}>
//         <div style={styles.topSection}>
//           <form onSubmit={handleSubmit} style={styles.subscribeForm}>
//             {!subscribed ? (
//               <>
//                 <input 
//                   type="email" 
//                   placeholder="Enter your email" 
//                   style={styles.input} 
//                   required 
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button type="submit" style={styles.button}>
//                   <span style={styles.buttonText}>Subscribe Now</span>
//                 </button>
//               </>
//             ) : (
//               <div style={styles.thankYouMessage}>Thank you for subscribing!</div>
//             )}
//           </form>
//           <div style={styles.socialIcons}>
//             <a href="#" style={styles.iconLink}><i className="fab fa-facebook-f"></i></a>
//             <a href="#" style={styles.iconLink}><i className="fab fa-twitter"></i></a>
//             <a href="#" style={styles.iconLink}><i className="fab fa-instagram"></i></a>
//             <a href="#" style={styles.iconLink}><i className="fab fa-linkedin-in"></i></a>
//           </div>
//         </div>
        
//         <div style={styles.middleSection}>
//           <div style={styles.column}>
//             <h3 style={styles.columnTitle}>About Us</h3>
//             <p style={styles.columnText}>We are a leading real estate company providing comprehensive property solutions and consultancy services.</p>
//           </div>
//           <div style={styles.column}>
//             <h3 style={styles.columnTitle}>Our Services</h3>
//             <ul style={styles.list}>
//               <li style={styles.listItem}><span style={styles.textBackground}>Property Consultant</span></li>
//               <li style={styles.listItem}><span style={styles.textBackground}>Vaastu Consultant</span></li>
//               <li style={styles.listItem}><span style={styles.textBackground}>Pick and Drop</span></li>
//               <li style={styles.listItem}><span style={styles.textBackground}>Property Repair</span></li>
//               <li style={styles.listItem}><span style={styles.textBackground}>Open Forum</span></li>
//             </ul>
//           </div>
//           <div style={styles.column}>
//             <h3 style={styles.columnTitle}>Quick Links</h3>
//             <ul style={styles.list}>
//               <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Home</span></a></li>
//               <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Properties</span></a></li>
//               <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>About Us</span></a></li>
//               <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Contact</span></a></li>
//               <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Privacy Policy</span></a></li>
//             </ul>
//           </div>
//         </div>
        
        
//         <div style={styles.bottomSection}>
//           <p style={styles.copyright}>© 2024 Your Real Estate Company. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const styles = {
//   footer: {
//     backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     padding: '40px 0',
//     color: '#fff',
//     fontFamily: 'Arial, sans-serif',
//     position: 'relative',
//   },
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '0 20px',
//   },
//   topSection: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '30px',
//     flexWrap: 'wrap',
//   },
//   socialIcons: {
//     display: 'flex',
//     gap: '15px',
//   },
//   iconLink: {
//     color: '#fff',
//     fontSize: '24px',
//     textDecoration: 'none',
//     transition: 'color 0.3s ease',
//   },
//   subscribeForm: {
//     display: 'flex',
//     maxWidth: '400px',
//     marginBottom: '20px',
//   },
//   input: {
//     padding: '12px 15px',
//     fontSize: '16px',
//     border: 'none',
//     borderRadius: '25px 0 0 25px',
//     flexGrow: 1,
//     outline: 'none',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     color: 'black',
//     backdropFilter: 'blur(5px)',
//   },
//   button: {
//     padding: '12px 20px',
//     fontSize: '16px',
//     backgroundColor: 'rgba(0, 123, 255, 0.6)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '0 25px 25px 0',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     backdropFilter: 'blur(5px)',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   buttonText: {
//     position: 'relative',
//     zIndex: 1,
//     fontWeight: 'bold',
//   },
//   thankYouMessage: {
//     padding: '12px 20px',
//     fontSize: '16px',
//     color: '#fff',
//     backgroundColor: 'rgba(0, 123, 255, 0.8)',
//     borderRadius: '25px',
//     backdropFilter: 'blur(5px)',
//   },
//   middleSection: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: '30px',
//     flexWrap: 'wrap',
//   },
//   column: {
//     flex: '1',
//     marginRight: '20px',
//     marginBottom: '20px',
//     minWidth: '200px',
//   },
//   columnTitle: {
//     fontSize: '20px',
//     marginBottom: '15px',
//     color: '#fff',
//     textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
//   },
//   columnText: {
//     fontSize: '14px',
//     lineHeight: '1.5',
//   },
//   list: {
//     listStyle: 'none',
//     padding: '0',
//     fontSize: '16px',
//     color: 'grey',
//   },
//   listItem: {
//     marginBottom: '8px',
//   },
//   link: {
//     textDecoration: 'none',
//     transition: 'color 0.3s ease',
//     color: 'grey',
//   },
//   textBackground: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     backdropFilter: 'blur(8px)',
//     padding: '3px 8px',
//     borderRadius: '4px',
//     display: 'inline-block',
//   },
//   bottomSection: {
//     borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//     paddingTop: '20px',
//     textAlign: 'center',
//   },
//   copyright: {
//     fontSize: '14px',
//   },
// };


// // Add this to your component to create the hover effect
// const addButtonHoverEffect = () => {
//   const style = document.createElement('style');
//   style.textContent = `
//     @keyframes buttonHover {
//       0% {
//         background-position: 0% 50%;
//       }
//       50% {
//         background-position: 100% 50%;
//       }
//       100% {
//         background-position: 0% 50%;
//       }
//     }
//     .subscribe-button:hover {
//       background-image: linear-gradient(45deg, rgba(0, 123, 255, 0.6), rgba(0, 123, 255, 0.8), rgba(0, 123, 255, 0.6));
//       background-size: 200% 200%;
//       animation: buttonHover 3s ease infinite;
//     }
//   `;
//   document.head.appendChild(style);
// };

// // Call this function when your component mounts


// export default Footer;

import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes buttonHover {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const services = [
    { name: 'Property Consultant', path: '#' },
    { name: 'Vaastu Consultant', path: '#' },
    { name: 'Pick and Drop', path: '#' },
    { name: 'Property Repair', path: '#' },
    { name: 'Open Forum', path: '#' }
  ];

  const quickLinks = [
    { name: 'Home', path: '#', onClick: scrollToTop },
    { name: 'Properties', path: '#' },
    { name: 'About Us', path: '#' },
    { name: 'Contact', path: '#' },
    { name: 'Privacy Policy', path: '#' }
  ];

  return (
    <footer className="footer">
      <div className="overlay"></div>
      <div className="container">
        <div className="top-section">
          <form onSubmit={handleSubmit} className="subscribe-form">
            {!subscribed ? (
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="subscribe-button">
                  Subscribe
                </button>
              </div>
            ) : (
              <div className="subscribed-message">
                Thank you for subscribing!
              </div>
            )}
          </form>
          <div className="social-links">
            <a href="#" className="social-icon"><Facebook size={24} /></a>
            <a href="#" className="social-icon"><Twitter size={24} /></a>
            <a href="#" className="social-icon"><Instagram size={24} /></a>
            <a href="#" className="social-icon"><Linkedin size={24} /></a>
          </div>
        </div>
        
        <div className="content-section">
          <div className="about-us">
            <h3>About Us</h3>
            <p>
              We are a leading real estate company providing comprehensive property solutions and consultancy services. Our expertise ensures you find the perfect property for your needs.
            </p>
          </div>
          <div className="services">
            <h3>Our Services</h3>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.path}>{service.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} onClick={link.onClick}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2024 Your Real Estate Company. All rights reserved.</p>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background-image: url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2160&q=80');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: white;
          font-family: sans-serif;
          position: relative;
          padding: 3rem 0;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.7);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
          z-index: 10;
        }
        .top-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .subscribe-form {
          width: 100%;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .subscribe-form {
            width: auto;
            margin-bottom: 0;
          }
        }
        .input-group {
          display: flex;
        }
        .input-group input {
          padding: 0.5rem 1rem;
          border-top-left-radius: 9999px;
          border-bottom-left-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          color: white;
          outline: none;
          border: none;
          flex-grow: 1;
        }
        .input-group input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        .subscribe-button {
          padding: 0.5rem 1.5rem;
          border-top-right-radius: 9999px;
          border-bottom-right-radius: 9999px;
          background-color: #1F2937;
          color: white;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .subscribe-button:hover {
          background-image: linear-gradient(45deg, #1F2937, #374151, #1F2937);
          background-size: 200% 200%;
          animation: buttonHover 3s ease infinite;
        }
        .subscribed-message {
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          background-color: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(4px);
          color: white;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-icon {
          color: white;
          transition: color 0.3s;
        }
        .social-icon:hover {
          color: #D1D5DB;
        }
        .content-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .content-section {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .content-section h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .content-section p {
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .content-section ul {
          list-style-type: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .content-section a {
          font-size: 0.875rem;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          display: inline-block;
          color: white;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .content-section a:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        .copyright {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        .copyright p {
          font-size: 0.875rem;
        }
      `}</style>
    </footer>
  );
}