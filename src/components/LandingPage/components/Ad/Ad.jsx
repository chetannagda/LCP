// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { collection, getDocs } from 'firebase/firestore';
// import { db, auth } from '../../../../firebase'; // Ensure this path is correct for your project structure
// import { onAuthStateChanged } from 'firebase/auth';
// import { IndianRupee, Home, MapPin, Tag, Heart } from 'lucide-react';

// const PropertyAd = ({ imageUrl, name, price, category, location }) => {
//   const [liked, setLiked] = useState(false);

//   const handleLike = () => {
//     setLiked(!liked);
//   };

//   return (
//     <div style={styles.propertyAd}>
//       <div style={styles.propertyImageContainer}>
//         <img src={imageUrl} alt={name} style={styles.propertyImage} />
//         <button 
//           style={{
//             ...styles.likeButton,
//             ...(liked ? styles.likeButtonActive : {})
//           }} 
//           onClick={handleLike}
//         >
//           <Heart 
//             size={20} 
//             fill={liked ? "#e74c3c" : "none"} 
//             color={liked ? "#e74c3c" : "#ffffff"} 
//           />
//         </button>
//       </div>
//       <div style={styles.propertyInfo}>
//         <h2 style={styles.propertyTitle}>{name}</h2>
//         <div style={styles.propertyDetail}>
//           <IndianRupee size={18} color="#34495e" />
//           <p style={styles.propertyText}>{price}</p>
//         </div>
//         <div style={styles.propertyDetail}>
//           <Home size={18} color="#34495e" />
//           <p style={styles.propertyText}>{category}</p>
//         </div>
//         <div style={styles.propertyDetailAddress}>
//           <MapPin size={18} color="#34495e" />
//           <p style={styles.propertyTextAddress}>{location}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Ad() {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Monitor authentication state to get current user
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });

//     return () => unsubscribe(); // Cleanup subscription on component unmount
//   }, []);

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const adsCollectionRef = collection(db, 'properties');
//         const querySnapshot = await getDocs(adsCollectionRef);

//         const adsList = querySnapshot.docs
//         .map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         .filter((ad) => ad.userId !== currentUser?.uid); // Exclude current user's ads

//         setAds(adsList);
//       } catch (error) {
//         console.error('Error fetching ads:', error);
//         setError('Failed to fetch ads. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAds();
//   }, []);

//   if (loading) {
//     return <div style={styles.loadingError}>Loading...</div>;
//   }

//   if (error) {
//     return <div style={styles.loadingError}>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Property Listings</h1>
//       <div>
//         {ads.length > 0 ? (
//           ads.map((ad) => (
//             <Link to={`/property/${ad.id}`} key={ad.id}>
//               <PropertyAd
//                 imageUrl={ad.images && ad.images.length > 0 ? ad.images[0] : '/placeholder.svg'}
//                 name={ad.title}
//                 price={ad.action === 'Sell' ? `${ad.amount} INR` : `${ad.rent} INR/month`}
//                 category={ad.propertyCategory}
//                 location={`${ad.location}, ${ad.district}, ${ad.state} - ${ad.pincode}`}
//               />
//             </Link>
//           ))
//         ) : (
//           <p>No properties available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   app: {
//     textAlign: 'center',
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: '2.5em',
//     color: '#2c3e50',
//     marginBottom: '30px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headingIcon: {
//     marginRight: '10px',
//   },
//   adsContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '30px',
//   },
//   propertyAd: {
//     backgroundColor: '#ffffff',
//     borderRadius: '12px',
//     overflow: 'hidden',
//     width: '100%',
//     maxWidth: '350px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s, box-shadow 0.3s',
//   },
//   propertyImageContainer: {
//     position: 'relative',
//     height: '200px',
//     overflow: 'hidden',
//   },
//   propertyImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     transition: 'transform 0.3s',
//   },
//   propertyInfo: {
//     padding: '20px',
//   },
//   propertyTitle: {
//     fontSize: '1.4em',
//     fontWeight: 'bold',
//     margin: '0 0 15px 0',
//     color: '#2c3e50',
//   },
//   propertyDetail: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   },
//   propertyDetailAddress: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     marginBottom: '10px',
//   },
//   propertyText: {
//     margin: '0 0 0 10px',
//     fontSize: '1em',
//     color: '#34495e',
//   },
//   propertyTextAddress: {
//     margin: '0 0 0 10px',
//     fontSize: '0.9em',
//     color: '#7f8c8d',
//     lineHeight: '1.4',
//     textAlign: 'left',
//   },
//   likeButton: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     background: 'rgba(0, 0, 0, 0.5)',
//     backdropFilter: 'blur(5px)',
//     border: 'none',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     cursor: 'pointer',
//     transition: 'transform 0.2s, background-color 0.2s',
//   },
//   likeButtonActive: {
//     background: 'rgba(231, 76, 60, 0.7)',
//   },
//   loadingError: {
//     textAlign: 'center',
//     fontSize: '1.2em',
//     color: '#e74c3c',
//     margin: '20px 0',
//   },
//   noProperties: {
//     fontSize: '1.2em',
//     color: '#7f8c8d',
//     margin: '20px 0',
//   },
// };

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { IndianRupee, Home, MapPin, Heart } from 'lucide-react';

