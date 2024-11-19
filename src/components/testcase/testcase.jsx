import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add subscription logic here
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000); // Hide thank you message after 3 seconds
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.topSection}>
          <form onSubmit={handleSubmit} style={styles.subscribeForm}>
            {!subscribed ? (
              <>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  style={styles.input} 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" style={styles.button}>
                  <span style={styles.buttonText}>Subscribe Now</span>
                </button>
              </>
            ) : (
              <div style={styles.thankYouMessage}>Thank you for subscribing!</div>
            )}
          </form>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.iconLink}><i className="fab fa-facebook-f"></i></a>
            <a href="#" style={styles.iconLink}><i className="fab fa-twitter"></i></a>
            <a href="#" style={styles.iconLink}><i className="fab fa-instagram"></i></a>
            <a href="#" style={styles.iconLink}><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        
        <div style={styles.middleSection}>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>About Us</h3>
            <p style={styles.columnText}>We are a leading real estate company providing comprehensive property solutions and consultancy services.</p>
          </div>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Our Services</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><span style={styles.textBackground}>Property Consultant</span></li>
              <li style={styles.listItem}><span style={styles.textBackground}>Vaastu Consultant</span></li>
              <li style={styles.listItem}><span style={styles.textBackground}>Pick and Drop</span></li>
              <li style={styles.listItem}><span style={styles.textBackground}>Property Repair</span></li>
              <li style={styles.listItem}><span style={styles.textBackground}>Open Forum</span></li>
            </ul>
          </div>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Quick Links</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Home</span></a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Properties</span></a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>About Us</span></a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Contact</span></a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}><span style={styles.textBackground}>Privacy Policy</span></a></li>
            </ul>
          </div>
        </div>
        
        
        <div style={styles.bottomSection}>
          <p style={styles.copyright}>© 2024 Your Real Estate Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 0',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
  },
  iconLink: {
    color: '#fff',
    fontSize: '24px',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  subscribeForm: {
    display: 'flex',
    maxWidth: '400px',
    marginBottom: '20px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '25px 0 0 25px',
    flexGrow: 1,
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    backdropFilter: 'blur(5px)',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: 'rgba(0, 123, 255, 0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '0 25px 25px 0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonText: {
    position: 'relative',
    zIndex: 1,
    fontWeight: 'bold',
  },
  thankYouMessage: {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
    borderRadius: '25px',
    backdropFilter: 'blur(5px)',
  },
  middleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  column: {
    flex: '1',
    marginRight: '20px',
    marginBottom: '20px',
    minWidth: '200px',
  },
  columnTitle: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#fff',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  },
  columnText: {
    fontSize: '14px',
    lineHeight: '1.5',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    fontSize: '14px',
  },
  listItem: {
    marginBottom: '8px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  textBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(5px)',
    padding: '3px 8px',
    borderRadius: '4px',
    display: 'inline-block',
  },
  bottomSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '20px',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '14px',
  },
};


// Add this to your component to create the hover effect
const addButtonHoverEffect = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes buttonHover {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    .subscribe-button:hover {
      background-image: linear-gradient(45deg, rgba(0, 123, 255, 0.6), rgba(0, 123, 255, 0.8), rgba(0, 123, 255, 0.6));
      background-size: 200% 200%;
      animation: buttonHover 3s ease infinite;
    }
  `;
  document.head.appendChild(style);
};

// Call this function when your component mounts


export default Footer;