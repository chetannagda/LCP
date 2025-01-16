// import React, { useState, useEffect } from 'react'
// import { Search, Heart, Users, MessageSquare, User, LogOut, Home, Compass, Truck, Wrench, Menu, X, Plus } from 'lucide-react';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { auth } from '../../../../firebase'; // Adjust the path as necessary
// import { onAuthStateChanged } from "firebase/auth";

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== 'undefined' ? window.innerWidth : 0
//   );
//   const [user, setUser] = useState(null); // State to hold user data

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const db = getFirestore(); // Initialize Firestore
//         const userDoc = doc(db, 'users', user.uid); // Get user document
//         const userSnapshot = await getDoc(userDoc); // Fetch user document

//         if (userSnapshot.exists()) {
//           setUser(userSnapshot.data()); // Set user data (including profile picture)
//         } else {
//           console.log("No such document!");
//         }
//       } else {
//         console.log("User is not signed in.");
//         setUser(null); // Reset user state
//       }
//     });

//     return () => unsubscribe(); // Clean up the subscription on unmount
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const handleProfileClick = () => {
//     window.location.href = '/userprofile'; // Change this according to your routing logic
//   };
//   const handleAddPropertyClick = () => {
//       window.location.href = '/listproperty'; // Change this according to your routing logic
//   };

//   const handleLoginClick = () => {
//     // Add navigation to login page
//     window.location.href = '/check'; // Change this according to your routing logic
//   };
//   const handleOpenForumClick = () => {
//     // Add navigation to login page
//     window.location.href = '/forum'; // Change this according to your routing logic
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-content">
//         {windowWidth >= 768 && (
//           <div className="logo">
//             <img src="assests/lcplogo.png" alt="Logo" />
//           </div>
//         )}
//           <div className="search-container">
//             <div className="search-input-wrapper">
//               <Search className="search-icon" />
//               <input
//                 type="search"
//                 placeholder="Search properties"
//                 className="search-input"
//               />
//             </div>
//           </div>
//           {windowWidth >= 1024 && (
//             <div className="nav-buttons">
//               <button className="nav-button">
//                 <Heart className="icon" />
//                 Saved
//               </button>
//               <button className="nav-button" onClick={handleOpenForumClick}>
//                 <Users className="icon" />
//                 Open Forum
//               </button>
//               <button className="nav-button" >
//                 <MessageSquare className="icon" />
//                 Messages
//               </button>
//               <button href="#" className="nav-button" onClick={handleAddPropertyClick}>
//                 <Plus className="icon" />
//                 Post AD 
//               </button>
//               {/* <button onClick={user ? handleProfileClick : handleLoginClick} className="nav-button " >
//                 {user ? (
//                   <img src={user.profilePhoto || '/def_user_profile.png'} alt="Profile" className="profile-pic" />
//                 ) : (
//                   <>
//                     <User className="icon" />
//                     Login
//                   </>
//                 )}
//               </button> */}
//               <button onClick={user ? handleProfileClick : handleLoginClick} className="nav-button" >
//                 {user ? (
//                   <div className="profile-pic-wrapper">
//                   <img src={user.profilePhoto || '/def_user_profile.png'} alt="Profile" className="profile-pic" />
//               </div>
//               ) : (
//               <>
//                 <User className="icon" />
//                 Login
//                 </>
//               )}
//               </button>
//             </div>
//           )}
//           <div className="menu-toggle">
//             <button onClick={toggleMenu} className="menu-button">
//               {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
//         <div className="mobile-menu-content">
//           <button onClick={toggleMenu} className="close-menu-button">
//             <X className="icon" />
//           </button>
//           {user ? (
//             <a href="#" onClick={handleProfileClick} className="mobile-menu-item">
//               <User className="icon" />
//               Profile
//             </a>
//           ) : (
//             <a href="#" onClick={handleLoginClick} className="mobile-menu-item">
//               <User className="icon" />
//               Login
//             </a>
//           )}
//           <a href="listproperty" className="mobile-menu-item">
//             <Plus className="icon" />
//             Post AD 
//           </a>
//           <a href="#" className="mobile-menu-item">
//             <Heart className="icon" />
//             Saved
//           </a>
//           <a href="#" className="mobile-menu-item">
//             <MessageSquare className="icon" />
//             Messages
//           </a>
//           <a href="#" onClick={handleOpenForumClick} className="mobile-menu-item">
//             <Users className="icon" />
//             Open Forum
//           </a>
//           <a href="#" className="mobile-menu-item">
//             <Home className="icon" />
//             Property Consultant
//           </a>
//           <a href="#" className="mobile-menu-item">
//             <Compass className="icon" />
//             Vaastu Consultant
//           </a>
//           <a href="#" className="mobile-menu-item">
//             <Truck className="icon" />
//             Pick and Drop
//           </a>
//           <a href="#" className="mobile-menu-item">
//             <Wrench className="icon" />
//             Property Repair
//           </a>
//           {user && (
//             <a href="#" onClick={() => { /* Handle logout */ }} className="mobile-menu-item">
//               <LogOut className="icon" />
//               Logout
//             </a>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .navbar {
//           background-color: white;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }
//         .navbar-container {
//           max-width: 100%;
//           padding: 0 2rem;
//         }
//         .navbar-content {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           height: 5rem;
//         }
//         .logo img {
//           height: 3rem;
//           width: auto;
//         }
//         .search-container {
//           flex: 1;
//           display: flex;
//           justify-content: center;
//           padding: 0 1rem;
//         }
//          .profile-pic-wrapper {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 4rem; /* Increase width */
//           height: 4rem; /* Increase height */
//           border-radius: 50%; /* Make it circular */
//         }
//         .profile-pic {
//           width: 3.5rem !important; /* Adjust to fit the wrapper */
//           height: 3.5rem !important; /* Adjust to fit the wrapper */
//           border-radius: 50%; /* Ensure the image is also circular */
//           object-fit: cover;
//         }

//         .search-input-wrapper {
//           position: relative;
//           max-width: 36rem;
//           width: 100%;
//         }
//         .search-icon {
//           position: absolute;
//           left: 1rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #718096;
//         }
//         .search-input {
//           width: 100%;
//           padding: 0.75rem 1rem 0.75rem 3rem;
//           font-size: 1.125rem;
//           border: 1px solid #e2e8f0;
//           border-radius: 0.375rem;
//           outline: none;
//           transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .search-input:focus {
//           border-color: #4a90e2;
//           box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
//         }
//         .nav-buttons {
//           display: flex;
//           align-items: center;
//           gap: 1.5rem;
//         }
//         .nav-button {
//           display: flex;
//           align-items: center;
//           font-size: 1.125rem;
//           font-weight: 500;
//           color: #4a5568;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0.75rem 1rem;
//           border-radius: 0.375rem;
//           transition: background-color 0.2s, color 0.2s;
//         }
//         .nav-button:hover {
//           background-color: #f7fafc;
//           color: #2d3748;
//         }
//         .icon {
//           margin-right: 0.5rem;
//         }
//         .profile-pic {
//           width: 2.5rem;
//           height: 2.5rem;
//           border-radius: 50%;
//         }
//         .menu-toggle {
//           display: none;
//         }
//         .menu-button {
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0.5rem;
//           color: #4a5568;
//         }
//         .mobile-menu {
//           display: none;
//         }
//         @media (max-width: 1023px) {
//           .nav-buttons {
//             display: none;
//           }
//           .menu-toggle {
//             display: block;
//           }
//           .mobile-menu {
//             display: block;
//             position: fixed;
//             top: 0;
//             right: -50%;
//             width: 50%;
//             height: 100vh;
//             background-color: white;
//             z-index: 1000;
//             transition: right 0.3s ease-in-out;
//             box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
//           }
//           .mobile-menu.open {
//             right: 0;
//           }
//           .mobile-menu-content {
//             padding: 2rem;
//             display: flex;
//             flex-direction: column;
//             gap: 1.5rem;
//           }
//           .close-menu-button {
//             background: none;
//             border: none;
//             cursor: pointer;
//             padding: 0;
//             color: #4a5568;
//             align-self: flex-end;
//           }
//           .mobile-menu-item {
//             display: flex;
//             align-items: center;
//             font-size: 1.125rem;
//             font-weight: 500;
//             color: #4a5568;
//             text-decoration: none;
//           }
//           .mobile-menu-item:hover {
//             color: #2d3748;
//           }
//             @media (max-width: 767px) {
//             .logo {
//             display: none; /* Hide the profile picture wrapper on mobile */
//           }
//             @media (max-width: 767px) {
//             .search-container {
//             flex: 1;
//             }
//             .search-input-wrapper {
//             max-width: none;
//             }
//             @media (max-width: 1023px) {
//             .mobile-menu {
//             right: -100%;
//             width: 100%;
//             }
//           }
//       }
//   }
//       `}</style>
//     </nav>
//   );
// }
import React, { useState, useEffect } from 'react'
import { Heart, Users, MessageSquare, User, LogOut, Home, Compass, Truck, Wrench, Menu, X, Plus } from 'lucide-react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../../../firebase'; // Adjust the path as necessary
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore(); // Initialize Firestore
        const userDoc = doc(db, 'users', user.uid); // Get user document
        const userSnapshot = await getDoc(userDoc); // Fetch user document

        if (userSnapshot.exists()) {
          setUser(userSnapshot.data()); // Set user data (including profile picture)
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not signed in.");
        setUser(null); // Reset user state
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProfileClick = () => {
    window.location.href = '/userprofile'; // Change this according to your routing logic
  };
  const handleAddPropertyClick = () => {
      window.location.href = '/listproperty'; // Change this according to your routing logic
  };

  const handleLoginClick = () => {
    // Add navigation to login page
    window.location.href = '/check'; // Change this according to your routing logic
  };
  const handleOpenForumClick = () => {
    // Add navigation to login page
    window.location.href = '/forum'; // Change this according to your routing logic
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
        {windowWidth >= 768 && (
          <div className="logo">
            <img src="assests/lcplogo.png" alt="Logo" />
          </div>
        )}
          
          {windowWidth >= 1024 && (
            <div className="nav-buttons">
              <button className="nav-button">
                <Heart className="icon" />
                Saved
              </button>
              <button className="nav-button" onClick={handleOpenForumClick}>
                <Users className="icon" />
                Open Forum
              </button>
              <button className="nav-button" >
                <MessageSquare className="icon" />
                Messages
              </button>
              <button href="#" className="nav-button" onClick={handleAddPropertyClick}>
                <Plus className="icon" />
                Post AD 
              </button>
              <button onClick={user ? handleProfileClick : handleLoginClick} className="nav-button" >
                {user ? (
                  <div className="profile-pic-wrapper">
                  <img src={user.profilePhoto || '/def_user_profile.png'} alt="Profile" className="profile-pic" />
              </div>
              ) : (
              <>
                <User className="icon" />
                Login
                </>
              )}
              </button>
            </div>
          )}
          <div className="menu-toggle">
            <button onClick={toggleMenu} className="menu-button">
              {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <button onClick={toggleMenu} className="close-menu-button">
            <X className="icon" />
          </button>
          {user ? (
            <a href="#" onClick={handleProfileClick} className="mobile-menu-item">
              <User className="icon" />
              Profile
            </a>
          ) : (
            <a href="#" onClick={handleLoginClick} className="mobile-menu-item">
              <User className="icon" />
              Login
            </a>
          )}
          <a href="listproperty" className="mobile-menu-item">
            <Plus className="icon" />
            Post AD 
          </a>
          <a href="#" className="mobile-menu-item">
            <Heart className="icon" />
            Saved
          </a>
          <a href="#" className="mobile-menu-item">
            <MessageSquare className="icon" />
            Messages
          </a>
          <a href="#" onClick={handleOpenForumClick} className="mobile-menu-item">
            <Users className="icon" />
            Open Forum
          </a>
          <a href="#" className="mobile-menu-item">
            <Home className="icon" />
            Property Consultant
          </a>
          <a href="#" className="mobile-menu-item">
            <Compass className="icon" />
            Vaastu Consultant
          </a>
          <a href="#" className="mobile-menu-item">
            <Truck className="icon" />
            Pick and Drop
          </a>
          <a href="#" className="mobile-menu-item">
            <Wrench className="icon" />
            Property Repair
          </a>
          {user && (
            <a href="#" onClick={() => { /* Handle logout */ }} className="mobile-menu-item">
              <LogOut className="icon" />
              Logout
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .navbar-container {
          max-width: 100%;
          padding: 0 2rem;
        }
        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 5rem;
          padding: 0 1rem;
        }
        .logo img {
          height: 3rem;
          width: auto;
        }
        .profile-pic-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem; /* Increase width */
          height: 4rem; /* Increase height */
          border-radius: 50%; /* Make it circular */
        }
        .profile-pic {
          width: 3.5rem !important; /* Adjust to fit the wrapper */
          height: 3.5rem !important; /* Adjust to fit the wrapper */
          border-radius: 50%; /* Ensure the image is also circular */
          object-fit: cover;
        }

        .nav-buttons {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-button {
          display: flex;
          align-items: center;
          font-size: 1.125rem;
          font-weight: 500;
          color: #4a5568;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s, color 0.2s;
        }
        .nav-button:hover {
          background-color: #f7fafc;
          color: #2d3748;
        }
        .icon {
          margin-right: 0.5rem;
        }
        .profile-pic {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }
        .menu-toggle {
          display: none;
        }
        .menu-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #4a5568;
        }
        .mobile-menu {
          display: none;
        }
        @media (max-width: 1023px) {
          .nav-buttons {
            display: none;
          }
          .menu-toggle {
            display: block;
          }
          .mobile-menu {
            display: block;
            position: fixed;
            top: 0;
            right: -50%;
            width: 50%;
            height: 100vh;
            background-color: white;
            z-index: 1000;
            transition: right 0.3s ease-in-out;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
          }
          .mobile-menu.open {
            right: 0;
          }
          .mobile-menu-content {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .close-menu-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            color: #4a5568;
            align-self: flex-end;
          }
          .mobile-menu-item {
            display: flex;
            align-items: center;
            font-size: 1.125rem;
            font-weight: 500;
            color: #4a5568;
            text-decoration: none;
          }
          .mobile-menu-item:hover {
            color: #2d3748;
          }
            @media (max-width: 767px) {
            .logo {
            display: none; /* Hide the profile picture wrapper on mobile */
          }
            @media (max-width: 767px) {
            .navbar-content {
              justify-content: space-between;
            }
          }
      }
  }
      `}</style>
    </nav>
  );
}

