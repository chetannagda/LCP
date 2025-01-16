// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { db } from '../../firebase';
// // import { IndianRupee, Home, MapPin, Calendar, Ruler, Car, User } from 'lucide-react';

// // const Adviewpage = () => {
// //   const { id } = useParams();
// //   const [property, setProperty] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);

// //   useEffect(() => {
// //     const fetchPropertyDetails = async () => {
// //       try {
// //         const docRef = doc(db, 'properties', id);
// //         const docSnap = await getDoc(docRef);

// //         if (docSnap.exists()) {
// //           setProperty({ id: docSnap.id, ...docSnap.data() });
// //         } else {
// //           console.error('No such property!');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching property details:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) {
// //       fetchPropertyDetails();
// //     }
// //   }, [id]);

// //   if (loading) {
// //     return <div className="loading">Loading...</div>;
// //   }

// //   if (!property) {
// //     return <div className="error">Property not found</div>;
// //   }

// //   const nextImage = () => {
// //     setCurrentImageIndex((prevIndex) => 
// //       (prevIndex + 1) % property.images.length
// //     );
// //   };

// //   const prevImage = () => {
// //     setCurrentImageIndex((prevIndex) => 
// //       (prevIndex - 1 + property.images.length) % property.images.length
// //     );
// //   };

// //   return (
// //     <div className="property-detail-container">
// //       <h1 className="property-title">{property.title}</h1>
      
// //       <div className="image-gallery">
// //         {property.images && property.images.length > 0 && (
// //           <>
// //             <img src={property.images[currentImageIndex]} alt={`Property ${currentImageIndex + 1}`} />
// //             <div className="image-controls">
// //               <button onClick={prevImage}>Previous</button>
// //               <span>{currentImageIndex + 1} / {property.images.length}</span>
// //               <button onClick={nextImage}>Next</button>
// //             </div>
// //           </>
// //         )}
// //       </div>

// //       <div className="property-info">
// //         <div className="info-item">
// //           <IndianRupee size={24} />
// //           <h2 className="property-price">
// //             {property.action === 'Sell' ? `${property.amount} INR` : `${property.rent} INR/month`}
// //           </h2>
// //         </div>

// //         <div className="info-item">
// //           <Home size={24} />
// //           <p>{property.propertyCategory}</p>
// //         </div>

// //         <div className="info-item">
// //           <MapPin size={24} />
// //           <p>{property.location}, {property.landmark}, {property.district}, {property.state} - {property.pincode}</p>
// //         </div>

// //         <div className="info-item">
// //           <Ruler size={24} />
// //           <p>Size: {property.size}</p>
// //         </div>

// //         <div className="info-item">
// //           <Calendar size={24} />
// //           <p>Listed on: {new Date(property.createdAt.toDate()).toLocaleDateString()}</p>
// //         </div>

// //         {property.parkingAvailable && (
// //           <div className="info-item">
// //             <Car size={24} />
// //             <p>Parking Available</p>
// //           </div>
// //         )}

// //         <div className="info-item">
// //           <User size={24} />
// //           <p>Property ID: {property.id}</p>
// //         </div>
// //       </div>

// //       <div className="property-description">
// //         <h3>Description</h3>
// //         <p>{property.description}</p>
// //       </div>

// //       <div className="property-details">
// //         <h3>Property Details</h3>
// //         <p><strong>Property Type:</strong> {property.propertyType}</p>
// //         <p><strong>Action:</strong> {property.action}</p>
// //         {/* Add any other relevant details here */}
// //       </div>
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../firebase';
// import { IndianRupee, Home, MapPin, Calendar, Ruler, Car, User } from 'lucide-react';

// const Adviewpage = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const docRef = doc(db, 'properties', id);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setProperty({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           console.error('No such property!');
//         }
//       } catch (error) {
//         console.error('Error fetching property details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchPropertyDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (!property) {
//     return <div className="error">Property not found</div>;
//   }

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       (prevIndex + 1) % property.images.length
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       (prevIndex - 1 + property.images.length) % property.images.length
//     );
//   };