const PropertyAd = ({ imageUrl, name, price, category, location }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="property-ad">
      <div className="property-image-container">
        <img src={imageUrl} alt={name} className="property-image" />
        <button 
          className={`like-button ${liked ? 'like-button-active' : ''}`}
          onClick={handleLike}
        >
          <Heart 
            size={20} 
            fill={liked ? "#e74c3c" : "none"} 
            color={liked ? "#e74c3c" : "#ffffff"} 
          />
        </button>
      </div>
      <div className="property-info">
        <h2 className="property-title">{name}</h2>
        <div className="property-detail">
          <IndianRupee size={18} color="#34495e" />
          <p className="property-text">{price}</p>
        </div>
        <div className="property-detail">
          <Home size={18} color="#34495e" />
          <p className="property-text">{category}</p>
        </div>
        <div className="property-detail-address">
          <MapPin size={18} color="#34495e" />
          <p className="property-text-address">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default function Ad() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollectionRef = collection(db, 'properties');
        const querySnapshot = await getDocs(adsCollectionRef);

        const adsList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((ad) => ad.userId !== currentUser?.uid);

        setAds(adsList);
      } catch (error) {
        console.error('Error fetching ads:', error);
        setError('Failed to fetch ads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [currentUser]);

  if (loading) {
    return <div className="loading-error">Loading...</div>;
  }

  if (error) {
    return <div className="loading-error">Error: {error}</div>;
  }

  return (
    <div className="ad-container">
      <h1 className="heading">Property Listings</h1>
      <div className="ads-grid">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <Link to={`/property/${ad.id}`} key={ad.id} className="ad-link">
              <PropertyAd
                imageUrl={ad.images && ad.images.length > 0 ? ad.images[0] : '/placeholder.svg'}
                name={ad.title}
                price={ad.action === 'Sell' ? `${ad.amount} INR` : `${ad.rent} INR/month`}
                category={ad.propertyCategory}
                location={`${ad.location}, ${ad.district}, ${ad.state} - ${ad.pincode}`}
              />
            </Link>
          ))
        ) : (
          <p className="no-properties">No properties available.</p>
        )}
      </div>
      <style jsx>{`
        .ad-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .heading {
          font-size: 2.5em;
          color: #2c3e50;
          margin-bottom: 30px;
          text-align: center;
        }

        .ads-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          justify-content: center;
        }

        .ad-link {
          text-decoration: none;
          color: inherit;
        }

        .property-ad {
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .property-ad:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .property-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .property-ad:hover .property-image {
          transform: scale(1.05);
        }

        .like-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
        }

        .like-button:hover {
          transform: scale(1.1);
        }

        .like-button-active {
          background: rgba(231, 76, 60, 0.7);
        }

        .property-info {
          padding: 20px;
        }

        .property-title {
          font-size: 1.4em;
          font-weight: bold;
          margin: 0 0 15px 0;
          color: #2c3e50;
        }

        .property-detail, .property-detail-address {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .property-text {
          margin: 0 0 0 10px;
          font-size: 1em;
          color: #34495e;
        }

        .property-text-address {
          margin: 0 0 0 10px;
          font-size: 0.9em;
          color: #7f8c8d;
          line-height: 1.4;
        }

        .loading-error {
          text-align: center;
          font-size: 1.2em;
          color: #e74c3c;
          margin: 20px 0;
        }

        .no-properties {
          font-size: 1.2em;
          color: #7f8c8d;
          margin: 20px 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .ads-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .ads-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}