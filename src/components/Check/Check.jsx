// import React, { useState } from 'react';
// import { auth, db } from '../../firebase'; // Import Firebase auth and Firestore
// import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore
// import styles from './Check.module.css';
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from 'react-router-dom';


// const Check = () => {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const navigate = useNavigate();

//   // Toggle between sign-in and sign-up
//   const toggleForm = () => {
//     setIsSignIn(!isSignIn);
//   };

//   // Sign-up function
//   const handleSignUp = async () => {
//     if (password !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     try {
//       // Sign up with Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Extract the part of the email before '@' as the user ID
//       const userId = user.uid;

//       // Store user data in Firestore
//       await setDoc(doc(db, 'users', userId), {
//         name,
//         email,
//         contactNumber,
//       });

//       console.log('User registered and data stored:', user);
//       alert('Sign-up successful!');
//       navigate('/landingpage');
//     } catch (error) {
//       console.error('Sign-up error:', error);
//       alert(error.message);
//     }
//   };

//   // Sign-in function
//   const handleLogin = async () => {
//     try {
//       // Check if input is email or mobile
//       const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

//       let userCredential;
//       if (isEmail) {
//         // Login with email
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         // If using a mobile number, find the corresponding email in Firestore
//         const userSnapshot = await getDoc(doc(db, 'users', user.uid));
//         if (!userSnapshot.exists()) {
//           alert('No user found with this mobile number');
//           return;
//         }
//         const userData = userSnapshot.data();
//         userCredential = await signInWithEmailAndPassword(auth, userData.email, password);
//       }

//       const user = userCredential.user;
//       console.log('Login successful:', user);
//       alert('Login successful!');
//       navigate('/landingpage');
//     } catch (error) {
//       console.error('Login error:', error);
//       alert(error.message);
//     }
//   };

//   // Google Sign-In
//   const provider = new GoogleAuthProvider();
//   const googleAuthentication = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       // Get user information
//       const user = result.user;
//       console.log('Google sign-in successful:', user);

//       // Check if the user exists in Firestore, otherwise store their data
//       const userId = user.uid;
//       const userRef = doc(db, 'users', userId);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         await setDoc(userRef, {
//           name: user.displayName,
//           email: user.email,
//           contactNumber: user.phoneNumber || '',
//         });
//         console.log('New Google user data saved in Firestore');
//       } else {
//         console.log('User already exists in Firestore');
//       }