//   return (
//     <div className="property-detail-container">
//       <h1 className="property-title">{property.title}</h1>
      
//       <div className="image-gallery">
//         {property.images && property.images.length > 0 && (
//           <>
//             <img src={property.images[currentImageIndex]} alt={`Property ${currentImageIndex + 1}`} />
//             <div className="image-controls">
//               <button onClick={prevImage}>Previous</button>
//               <span>{currentImageIndex + 1} / {property.images.length}</span>
//               <button onClick={nextImage}>Next</button>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="property-info">
//         <div className="info-item">
//           <IndianRupee size={24} />
//           <h2 className="property-price">
//             {property.action === 'Sell' ? `${property.amount} INR` : `${property.rent} INR/month`}
//           </h2>
//         </div>

//         <div className="info-item">
//           <Home size={24} />
//           <p>{property.propertyCategory}</p>
//         </div>

//         <div className="info-item">
//           <MapPin size={24} />
//           <p>{property.location}, {property.landmark}, {property.district}, {property.state} - {property.pincode}</p>
//         </div>

//         <div className="info-item">
//           <Ruler size={24} />
//           <p>Size: {property.size}</p>
//         </div>

//         <div className="info-item">
//           <Calendar size={24} />
//           <p>Listed on: {new Date(property.createdAt.toDate()).toLocaleDateString()}</p>
//         </div>

//         {property.parkingAvailable && (
//           <div className="info-item">
//             <Car size={24} />
//             <p>Parking Available</p>
//           </div>
//         )}

//         <div className="info-item">
//           <User size={24} />
//           <p>Property ID: {property.id}</p>
//         </div>
//       </div>

//       <div className="property-description">
//         <h3>Description</h3>
//         <p>{property.description}</p>
//       </div>

//       <div className="property-details">
//         <h3>Property Details</h3>
//         <p><strong>Property Type:</strong> {property.propertyType}</p>
//         <p><strong>Action:</strong> {property.action}</p>
//         {/* Add any other relevant details here */}
//       </div>

//       <style jsx>{`
//         .property-detail-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: Arial, sans-serif;
//         }

//         .property-title {
//           font-size: 2.5em;
//           color: #333;
//           margin-bottom: 20px;
//         }

//         .image-gallery {
//           position: relative;
//           margin-bottom: 20px;
//         }

//         .image-gallery img {
//           width: 100%;
//           height: 400px;
//           object-fit: cover;
//           border-radius: 8px;
//         }

//         .image-controls {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-top: 10px;
//         }

//         .image-controls button {
//           background-color: #007bff;
//           color: white;
//           border: none;
//           padding: 10px 15px;
//           border-radius: 5px;
//           cursor: pointer;
//         }

//         .property-info {
//           background-color: #f8f9fa;
//           padding: 20px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//         }

//         .info-item {
//           display: flex;
//           align-items: center;
//           margin-bottom: 10px;
//         }

//         .info-item svg {
//           margin-right: 10px;
//           color: #007bff;
//         }

//         .property-price {
//           font-size: 1.5em;
//           color: #28a745;
//           margin: 0;
//         }

//         .property-description, .property-details {
//           margin-bottom: 20px;
//         }

//         .property-description h3, .property-details h3 {
//           font-size: 1.2em;
//           color: #333;
//           margin-bottom: 10px;
//         }

//         .loading, .error {
//           font-size: 1.2em;
//           color: #dc3545;
//           text-align: center;
//           margin-top: 50px;
//         }

//         @media (max-width: 768px) {
//           .property-detail-container {
//             padding: 10px;
//           }

//           .property-title {
//             font-size: 2em;
//           }

//           .image-gallery img {
//             height: 300px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Adviewpage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { IndianRupee, Home, MapPin, Calendar, Ruler, Car, User, ChevronLeft, ChevronRight } from 'lucide-react';

