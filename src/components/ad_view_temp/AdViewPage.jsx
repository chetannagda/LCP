import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { IndianRupee, Home, MapPin, Calendar, Ruler, Car, User } from 'lucide-react';

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
      <h1 className="property-title">{property.title}</h1>
      
      <div className="image-gallery">
        {property.images && property.images.length > 0 && (
          <>
            <img src={property.images[currentImageIndex]} alt={`Property ${currentImageIndex + 1}`} />
            <div className="image-controls">
              <button onClick={prevImage}>Previous</button>
              <span>{currentImageIndex + 1} / {property.images.length}</span>
              <button onClick={nextImage}>Next</button>
            </div>
          </>
        )}
      </div>

      <div className="property-info">
        <div className="info-item">
          <IndianRupee size={24} />
          <h2 className="property-price">
            {property.action === 'Sell' ? `${property.amount} INR` : `${property.rent} INR/month`}
          </h2>
        </div>

        <div className="info-item">
          <Home size={24} />
          <p>{property.propertyCategory}</p>
        </div>

        <div className="info-item">
          <MapPin size={24} />
          <p>{property.location}, {property.landmark}, {property.district}, {property.state} - {property.pincode}</p>
        </div>

        <div className="info-item">
          <Ruler size={24} />
          <p>Size: {property.size}</p>
        </div>

        <div className="info-item">
          <Calendar size={24} />
          <p>Listed on: {new Date(property.createdAt.toDate()).toLocaleDateString()}</p>
        </div>

        {property.parkingAvailable && (
          <div className="info-item">
            <Car size={24} />
            <p>Parking Available</p>
          </div>
        )}

        <div className="info-item">
          <User size={24} />
          <p>Property ID: {property.id}</p>
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
        {/* Add any other relevant details here */}
      </div>

      <style jsx>{`
        .property-detail-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .property-title {
          font-size: 2.5em;
          color: #333;
          margin-bottom: 20px;
        }

        .image-gallery {
          position: relative;
          margin-bottom: 20px;
        }

        .image-gallery img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }

        .image-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .image-controls button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .property-info {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .info-item svg {
          margin-right: 10px;
          color: #007bff;
        }

        .property-price {
          font-size: 1.5em;
          color: #28a745;
          margin: 0;
        }

        .property-description, .property-details {
          margin-bottom: 20px;
        }

        .property-description h3, .property-details h3 {
          font-size: 1.2em;
          color: #333;
          margin-bottom: 10px;
        }

        .loading, .error {
          font-size: 1.2em;
          color: #dc3545;
          text-align: center;
          margin-top: 50px;
        }

        @media (max-width: 768px) {
          .property-detail-container {
            padding: 10px;
          }

          .property-title {
            font-size: 2em;
          }

          .image-gallery img {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default Adviewpage;