//       alert('Google sign-in successful!');
//       navigate('/landingpage');
//     } catch (error) {
//       console.error('Google sign-in error:', error);
//       alert('Google sign-in failed: ' + error.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.signinContainer}>
//         <div className={styles.signinForm}>
//           {isSignIn ? (
//             <>
//               <h1>Sign In</h1>
//               <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
//               <div className={styles.socialIcons}>
//                   <a href="#" className={styles.googleIcon} onClick={googleAuthentication}>
//                     <FcGoogle size={50} />
//                   </a>
//                 </div>
//                 <input
//                   className={styles.signinInput}
//                   type="text"
//                   placeholder="Email or Mobile"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <input
//                   className={styles.signinInput}
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button type="submit" className={styles.signinButton}>Sign In</button>
//               </form>
//               <div className={styles.toggleText}>
//                 <a href="#" onClick={toggleForm}>Create an account</a>
//               </div>
//             </>
//           ) : (
//             <>
//               <h1>Sign Up</h1>
//               <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
//                 <input
//                 className={styles.signinInput}
//                   type="text"
//                   placeholder="Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//                 <input
//                 className={styles.signinInput}
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <input
//                 className={styles.signinInput}
//                   type="text"
//                   placeholder="Contact Number"
//                   value={contactNumber}
//                   onChange={(e) => setContactNumber(e.target.value)}
//                   required
//                 />
//                 <input
//                 className={styles.signinInput}
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <input
//                 className={styles.signinInput}
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//                 <button type="submit" className={styles.signinButton}>Sign Up</button>
//               </form>
//               <div className={styles.toggleText}>
//                   <a href="#" onClick={toggleForm}>Already have an account? Sign In</a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Check;
import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Home, User, Mail, Phone, Lock, Loader } from "lucide-react";
import { auth, db } from '../../firebase'; // Assuming this import path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function Check() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    // Reset form fields when toggling
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setContactNumber('');
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), { name, email, contactNumber, propertyRefs: [] });
      navigate('/landingpage'); // Redirect to landing page after successful sign up
    } catch (error) {
      console.error('Sign-up error:', error);
      alert(error.message);
    }
    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      let userCredential;
      if (isEmail) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userSnapshot = await getDoc(doc(db, 'users', email));
        if (!userSnapshot.exists()) {
          throw new Error('No user found with this mobile number');
        }
        const userData = userSnapshot.data();
        userCredential = await signInWithEmailAndPassword(auth, userData.email, password);
      }
      navigate('/landingpage'); // Redirect to landing page after successful login
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    }
    setIsLoading(false);
  };

  const googleAuthentication = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          contactNumber: user.phoneNumber || '',
        });
      }
      navigate('/landingpage'); // Redirect to landing page after successful Google sign-in
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Google sign-in failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo-container">
          <Home size={32} className="logo-icon" />
          <h2 className="logo-text">LakeCityProperties</h2>
        </div>
        <h1>{isSignIn ? 'Welcome Back!' : 'Join Our Community'}</h1>
        <form onSubmit={isSignIn ? handleLogin : handleSignUp}>
          <button type="button" onClick={googleAuthentication} className="google-btn">
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>
          <div className="separator">
            <span>or</span>
          </div>
          {!isSignIn && (
            <div className="input-group">
              <User size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input
              type="text"
              placeholder={isSignIn ? "Email or Mobile" : "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!isSignIn && (
            <div className="input-group">
              <Phone size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
            </button>
          </div>
          {!isSignIn && (
            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? <Loader size={24} className="animate-spin" /> : (isSignIn ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        <p className="toggle-form">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleForm}>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #3494e6, #ec6ead);
          font-family: 'Poppins', sans-serif;
          padding: 1rem;
        }
        .auth-form {
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          width: 100%;
          max-width: 400px;
          transition: all 0.3s ease;
          overflow-y: auto;
          max-height: calc(100vh - 2rem);
        }
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .logo-icon {
          color: #3494e6;
        }
        .logo-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: #3494e6;
          margin-left: 0.5rem;
        }
        h1 {
          color: #333;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 600;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .input-group {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #3494e6;
        }
        input {
          width: 100%;
          padding: 0.6rem 0.6rem 0.6rem 2.5rem;
          border: 1px solid #3494e6;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        input:focus {
          outline: none;
          border-color: #ec6ead;
          box-shadow: 0 0 0 2px rgba(236, 110, 173, 0.2);
        }
        .google-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          background: white;
          border: 1px solid #3494e6;
          border-radius: 8px;
          padding: 0.6rem;
          font-size: 0.9rem;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .google-btn:hover {
          background-color: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .separator {
          display: flex;
          align-items: center;
          text-align: center;
          color: #777;
          font-size: 0.8rem;
          margin: 0.75rem 0;
        }
        .separator::before,
        .separator::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #3494e6;
        }
        .separator span {
          padding: 0 0.5rem;
        }
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 59%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #3494e6;
        }
        .submit-btn {
          background: linear-gradient(135deg, #3494e6, #ec6ead);
          color: white;
          padding: 0.6rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .toggle-form {
          margin-top: 0.75rem;
          text-align: center;
          font-size: 0.8rem;
          color: #333;
        }
        .toggle-form button {
          background: none;
          border: none;
          color: #3494e6;
          cursor: pointer;
          font-weight: 600;
          transition: color 0.3s ease;
          padding: 0;
          margin-left: 0.25rem;
        }
        .toggle-form button:hover {
          color: #ec6ead;
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .auth-form {
            padding: 1.5rem;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .auth-form {
            max-width: 80%;
          }
        }
        @media (min-width: 769px) {
          .auth-form {
            transform: scale(1);
          }
          .auth-form:hover {
            transform: scale(1.02);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}