const Adviewpage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such property!');
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!property) {
    return <div className="error">Property not found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % property.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + property.images.length) % property.images.length
    );
  };

  return (
    <div className="property-detail-container">
      <div className="image-gallery">
        {property.images && property.images.length > 0 && (
          <>
            <img src={property.images[currentImageIndex]} alt={`Property ${currentImageIndex + 1}`} />
            <button onClick={prevImage} className="control-button prev" aria-label="Previous image">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="control-button next" aria-label="Next image">
              <ChevronRight size={24} />
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </>
        )}
      </div>

      <div className="property-info">
        <h1 className="property-title">{property.title}</h1>
        
        <div className="info-item price">
          <IndianRupee size={24} />
          <h2 className="property-price">
            {property.action === 'Sell' ? `${property.amount} INR` : `${property.rent} INR/month`}
          </h2>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <Home size={20} />
            <p>{property.propertyCategory}</p>
          </div>

          <div className="info-item">
            <MapPin size={20} />
            <p>{property.location}</p>
          </div>

          <div className="info-item">
            <Ruler size={20} />
            <p>Size: {property.size}</p>
          </div>

          <div className="info-item">
            <Calendar size={20} />
            <p>Listed: {new Date(property.createdAt.toDate()).toLocaleDateString()}</p>
          </div>

          {property.parkingAvailable && (
            <div className="info-item">
              <Car size={20} />
              <p>Parking Available</p>
            </div>
          )}

          <div className="info-item">
            <User size={20} />
            <p>ID: {property.id}</p>
          </div>
        </div>
      </div>

      <div className="property-description">
        <h3>Description</h3>
        <p>{property.description}</p>
      </div>

      <div className="property-details">
        <h3>Property Details</h3>
        <p><strong>Property Type:</strong> {property.propertyType}</p>
        <p><strong>Action:</strong> {property.action}</p>
        <p><strong>Full Address:</strong> {property.landmark}, {property.district}, {property.state} - {property.pincode}</p>
      </div>

      <style jsx>{`
        .property-detail-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
          font-family: 'Roboto', Arial, sans-serif;
          color: #002f34;
          background-color: #f2f4f5;
        }

        .image-gallery {
          position: relative;
          margin-bottom: 16px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .image-gallery img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        .control-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.7);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .control-button:hover {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .control-button.prev {
          left: 16px;
        }

        .control-button.next {
          right: 16px;
        }

        .image-counter {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 14px;
        }

        .property-info {
          background-color: white;
          padding: 16px;
          border-radius: 4px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .property-title {
          font-size: 24px;
          color: #002f34;
          margin-bottom: 16px;
          font-weight: bold;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .info-item {
          display: flex;
          align-items: center;
          font-size: 16px;
        }

        .info-item svg {
          margin-right: 8px;
          color: #002f34;
        }

        .info-item p {
          margin: 0;
        }

        .price {
          background-color: #ffce32;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
        }

        .property-price {
          font-size: 28px;
          color: #002f34;
          margin: 0;
          margin-left: 8px;
          font-weight: bold;
        }

        .property-description, .property-details {
          background-color: white;
          padding: 16px;
          border-radius: 4px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .property-description h3, .property-details h3 {
          font-size: 20px;
          color: #002f34;
          margin-bottom: 12px;
          font-weight: bold;
        }

        .loading, .error {
          font-size: 18px;
          color: #ff5252;
          text-align: center;
          margin-top: 64px;
        }

        @media (max-width: 768px) {
          .property-detail-container {
            padding: 12px;
          }

          .image-gallery img {
            height: 300px;
          }

          .property-title {
            font-size: 20px;
          }

          .property-price {
            font-size: 24px;
          }

          .info-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .info-item {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .image-gallery img {
            height: 250px;
          }

          .control-button {
            width: 32px;
            height: 32px;
          }

          .property-title {
            font-size: 18px;
          }

          .property-price {
            font-size: 22px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Adviewpage;

